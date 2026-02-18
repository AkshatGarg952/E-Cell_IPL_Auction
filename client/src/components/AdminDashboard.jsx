import { useState, useEffect } from 'react';
import { getApiUrl } from '../utils';

const AdminDashboard = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (!isAuthenticated) return;

        const fetchLeaderboard = async () => {
            try {
                const response = await fetch(`${getApiUrl()}/api/leaderboard`);
                const data = await response.json();
                setTeams(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching teams:", err);
                setError(`Failed to connect to backend: ${err.message}`);
                setLoading(false);
            }
        };

        // Initial fetch
        fetchLeaderboard();

        // Poll every 5 seconds
        const interval = setInterval(fetchLeaderboard, 5000);
        return () => clearInterval(interval);
    }, [isAuthenticated]);

    const handleLogin = (e) => {
        e.preventDefault();
        // Hardcoded password for simplicity as requested "answers provided to you"
        if (password === 'admin123') {
            setIsAuthenticated(true);
        } else {
            alert("Invalid Password");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
                <form onSubmit={handleLogin} className="bg-white/10 p-8 rounded-2xl backdrop-blur-md border border-white/20 shadow-2xl w-full max-w-sm">
                    <h1 className="text-2xl font-bold mb-6 text-white text-center">Admin Login</h1>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        className="w-full p-3 rounded-lg mb-6 bg-black/40 text-white border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-bold transition-transform transform hover:scale-105">Login</button>
                </form>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto p-4 mt-10">
            <h1 className="text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-lg relative">
                Live Leaderboard
            </h1>

            {error && (
                <div className="bg-red-500/20 text-red-200 p-4 rounded-lg mb-8 text-center border border-red-500/50">
                    {error}
                </div>
            )}

            <div className="overflow-hidden bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
                <table className="w-full text-left text-gray-300">
                    <thead className="bg-black/40 text-gray-400 uppercase text-xs tracking-wider">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Rank</th>
                            <th className="px-6 py-4 font-semibold">Team Name</th>
                            <th className="px-6 py-4 font-semibold">Leader</th>
                            <th className="px-6 py-4 font-semibold">Scholar No.</th>
                            <th className="px-6 py-4 font-semibold text-right">Score</th>
                            <th className="px-6 py-4 font-semibold text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {teams.map((team, index) => (
                            <tr key={team.id} className="hover:bg-white/5 transition-colors duration-200">
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-black ${index === 0 ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50' :
                                        index === 1 ? 'bg-gray-300 shadow-lg shadow-gray-300/50' :
                                            index === 2 ? 'bg-orange-400 shadow-lg shadow-orange-400/50' :
                                                'bg-gray-700 text-white'
                                        }`}>
                                        {index + 1}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-medium text-white text-lg">{team.teamName}</td>
                                <td className="px-6 py-4">{team.leaderName}</td>
                                <td className="px-6 py-4 font-mono text-sm">{team.scholarNumber}</td>
                                <td className="px-6 py-4 font-bold text-yellow-400 text-right text-xl">{team.score || 0}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${team.status === 'completed' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                                        }`}>
                                        {team.status || 'Registered'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
