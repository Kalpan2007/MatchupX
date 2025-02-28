import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Activity, BarChart2, Clock } from 'lucide-react';

const Home = () => {
  const upcomingMatches = [
    { id: 1, team1: 'IND', team2: 'AUS', time: '14:30', date: '2024-03-15' },
    { id: 2, team1: 'ENG', team2: 'NZ', time: '19:00', date: '2024-03-15' },
    { id: 3, team1: 'SA', team2: 'PAK', time: '15:30', date: '2024-03-16' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[500px] md:h-[600px]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=2000&q=80"
            alt="Cricket Stadium"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-900/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6">Cricket World Championship 2024</h1>
            <p className="text-lg md:text-xl mb-6 md:mb-8">Experience the thrill of cricket like never before. Join millions of fans worldwide in the biggest cricket tournament of the year.</p>
            <Link
              to="/auction"
              className="inline-flex items-center px-6 md:px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
            >
              Join the Auction
              <Trophy className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Upcoming Matches */}
      <div className="border-b overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-6 md:space-x-8 min-w-max">
            {upcomingMatches.map((match, index) => (
              <div key={match.id} className="flex items-center">
                <div className="text-center">
                  <div className="text-base md:text-lg font-semibold whitespace-nowrap">
                    {match.team1} vs {match.team2}
                  </div>
                  <div className="text-sm text-gray-500">{match.time}</div>
                </div>
                {index < upcomingMatches.length - 1 && (
                  <div className="h-12 w-px bg-gray-200 ml-6 md:ml-8" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Experience Cricket Like Never Before</h2>
          <p className="text-gray-600 text-center mb-12 md:mb-16">Get access to exclusive features that enhance your cricket watching experience</p>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                icon: <Activity className="h-8 w-8 text-blue-600" />,
                title: "Live Match Updates",
                description: "Real-time ball-by-ball updates, commentary, and match statistics at your fingertips"
              },
              {
                icon: <BarChart2 className="h-8 w-8 text-blue-600" />,
                title: "Team Statistics",
                description: "Comprehensive team analytics, player performances, and historical data analysis"
              },
              {
                icon: <Clock className="h-8 w-8 text-blue-600" />,
                title: "Player Rankings",
                description: "Updated player rankings, performance metrics, and career statistics"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tournament Timeline */}
      <div className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Tournament Timeline</h2>
          <p className="text-gray-600 text-center mb-12 md:mb-16">Key dates and events throughout the championship</p>

          <div className="space-y-8">
            {[
              { date: 'June 1, 2024', title: 'Opening Ceremony', desc: 'Grand opening ceremony with cultural performances' },
              { date: 'June 2-15, 2024', title: 'Group Stage', desc: 'Group stage matches across multiple venues' },
              { date: 'June 22-25, 2024', title: 'Quarter Finals', desc: 'Top 8 teams compete in knockout matches' },
              { date: 'June 28-29, 2024', title: 'Semi Finals', desc: 'Semi-final matches at premier venues' },
              { date: 'July 2, 2024', title: 'Final Match', desc: 'Championship final at Lords Cricket Ground' }
            ].map((event, index) => (
              <div key={index} className="flex flex-col md:flex-row items-start">
                <div className="flex-shrink-0 w-full md:w-32 mb-2 md:mb-0">
                  <div className="font-semibold">{event.date}</div>
                </div>
                <div className="flex-shrink-0 hidden md:block">
                  <div className="w-4 h-4 rounded-full bg-blue-600 mt-1" />
                </div>
                <div className="md:ml-8">
                  <h3 className="font-semibold text-lg">{event.title}</h3>
                  <p className="text-gray-600">{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Trophy className="h-8 w-8" />
                <span className="font-bold text-xl">CricketPro</span>
              </div>
              <p className="text-blue-200">The ultimate cricket tournament experience for fans worldwide</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-blue-200 hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="text-blue-200 hover:text-white">Contact</Link></li>
                <li><Link to="/privacy" className="text-blue-200 hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-blue-200 hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-200 hover:text-white">Twitter</a>
                <a href="#" className="text-blue-200 hover:text-white">Facebook</a>
                <a href="#" className="text-blue-200 hover:text-white">Instagram</a>
                <a href="#" className="text-blue-200 hover:text-white">YouTube</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-lg sm:rounded-r-none w-full text-gray-900"
                />
                <button className="bg-blue-600 px-4 py-2 rounded-lg sm:rounded-l-none hover:bg-blue-700 transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
            <p>© 2024 Cricket World Championship. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;