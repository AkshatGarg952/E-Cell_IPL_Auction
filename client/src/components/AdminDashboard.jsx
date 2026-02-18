import { useState, useEffect, useCallback } from 'react';
import { getApiUrl } from '../utils';

const AdminDashboard = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [lastUpdated, setLastUpdated] = useState(null);

    const fetchLeaderboard = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${getApiUrl()}/api/leaderboard`);
            const data = await response.json();
            setTeams(data);
            setLastUpdated(new Date());
        } catch (err) {
            console.error("Error fetching teams:", err);
            setError(`Failed to connect to backend: ${err.message}`);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!isAuthenticated) return;
        fetchLeaderboard();
    }, [isAuthenticated, fetchLeaderboard]);

    const handleLogin = (e) => {
        e.preventDefault();
        // Hardcoded password for simplicity as requested "answers provided to you"
        if (password === 'admin123') {
            setIsAuthenticated(true);
        } else {
            alert("Invalid Password");
        }
    };

    const formatTimeTaken = (seconds) => {
        if (seconds === null || seconds === undefined) return '-';
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
                <h1 className="text-5xl font-extrabold text-center md:text-left text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-lg relative">
                    Leaderboard
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <button
                        type="button"
                        onClick={fetchLeaderboard}
                        disabled={loading}
                        className={`px-5 py-3 rounded-lg font-bold transition-transform transform ${
                            loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'
                        } text-white`}
                    >
                        {loading ? 'Loading...' : 'Load Leaderboard'}
                    </button>
                    <div className="text-xs text-gray-400">
                        {lastUpdated ? `Last updated: ${lastUpdated.toLocaleString()}` : 'Not loaded yet'}
                    </div>
                </div>
            </div>

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
                            <th className="px-6 py-4 font-semibold text-right">Time Taken</th>
                            <th className="px-6 py-4 font-semibold text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {teams.length === 0 && !loading && (
                            <tr>
                                <td className="px-6 py-8 text-center text-gray-400" colSpan={7}>
                                    No completed teams yet.
                                </td>
                            </tr>
                        )}
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
                                <td className="px-6 py-4 text-right font-mono text-sm">{formatTimeTaken(team.timeTaken)}</td>
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
