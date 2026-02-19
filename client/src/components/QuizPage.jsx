import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


import { shuffleArray, getApiUrl } from '../utils';


import logo from '../assets/ecell_logo.jpeg';

const QuizPage = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
        const savedIndex = localStorage.getItem('quiz_current_index');
        return savedIndex ? parseInt(savedIndex, 10) : 0;
    });
    const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes
    const [quizStartTime, setQuizStartTime] = useState(null);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    // Prevent back button
    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        const handlePopState = () => {
            window.history.pushState(null, null, window.location.href);
            alert("Navigation is disabled during the quiz.");
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    // Session Heartbeat (Single Active Device)
    useEffect(() => {
        const checkSession = async () => {
            const teamId = localStorage.getItem('teamId');
            const sessionToken = localStorage.getItem('sessionToken');

            if (!teamId || !sessionToken) return; // Should be handled by initQuiz logic

            try {
                const res = await fetch(`${getApiUrl()}/api/heartbeat`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ teamId, sessionToken })
                });

                if (res.status === 409) {
                    // Conflict: Another device logged in
                    alert("Session Active on Another Device. You are being logged out.");
                    localStorage.clear();
                    window.location.href = '/';
                } else if (res.status === 401) {
                    // Expired/Server Restart: Re-login required
                    // We don't alert here to avoid spamming if server is just restarting momentarily
                    // But strictly we should kick them out if server lost state
                    // For now, let's kick them to be safe and ensure consistent state
                    console.warn("Session expired or server restarted.");
                    // Optional: specific alert or just silent redirect
                    localStorage.removeItem('sessionToken'); // Force re-login logic
                    // We keep teamId so LandingPage might try to auto-redirect? 
                    // No, LandingPage checks for teamId. 
                    // If we clear teamId, they see form.
                    // Let's clear everything to be safe.
                    alert("Session expired. Please login again.");
                    localStorage.clear();
                    window.location.href = '/';
                }
            } catch (err) {
                console.error("Heartbeat failed:", err);
                // Don't kick out on network error immediately, wait for next beat
            }
        };

        let timeoutId;

        const scheduleNextHeartbeat = () => {
            // Base interval 15s + Random jitter 0-5s = 15-20s interval
            const delay = 15000 + Math.random() * 5000;
            timeoutId = setTimeout(async () => {
                await checkSession();
                scheduleNextHeartbeat();
            }, delay);
        };

        scheduleNextHeartbeat();

        return () => clearTimeout(timeoutId);
    }, []);

    // Load questions & Start Quiz
    useEffect(() => {
        const initQuiz = async () => {
            const teamId = localStorage.getItem('teamId');
            if (!teamId) {
                navigate('/');
                return;
            }

            try {
                // 1. Get/Set Start Time from Server
                const res = await fetch(`${getApiUrl()}/api/start-quiz`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ teamId })
                });

                if (!res.ok) throw new Error("Failed to start quiz");

                const data = await res.json();
                const serverStartTime = new Date(data.startTime).getTime();
                setQuizStartTime(serverStartTime);
                const now = Date.now();
                const elapsedSeconds = Math.floor((now - serverStartTime) / 1000);
                const totalDuration = 5 * 60; // 5 minutes
                const remaining = totalDuration - elapsedSeconds;

                if (remaining <= 0) {
                    // Time already up
                    setTimeLeft(0);
                    handleSubmitQuiz(true);
                    return;
                }

                setTimeLeft(remaining);

                // 2. Load Questions & Restore State
                // Fetch questions from server
                const qRes = await fetch(`${getApiUrl()}/api/questions`);
                if (!qRes.ok) throw new Error("Failed to fetch questions");
                const serverQuestions = await qRes.json();

                // Restore order and answers from localStorage if available
                const storedOrder = localStorage.getItem('quiz_order');
                const storedAnswers = localStorage.getItem('quiz_answers');

                let finalQuestions = [];

                if (storedOrder) {
                    const orderIds = JSON.parse(storedOrder);
                    // Reconstruct questions array based on stored ID order
                    finalQuestions = orderIds.map(id => serverQuestions.find(q => q.id === id)).filter(Boolean);

                    // Fallback if questions changed/missing (shouldn't happen often)
                    if (finalQuestions.length !== serverQuestions.length) {
                        finalQuestions = shuffleArray(serverQuestions);
                        localStorage.setItem('quiz_order', JSON.stringify(finalQuestions.map(q => q.id)));
                    }
                } else {
                    // First load -> Shuffle and Store
                    finalQuestions = shuffleArray(serverQuestions);
                    localStorage.setItem('quiz_order', JSON.stringify(finalQuestions.map(q => q.id)));
                }

                setQuestions(finalQuestions);

                if (storedAnswers) {
                    setAnswers(JSON.parse(storedAnswers));
                }

                setLoading(false);

            } catch (err) {
                console.error(err);
                setError("Failed to load quiz. Check connection.");
                setLoading(false);
            }
        };

        initQuiz();
    }, [navigate]);

    // Timer Logic
    useEffect(() => {
        if (loading || !quizStartTime) return;

        const totalDuration = 5 * 60; // 5 minutes
        const timer = setInterval(() => {
            const elapsedSeconds = Math.floor((Date.now() - quizStartTime) / 1000);
            const remaining = Math.max(0, totalDuration - elapsedSeconds);
            setTimeLeft(remaining);
            if (remaining <= 0) {
                clearInterval(timer);
                handleSubmitQuiz(true); // Auto submit
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [loading, quizStartTime]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleOptionSelect = async (optionIndex) => {
        const currentQuestion = questions[currentQuestionIndex];

        setAnswers(prev => {
            const newAnswers = {
                ...prev,
                [currentQuestion.id]: optionIndex
            };
            // Persist answers immediately
            localStorage.setItem('quiz_answers', JSON.stringify(newAnswers));
            return newAnswers;
        });

        // Optimistic update to Firestore (Removed/Commented as we are using Node now?)
        // Keeping logic simple: Local persistence is primary for reliability
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            const nextIndex = currentQuestionIndex + 1;
            setCurrentQuestionIndex(nextIndex);
            localStorage.setItem('quiz_current_index', nextIndex);
        } else {
            handleSubmitQuiz(false);
        }
    };

    const handleSubmitQuiz = async (auto = false) => {
        const teamId = localStorage.getItem('teamId');

        const totalDuration = 5 * 60;
        const computedTimeTaken = quizStartTime
            ? Math.min(totalDuration, Math.max(0, Math.floor((Date.now() - quizStartTime) / 1000)))
            : totalDuration - timeLeft;

        const storedAnswers = localStorage.getItem('quiz_answers');
        const effectiveAnswers = storedAnswers ? JSON.parse(storedAnswers) : answers;

        // Payload for backend
        const payload = {
            teamId: teamId,
            answers: effectiveAnswers,
            timeTaken: computedTimeTaken
        };

        if (teamId) {
            try {
                // Send to local Node server
                const response = await fetch(`${getApiUrl()}/api/submit`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const data = await response.json();

                if (response.ok) {
                    // Clear Quiz State
                    localStorage.removeItem('quiz_order');
                    localStorage.removeItem('quiz_answers');
                    localStorage.removeItem('quiz_current_index');

                    // Update local storage for result page
                    localStorage.setItem('FINAL_SCORE', data.score);
                    navigate('/result');
                } else {
                    throw new Error(data.error || "Submission failed");
                }
            } catch (error) {
                console.error("Error submitting quiz:", error);

                // Fallback: Store in local storage if server fails
                const resultData = {
                    ...payload,
                    timestamp: new Date().toISOString()
                };
                localStorage.setItem('OFFLINE_RESULT', JSON.stringify(resultData));

                // Clear state even on offline save to prevent re-taking
                localStorage.removeItem('quiz_order');
                localStorage.removeItem('quiz_answers');
                localStorage.removeItem('quiz_current_index');

                alert(`Connection Error! Please take a photo of your answers. Server is offline.`);
                navigate('/result');
            }
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-gray-300 text-lg font-semibold">Loading quiz...</div>
        </div>
    );

    if (error) return (
        <div className="flex items-center justify-center h-screen text-center p-4">
            <div className="bg-red-500/20 text-red-200 p-6 rounded-lg border border-red-500/50 backdrop-blur-sm max-w-md">
                <h2 className="text-2xl font-bold mb-2">Error</h2>
                <p>{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
                >
                    Retry
                </button>
            </div>
        </div>
    );

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div
            className="w-full max-w-5xl mx-auto p-4 flex flex-col items-center relative z-10 font-sans select-none"
            onContextMenu={(e) => e.preventDefault()}
            onCopy={(e) => e.preventDefault()}
            style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}
        >
            {/* Auction Header */}
            <div className="w-full flex justify-between items-center mb-8 bg-black/80 backdrop-blur-md p-6 border-b-2 border-yellow-500 shadow-[0_4px_20px_rgba(255,215,0,0.1)]">
                <div className="flex items-center gap-4">
                    <img src={logo} alt="Logo" className="h-10 w-auto" />
                    <div className="flex flex-col">
                        <span className="text-yellow-500 text-xs font-bold tracking-widest uppercase mb-1">Lot Number</span>
                        <div className="text-3xl font-black text-white tracking-tighter">
                            {currentQuestionIndex + 1}<span className="text-gray-600 text-xl">/{questions.length}</span>
                        </div>
                    </div>
                </div>
                {/* Digital Timer */}
                <div className="flex flex-col items-end">
                    <span className="text-yellow-500 text-xs font-bold tracking-widest uppercase mb-1">Time Remaining</span>
                    <div className={`text-4xl font-mono font-black tracking-widest ${timeLeft < 60 ? 'text-red-500' : 'text-white'}`} style={{ textShadow: '0 0 10px currentColor' }}>
                        {formatTime(timeLeft)}
                    </div>
                </div>
            </div>

            {/* Main Auction Stage */}
            <div className="w-full flex justify-center mb-10">
                {currentQuestion && (
                    <div className="w-full">
                            {/* Question "Asset" Card */}
                            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 p-8 mb-8 relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500"></div>
                                <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                                    {currentQuestion.question}
                                </h2>
                                {/* Decorative "Verified Asset" Badge */}
                                <div className="absolute top-4 right-4 opacity-20">
                                    <svg className="w-16 h-16 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                </div>
                            </div>

                            {/* Bidding Options */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {currentQuestion.options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleOptionSelect(index)}
                                        className={`
                                            relative p-6 text-left transition-all duration-300 transform hover:scale-[1.02]
                                            border-2 
                                            ${answers[currentQuestion.id] === index
                                                ? 'bg-yellow-500 border-yellow-500 text-black shadow-[0_0_30px_rgba(255,215,0,0.4)]'
                                                : 'bg-black/40 border-white/10 text-gray-300 hover:border-yellow-500/50 hover:text-white'
                                            }
                                        `}
                                        style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}
                                    >
                                        <div className="flex items-center">
                                            <div className={`
                                                flex-shrink-0 w-10 h-10 flex items-center justify-center font-bold text-lg mr-4 border
                                                ${answers[currentQuestion.id] === index ? 'border-black text-black' : 'border-white/20 text-yellow-500'}
                                            `}>
                                                {String.fromCharCode(65 + index)}
                                            </div>
                                            <span className="font-semibold text-lg tracking-wide">{option}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                    </div>
                )}
            </div>

            {/* Navigation Paddle */}
            <button
                onClick={handleNext}
                className="group relative inline-flex items-center justify-center px-8 py-4 font-black text-black transition-all duration-200 bg-white font-mono uppercase tracking-widest hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)' }} // Paddle shape
            >
                {currentQuestionIndex === questions.length - 1 ? 'SEAL BID' : 'NEXT LOT'}
                <div className="absolute inset-0 h-full w-full scale-0 rounded transition-all duration-300 group-hover:scale-100 group-hover:bg-yellow-400/30"></div>
            </button>
        </div>
    );
};

export default QuizPage;
