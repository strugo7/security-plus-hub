import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        // Simulate boot sequence completion to show button
        const timer = setTimeout(() => {
            setShowButton(true);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="bg-black text-green-500 font-mono antialiased h-screen overflow-hidden flex flex-col relative selection:bg-green-900 selection:text-white" dir="ltr">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-grid-pattern bg-[length:40px_40px] opacity-20"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_90%)]"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                    <span className="material-symbols-outlined text-[30rem] md:text-[40rem]">shield_lock</span>
                </div>
            </div>

            <div className="scanlines fixed inset-0"></div>
            <div className="crt-flicker"></div>

            {/* Corner Status */}
            <div className="absolute top-6 left-6 z-20 text-xs md:text-sm text-primary/70 font-mono tracking-widest hidden md:block">
                <div className="mb-1">KERNEL STATUS: <span className="text-terminal-green">OK</span></div>
                <div className="mb-1">MEMORY INTEGRITY: <span className="text-terminal-green">VERIFIED</span></div>
                <div>UPTIME: 00:00:12:45</div>
            </div>
            <div className="absolute top-6 right-6 z-20 text-xs md:text-sm text-primary/70 font-mono tracking-widest hidden md:block">
                <div className="text-right mb-1">ENCRYPTION: <span className="text-terminal-cyan">AES-256 ACTIVE</span></div>
                <div className="text-right">SECURE_BOOT: ENABLED</div>
            </div>
            <div className="absolute bottom-6 left-6 z-20 text-xs md:text-sm text-primary/50 font-mono tracking-widest hidden md:block">
                <div>LOCATION: [REDACTED]</div>
                <div>IP: 192.168.X.XXX (MASKED)</div>
            </div>
            <div className="absolute bottom-6 right-6 z-20 text-xs md:text-sm text-primary/50 font-mono tracking-widest hidden md:block">
                <div className="text-right">BUILD: v4.2.1-alpha</div>
                <div className="text-right">CYBERGUARD ACADEMY TERMINAL</div>
            </div>

            {/* Main Content */}
            <main className="relative z-10 flex-grow flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-4">
                <div className="relative mb-12 flex flex-col items-center">
                    <div className="relative w-32 h-32 md:w-48 md:h-48 flex items-center justify-center mb-8">
                        <div className="absolute inset-0 border-2 border-primary/20 rounded-full"></div>
                        <div className="absolute inset-0 border-t-2 border-r-2 border-b-2 border-transparent border-t-terminal-cyan border-r-terminal-cyan rounded-full animate-spin-slow shadow-[0_0_15px_rgba(0,255,255,0.3)]"></div>
                        <div className="absolute inset-4 border border-primary/30 rounded-full animate-pulse"></div>
                        <div className="text-terminal-cyan drop-shadow-[0_0_10px_rgba(0,255,255,0.8)] z-10">
                            <span className="material-symbols-outlined text-6xl md:text-7xl animate-pulse-fast">lock_open</span>
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-2 tracking-wide text-center drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                        INITIALIZING SYSTEM...
                    </h1>
                    <h2 className="text-lg md:text-xl text-primary font-mono tracking-wider opacity-80 mb-8">
                        ACCESS GRANTED
                    </h2>

                    <div className="w-full max-w-2xl h-48 bg-black/50 border border-primary/20 rounded p-4 font-mono text-sm md:text-base overflow-hidden relative mb-8 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] backdrop-blur-sm">
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none"></div>
                        <div className="space-y-1 opacity-90 flex flex-col justify-end h-full pb-2">
                            <div className="text-terminal-green/60 terminal-text">&gt; CONNECTING TO SECURE GATEWAY... [OK]</div>
                            <div className="text-terminal-green/70 terminal-text">&gt; ESTABLISHING TLS HANDSHAKE... [OK]</div>
                            <div className="text-terminal-green/80 terminal-text">&gt; BYPASSING FIREWALL LAYER 3... [SUCCESS]</div>
                            <div className="text-terminal-green/90 terminal-text">&gt; LOADING SECURITY DOMAINS...</div>
                            <div className="text-terminal-cyan cyan-glow">&gt; DECRYPTING USER PROFILE...</div>
                            <div className="text-terminal-cyan cyan-glow animate-pulse">&gt; ACCESSING MAIN FRAMEWORK... <span className="animate-blink">_</span></div>
                        </div>
                    </div>

                    <div className="w-full max-w-3xl relative group">
                        <div className="flex justify-between text-xs md:text-sm font-mono text-primary mb-2 tracking-widest">
                            <span>LOADING_ASSETS</span>
                            <span className="animate-pulse">78%</span>
                        </div>
                        <div className="h-6 md:h-8 w-full bg-[#05101a] border border-primary/30 rounded-sm relative overflow-hidden p-1">
                            <div className="h-full w-[78%] bg-primary relative flex items-center overflow-hidden shadow-[0_0_15px_rgba(13,166,242,0.6)]">
                                <div className="absolute inset-0 w-full h-full border-r-2 border-black" style={{ backgroundImage: 'linear-gradient(90deg, transparent 95%, #000 95%)', backgroundSize: '20px 100%' }}></div>
                                <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent"></div>
                            </div>
                        </div>
                        <div className="flex justify-between text-[10px] md:text-xs font-mono text-slate-500 mt-2 uppercase tracking-wider">
                            <span>Process ID: 8944</span>
                            <span>ETA: 3s</span>
                        </div>
                    </div>

                    {/* Enter Button */}
                    <div className={`mt-12 transition-opacity duration-1000 ${showButton ? 'opacity-100' : 'opacity-0'}`}>
                        <button
                            onClick={() => navigate('/loading')}
                            className="px-12 py-4 bg-primary/20 hover:bg-primary/40 text-primary border border-primary/50 hover:border-primary rounded font-mono text-xl tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(13,166,242,0.3)] hover:shadow-[0_0_40px_rgba(13,166,242,0.6)]"
                        >
                            Enter System
                        </button>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default LandingPage;
