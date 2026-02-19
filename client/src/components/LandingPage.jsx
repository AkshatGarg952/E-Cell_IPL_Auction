import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';


import logo from '../assets/ecell_logo.jpeg';
import { getApiUrl } from '../utils';

const LandingPage = () => {
    const [formData, setFormData] = useState({
        teamName: '',
        leaderName: '',
        scholarNumber: ''
    });
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    // Auto-redirect if already started/finished
    useEffect(() => {
        if (localStorage.getItem('FINAL_SCORE')) {
            navigate('/result');
        } else if (localStorage.getItem('teamId')) {
            navigate('/quiz');
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Register team via local Node server
            const response = await fetch(`${getApiUrl()}/api/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            let data;
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                data = await response.json();
            } else {
                // If response is not JSON (e.g. 404 HTML), throw meaningful error
                const text = await response.text();
                throw new Error(`Server Error (${response.status}): ${text.slice(0, 100)}...`);
            }

            if (response.ok) {
                // Store team ID and SESSION TOKEN for the quiz session
                localStorage.setItem('teamId', data.teamId);
                localStorage.setItem('teamName', formData.teamName);
                if (data.sessionToken) {
                    localStorage.setItem('sessionToken', data.sessionToken);
                }

                navigate('/quiz');
            } else {
                throw new Error(data.error || "Registration failed");
            }
        } catch (error) {
            console.error("Error registering team: ", error);
            alert(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/40 backdrop-blur-xl p-10 rounded-xl shadow-2xl max-w-2xl w-full border border-yellow-500/30 relative overflow-hidden"
            style={{ boxShadow: '0 0 40px rgba(255, 215, 0, 0.1)' }}
        >
            {/* Gold Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse"></div>

            <div className="flex flex-col items-center mb-8">
                {/* E-Cell Logo */}
                <div className="w-24 h-24 mb-6">
                    <img src={logo} alt="E-Cell IIIT Bhopal" className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]" />
                </div>
                <h1 className="text-3xl font-black text-white uppercase tracking-widest text-center">
                    IPL Auction <span className="text-yellow-500 block text-sm font-medium tracking-[0.5em] mt-2">Registration</span>
                </h1>
            </div>

            {!showForm ? (
                // --- INSTRUCTIONS VIEW ---
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6 text-white"
                >
                    <div className="bg-white/5 border-l-4 border-white/40 p-4">
                        <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">How To Take The Quiz</h3>
                        <ul className="space-y-2 text-sm text-gray-300 list-disc list-inside">
                            <li><strong className="text-white">Use One Device Only:</strong> Do not open the quiz on a second phone or laptop. The earlier device will be logged out.</li>
                            <li><strong className="text-white">Stay Online:</strong> Use stable Wi-Fi or data. Avoid switching networks during the quiz.</li>
                            <li><strong className="text-white">Timer Is Strict:</strong> The 5-minute timer runs on the server. Refreshing will NOT reset time.</li>
                            <li><strong className="text-white">Do Not Use Back/Forward:</strong> Browser back/forward is blocked and can interrupt the session.</li>
                            <li><strong className="text-white">Submit Carefully:</strong> If your internet drops during submit, the app saves an offline copy and shows an error.</li>
                        </ul>
                    </div>

                    <p className="text-xs text-gray-500 text-center font-mono">
                        By entering, you agree to follow the quiz rules above.
                    </p>

                    <button
                        onClick={() => setShowForm(true)}
                        className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black py-4 px-6 uppercase tracking-widest shadow-[0_0_20px_rgba(255,215,0,0.3)] transform transition-all hover:scale-[1.02] clip-path-polygon"
                        style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
                    >
                        Enter Auction Hall
                    </button>
                </motion.div>
            ) : (
                // --- FORM VIEW ---
                <motion.form
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6 relative z-10"
                >
                    <div>
                        <label className="block text-xs font-bold text-yellow-500/80 mb-1 uppercase tracking-wider">Team Name</label>
                        <input
                            type="text"
                            name="teamName"
                            required
                            className="w-full bg-black/50 border border-white/10 rounded-none p-3 text-white focus:outline-none focus:border-yellow-500 transition-all placeholder-white/20 font-mono"
                            placeholder="ROYAL CHALLENGERS..."
                            value={formData.teamName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-yellow-500/80 mb-1 uppercase tracking-wider">Team Leader</label>
                        <input
                            type="text"
                            name="leaderName"
                            required
                            className="w-full bg-black/50 border border-white/10 rounded-none p-3 text-white focus:outline-none focus:border-yellow-500 transition-all placeholder-white/20 font-mono"
                            placeholder="VIRAT KOHLI..."
                            value={formData.leaderName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-yellow-500/80 mb-1 uppercase tracking-wider">Scholar Number</label>
                        <input
                            type="text"
                            name="scholarNumber"
                            required
                            className="w-full bg-black/50 border border-white/10 rounded-none p-3 text-white focus:outline-none focus:border-yellow-500 transition-all placeholder-white/20 font-mono"
                            placeholder="2211..."
                            value={formData.scholarNumber}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="flex-1 bg-transparent border border-white/20 hover:bg-white/10 text-white font-bold py-4 px-6 uppercase tracking-widest transition-all"
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-[2] bg-yellow-500 hover:bg-yellow-400 text-black font-black py-4 px-6 uppercase tracking-widest shadow-[0_0_20px_rgba(255,215,0,0.3)] transform transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed clip-path-polygon"
                            style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
                        >
                            {loading ? 'Processing...' : 'Register Team'}
                        </button>
                    </div>
                </motion.form>
            )}
            <div className="absolute bottom-4 right-4">
                <span className="text-[10px] uppercase tracking-[0.35em] text-yellow-500/80 bg-black/60 border border-yellow-500/40 px-3 py-1 shadow-[0_0_12px_rgba(255,215,0,0.25)]">
                    Created by Akshat Garg
                </span>
            </div>

        </motion.div>
    );
};

export default LandingPage;
