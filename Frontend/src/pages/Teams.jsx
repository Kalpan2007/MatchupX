import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

function TeamList() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use the same backend URL as other components
  const BACKEND_URL = 'https://matchupx-1.onrender.com'; // Force deployed backend for now
  // Optional: Uncomment for local testing once backend is stable
  // const getBackendUrl = () => {
  //   const { hostname } = window.location;
  //   if (hostname === 'localhost' || hostname === '127.0.0.1') {
  //     return 'http://localhost:5000';
  //   }
  //   return 'https://matchupx-1.onrender.com';
  // };
  // const BACKEND_URL = getBackendUrl();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/teams`, {
          timeout: 10000, // Set a 10-second timeout to avoid hanging on 502
        });
        console.log('Teams response:', res.data);
        const data = Array.isArray(res.data) ? res.data : [];
        setTeams(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching teams:', err.message, {
          status: err.response?.status,
          data: err.response?.data,
        });
        let errorMessage = 'Failed to fetch teams';
        if (err.code === 'ECONNABORTED') {
          errorMessage = 'Request timed out. The server might be down.';
        } else if (err.response?.status === 502) {
          errorMessage = 'Server error (502 Bad Gateway). Please try again later.';
        } else if (err.message.includes('Network Error')) {
          errorMessage = 'Network error. Check your connection or server status.';
        } else {
          errorMessage = err.response?.data?.error || err.message;
        }
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <div className="p-4 text-black flex flex-col items-center">
        <p>Loading teams...</p>
        <p className="text-sm text-gray-500">If this takes too long, the server might be unavailable.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 flex flex-col items-center">
        <p>Error: {error}</p>
        <Button
          variant="outlined"
          onClick={() => window.location.reload()}
          className="mt-2"
        >
          Retry
        </Button>
      </div>
    );
  }

  if (teams.length === 0) {
    return (
      <div className="p-4 text-black">
        <p>No teams found.</p>
        <Button variant="contained" component={Link} to="/matches" className="mt-2">
          Go to Schedule
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Teams</h1>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {teams.map((team) => (
          <div key={team._id} className="p-4 bg-white rounded shadow">
            <h2 className="text-lg font-semibold">{team.name}</h2>
            <ul>
              {team.players.map((player, i) => (
                <li key={i} className="flex items-center">
                  {player.name} - {player.points} points
                  {player.isCaptain && <span className="ml-2 text-yellow-500 font-bold">(C)</span>}
                  {player.isViceCaptain && <span className="ml-2 text-blue-500 font-bold">(VC)</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Button variant="contained" component={Link} to="/matches">
          Go to Schedule
        </Button>
      </div>
    </div>
  );
}

export default TeamList;