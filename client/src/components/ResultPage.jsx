import { useEffect } from 'react';

import logo from '../assets/ecell_logo.jpeg';

const ResultPage = () => {
    // Prevent back navigation
    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        const handlePopState = () => {
            window.history.pushState(null, null, window.location.href);
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center text-center p-8 min-h-[60vh] relative z-10">
            <div className="bg-black/60 backdrop-blur-xl p-12 rounded-none border-y-4 border-yellow-500 shadow-[0_0_50px_rgba(255,215,0,0.2)] max-w-lg w-full relative">
                {/* E-Cell Logo */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-black border-4 border-yellow-500 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/20 overflow-hidden">
                    <img src={logo} alt="E-Cell" className="w-full h-full object-cover" />
                </div>

                <div className="mt-8">
                    <h1 className="text-5xl font-black text-white mb-2 tracking-tighter uppercase" style={{ textShadow: '2px 2px 0px #FFD700' }}>
                        BIDS LOCKED
                    </h1>
                    <div className="h-1 w-24 bg-yellow-500 mx-auto mb-6"></div>

                    <p className="text-xl text-gray-300 mb-8 font-light uppercase tracking-widest">
                        Your submission has been recorded.
                        <br />
                        <span className="text-yellow-500 font-bold">Good Luck!</span>
                    </p>
                </div>

                <div className="border-t border-white/10 pt-6">
                    <div className="text-xs text-gray-500 font-mono tracking-widest uppercase">
                        Session ID: <span className="text-white">{localStorage.getItem('teamId')?.slice(0, 8) || 'UNKNOWN'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultPage;
