import { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import AdminControls from './AdminControls';
import PasswordPrompt from './PasswordPrompt';

// Dynamically determine the backend URL based on the frontend environment
const getBackendUrl = () => {
  const { hostname } = window.location;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:5000'; // Local backend
  }
  return 'https://matchupx-1.onrender.com'; // Production backend
};

const BACKEND_URL = 'https://matchupx-1.onrender.com'; // Use deployed backend
const socket = io(BACKEND_URL, { transports: ['websocket', 'polling'], reconnection: true });

function Scoreboard() {
  const [match, setMatch] = useState(null);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const matchId = window.location.pathname.split('/')[2];

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/matches/${matchId}`);
        setMatch(res.data);
      } catch (err) {
        console.error('Error fetching match:', err.message);
      }
    };
    fetchMatch();

    socket.on('connect', () => console.log('Socket connected to', BACKEND_URL));
    socket.on('scoreUpdate', (data) => {
      if (data._id === matchId) {
        console.log('Received score update:', data);
        setMatch(prevMatch => (JSON.stringify(prevMatch) !== JSON.stringify(data) ? { ...data } : prevMatch));
      }
    });
    socket.on('connect_error', (err) => console.error('Socket connection error:', err.message));

    return () => {
      socket.off('scoreUpdate');
      socket.off('connect');
      socket.off('connect_error');
    };
  }, [matchId]);

  if (!match) return <div className="p-4 text-white">Loading...</div>;

  const battingTeam = match.currentBattingTeam === 'team1' ? match.team1 : match.team2;
  const bowlingTeam = match.currentBattingTeam === 'team1' ? match.team2 : match.team1;
  const striker = match.currentBatsmen?.striker || { name: 'Not set', runs: 0, balls: 0, fours: 0, sixes: 0 };
  const nonStriker = match.currentBatsmen?.nonStriker || { name: 'Not set', runs: 0, balls: 0, fours: 0, sixes: 0 };
  const bowler = match.currentBowler || { name: 'Not set', overs: 0, runs: 0, wickets: 0 };

  const formatOvers = (overs) => {
    const totalBalls = Math.round(overs * 6);
    const over = Math.floor(totalBalls / 6);
    const ballInOver = totalBalls % 6;
    return `${over}.${ballInOver === 0 ? '0' : ballInOver}`;
  };

  if (!match.currentBattingTeam) {
    return (
      <div className="p-6 bg-[#0A1A2E] min-h-screen text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4 text-center text-yellow-400">Match Not Started</h1>
        <p className="text-lg text-center text-gray-300 mb-6">Please select the batting team in the admin panel to start the match.</p>
        <button
          onClick={() => setShowPasswordPrompt(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition duration-300"
        >
          Open Admin Panel
        </button>
        {showPasswordPrompt && (
          <PasswordPrompt
            onSuccess={() => {
              setShowPasswordPrompt(false);
              setShowAdminPanel(true);
            }}
            onClose={() => setShowPasswordPrompt(false)}
          />
        )}
        {showAdminPanel && (
          <AdminControls
            match={match}
            matchId={matchId}
            setMatch={setMatch}
            onClose={() => setShowAdminPanel(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#0A1A2E] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-center text-yellow-400">Match Scoreboard</h1>
      <p className="mb-6 text-center text-gray-300">Toss: {match.toss ? (match.toss === match.team1._id ? match.team1.name : match.team2.name) : 'Not decided'} | Batting: <span className="text-green-400">{battingTeam.name}</span></p>

      <div className="max-w-4xl mx-auto bg-[#1A2D46] p-6 rounded-lg shadow-lg space-y-4">
        <div className="flex justify-between text-xl font-bold text-gray-300 mb-4">
          <span>{battingTeam.name}: {match.score[battingTeam === match.team1 ? 'team1' : 'team2'].runs}/{match.score[battingTeam === match.team1 ? 'team1' : 'team2'].wickets} ({formatOvers(match.score[battingTeam === match.team1 ? 'team1' : 'team2'].overs)} ov)</span>
          <span>{bowlingTeam.name}: {match.score[bowlingTeam === match.team1 ? 'team1' : 'team2'].runs}/{match.score[bowlingTeam === match.team1 ? 'team1' : 'team2'].wickets} ({formatOvers(match.score[bowlingTeam === match.team1 ? 'team1' : 'team2'].overs)} ov)</span>
        </div>

        <div className="space-y-3">
          <p className="text-gray-300">Partnership: <span className="text-yellow-400">{match.currentPartnership.runs} ({match.currentPartnership.balls} balls)</span></p>
          <p className="text-gray-300">Striker: <span className="text-green-400">{striker.name}</span> - {striker.runs}/{striker.balls}</p>
          <p className="text-gray-300">Non-Striker: <span className="text-green-400">{nonStriker.name}</span> - {nonStriker.runs}/{nonStriker.balls}</p>
          <p className="text-gray-300">
            Bowler: <span className="text-red-400">{bowler.name}</span> - {formatOvers(bowler.overs || 0)} {bowler.wickets || 0} {bowler.runs || 0}
          </p>
          <p className="text-gray-300">Current Over: <span className="text-blue-400">{formatOvers(match.score[match.currentBattingTeam].overs)}</span></p>
        </div>

        <div id="ballHistory" className="flex gap-2 mt-5 flex-wrap">
          {match.ballByBall.slice(-10).map((ball, index) => (
            <span key={index} className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm">{ball.event}{ball.extraRuns > 0 ? `+${ball.extraRuns}` : ''}</span>
          ))}
        </div>
      </div>

      <button
        onClick={() => setShowPasswordPrompt(true)}
        className="mt-10 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition duration-300 mx-auto block"
      >
        Update Score
      </button>
      {showPasswordPrompt && (
        <PasswordPrompt
          onSuccess={() => {
            setShowPasswordPrompt(false);
            setShowAdminPanel(true);
          }}
          onClose={() => setShowPasswordPrompt(false)}
        />
      )}
      {showAdminPanel && (
        <AdminControls
          match={match}
          matchId={matchId}
          setMatch={setMatch}
          onClose={() => setShowAdminPanel(false)}
        />
      )}
    </div>
  );
}

export default Scoreboard;