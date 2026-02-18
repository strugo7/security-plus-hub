import React from 'react';

const Dashboard: React.FC = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display overflow-x-hidden min-h-screen flex flex-col">
            <header className="sticky top-0 z-50 flex items-center justify-between border-b border-solid border-slate-200 dark:border-[#233648] bg-white dark:bg-[#111a22]/90 backdrop-blur-md px-6 py-4 md:px-10">
                <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary">
                        <span className="material-symbols-outlined text-3xl">security</span>
                    </div>
                    <h1 className="text-xl font-bold tracking-tight hidden sm:block">CyberGuard <span className="text-primary font-normal">Academy</span></h1>
                </div>
                <div className="flex-1 max-w-xl mx-6 hidden md:block">
                    <label className="relative flex items-center w-full group">
                        <span className="absolute left-4 text-text-secondary group-focus-within:text-primary transition-colors duration-200 material-symbols-outlined">search</span>
                        <input className="w-full bg-slate-100 dark:bg-[#233648] border-none rounded-lg py-2.5 pl-12 pr-4 text-sm text-slate-900 dark:text-white placeholder-text-secondary focus:ring-2 focus:ring-primary/50 focus:bg-white dark:focus:bg-[#192633] transition-all duration-200" placeholder="Search profiles, badges, or certifications..." type="text" />
                    </label>
                </div>
                <div className="flex items-center gap-4">
                    <button className="relative p-2 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-[#111a22]"></span>
                    </button>
                    <div className="h-8 w-[1px] bg-slate-200 dark:bg-[#233648]"></div>
                    <button className="flex items-center gap-3 pl-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#233648] transition-colors p-1">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-semibold leading-none">Alex M.</p>
                            <p className="text-xs text-text-secondary leading-none mt-1">Pro Member</p>
                        </div>
                        <div className="size-9 rounded-full bg-slate-200 dark:bg-[#233648] overflow-hidden border border-slate-300 dark:border-[#334b63]">
                            <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined">person</span>
                            </div>
                        </div>
                    </button>
                </div>
            </header>

            <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 md:px-10 py-8">
                <div className="relative rounded-2xl bg-card-dark border border-[#233648] p-6 mb-8 overflow-hidden shadow-lg">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-cyber-gradient opacity-60"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="relative">
                            <div className="size-24 md:size-32 rounded-full p-1 bg-gradient-to-br from-primary to-accent">
                                <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#192633] bg-slate-800 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-6xl text-slate-400">person</span>
                                </div>
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-[#192633] rounded-full p-1.5 border border-[#233648]">
                                <span className="material-symbols-outlined text-yellow-400 filled">workspace_premium</span>
                            </div>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
                                <h2 className="text-3xl font-bold text-white">Alex M.</h2>
                                <span className="px-2 py-0.5 rounded text-xs font-bold bg-primary/20 text-primary border border-primary/30 uppercase tracking-wide">Pro Member</span>
                            </div>
                            <p className="text-text-secondary mb-4">Cybersecurity Analyst • Level 14 • Joined Jan 2023</p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                <button className="px-4 py-2 bg-[#233648] hover:bg-[#2d445b] text-white text-sm font-medium rounded-lg transition-colors border border-slate-700 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">edit</span>
                                    Edit Profile
                                </button>
                                <button className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium rounded-lg transition-colors border border-primary/20 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">share</span>
                                    Share Profile
                                </button>
                            </div>
                        </div>
                        <div className="hidden md:flex flex-col items-end justify-center h-full pt-2">
                            <div className="text-right mb-2">
                                <span className="text-xs text-text-secondary uppercase tracking-wider">Current Rank</span>
                                <div className="text-xl font-bold text-accent">Security Architect II</div>
                            </div>
                            <div className="w-48 h-2 bg-[#101922] rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-primary to-accent w-[78%]"></div>
                            </div>
                            <span className="text-xs text-text-secondary mt-1">7,850 / 10,000 XP</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-card-dark border border-[#233648] rounded-xl p-6 shadow-lg">
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">speed</span>
                                Exam Readiness
                            </h3>
                            <div className="relative size-56 mx-auto mb-4">
                                <svg className="w-full h-full" viewBox="0 0 100 100">
                                    <circle className="text-[#233648]" cx="50" cy="50" fill="transparent" r="42" stroke="currentColor" strokeWidth="8"></circle>
                                    <circle className="text-primary gauge-circle" cx="50" cy="50" fill="transparent" r="42" stroke="currentColor" strokeDasharray="264" strokeDashoffset="74" strokeLinecap="round" strokeWidth="8"></circle>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-4xl font-bold text-white">72%</span>
                                    <span className="text-xs text-text-secondary uppercase tracking-wider mt-1">Ready</span>
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="text-sm text-text-secondary mb-4">You are on track to pass the Security+ exam.</p>
                                <div className="grid grid-cols-2 gap-4 border-t border-[#233648] pt-4">
                                    <div>
                                        <div className="text-2xl font-bold text-white">42</div>
                                        <div className="text-xs text-text-secondary">Modules Done</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-white">85h</div>
                                        <div className="text-xs text-text-secondary">Study Time</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-card-dark border border-[#233648] rounded-xl p-6 shadow-lg">
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-accent">radar</span>
                                Skills Radar
                            </h3>
                            <div className="relative w-full aspect-square max-w-[300px] mx-auto flex items-center justify-center">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-full h-full border border-[#233648] radar-bg bg-[#101922]"></div>
                                    <div className="absolute w-[70%] h-[70%] border border-[#233648] radar-bg"></div>
                                    <div className="absolute w-[40%] h-[40%] border border-[#233648] radar-bg"></div>
                                    <div className="absolute w-full h-[1px] bg-[#233648]"></div>
                                    <div className="absolute h-full w-[1px] bg-[#233648]"></div>
                                    <div className="absolute w-full h-[1px] bg-[#233648] rotate-60"></div>
                                    <div className="absolute w-full h-[1px] bg-[#233648] -rotate-60"></div>
                                </div>
                                <div className="absolute w-full h-full bg-primary/20 border-2 border-primary radar-shape z-10"></div>
                                <span className="absolute top-2 text-[10px] text-text-secondary bg-[#192633] px-1">Network Sec</span>
                                <span className="absolute bottom-2 text-[10px] text-text-secondary bg-[#192633] px-1">Compliance</span>
                                <span className="absolute left-0 text-[10px] text-text-secondary bg-[#192633] px-1">Threats</span>
                                <span className="absolute right-0 text-[10px] text-text-secondary bg-[#192633] px-1">Architecture</span>
                                <span className="absolute top-1/4 right-2 text-[10px] text-text-secondary bg-[#192633] px-1">Ops</span>
                                <span className="absolute top-1/4 left-2 text-[10px] text-text-secondary bg-[#192633] px-1">Risk</span>
                            </div>
                            <div className="mt-6 space-y-2">
                                <div className="flex justify-between text-xs text-text-secondary">
                                    <span>Strongest Domain</span>
                                    <span className="text-primary font-medium">Threat Hunting</span>
                                </div>
                                <div className="flex justify-between text-xs text-text-secondary">
                                    <span>Focus Area</span>
                                    <span className="text-orange-400 font-medium">Compliance</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-8 space-y-8">
                        <div className="bg-card-dark border border-[#233648] rounded-xl p-6 shadow-lg">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                    <span className="material-symbols-outlined text-yellow-500">military_tech</span>
                                    Achievements & Badges
                                </h3>
                                <a className="text-sm text-primary hover:text-accent transition-colors" href="#">View All</a>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="group relative bg-[#101922] border border-[#233648] rounded-lg p-4 flex flex-col items-center hover:border-primary/50 transition-all hover:-translate-y-1">
                                    <div className="absolute inset-0 bg-badge-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="size-16 mb-3 rounded-full bg-slate-800 flex items-center justify-center relative z-10 shadow-[0_0_15px_rgba(19,127,236,0.3)]">
                                        <span className="material-symbols-outlined text-4xl text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]">policy</span>
                                    </div>
                                    <h4 className="text-white font-semibold text-center z-10">Protocol Pro</h4>
                                    <p className="text-xs text-text-secondary text-center mt-1 z-10">Mastered TCP/IP analysis</p>
                                    <span className="mt-3 px-2 py-1 text-[10px] font-bold bg-[#192633] text-cyan-400 border border-cyan-900 rounded z-10">EARNED</span>
                                </div>
                                <div className="group relative bg-[#101922] border border-[#233648] rounded-lg p-4 flex flex-col items-center hover:border-primary/50 transition-all hover:-translate-y-1">
                                    <div className="absolute inset-0 bg-badge-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="size-16 mb-3 rounded-full bg-slate-800 flex items-center justify-center relative z-10 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                                        <span className="material-symbols-outlined text-4xl text-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]">bug_report</span>
                                    </div>
                                    <h4 className="text-white font-semibold text-center z-10">Threat Hunter I</h4>
                                    <p className="text-xs text-text-secondary text-center mt-1 z-10">Identified 50 vulnerabilities</p>
                                    <span className="mt-3 px-2 py-1 text-[10px] font-bold bg-[#192633] text-red-400 border border-red-900 rounded z-10">EARNED</span>
                                </div>
                                <div className="group relative bg-[#101922] border border-[#233648] rounded-lg p-4 flex flex-col items-center hover:border-primary/50 transition-all hover:-translate-y-1">
                                    <div className="absolute inset-0 bg-badge-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="size-16 mb-3 rounded-full bg-slate-800 flex items-center justify-center relative z-10 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                                        <span className="material-symbols-outlined text-4xl text-green-500 drop-shadow-[0_0_5px_rgba(34,197,94,0.8)]">medical_services</span>
                                    </div>
                                    <h4 className="text-white font-semibold text-center z-10">First Responder</h4>
                                    <p className="text-xs text-text-secondary text-center mt-1 z-10">Completed Incident Response</p>
                                    <span className="mt-3 px-2 py-1 text-[10px] font-bold bg-[#192633] text-green-400 border border-green-900 rounded z-10">EARNED</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-card-dark border border-[#233648] rounded-xl p-6 shadow-lg">
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-white">workspace_premium</span>
                                Certifications
                            </h3>
                            <div className="flex flex-col gap-4">
                                <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-[#101922] border border-primary/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="size-12 rounded bg-white flex items-center justify-center shrink-0">
                                            <span className="font-bold text-slate-900 text-xs text-center leading-tight">Sec<br />+</span>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold">CompTIA Security+ (SY0-701)</h4>
                                            <p className="text-sm text-text-secondary">Target Exam Date: Oct 15, 2024</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="text-right">
                                            <p className="text-xs text-text-secondary uppercase">Countdown</p>
                                            <p className="text-xl font-bold text-white font-mono">14d 08h</p>
                                        </div>
                                        <div className="h-8 w-[1px] bg-[#233648]"></div>
                                        <button className="px-3 py-1.5 bg-primary hover:bg-blue-600 text-white text-sm font-medium rounded transition-colors">
                                            Schedule
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-card-dark border border-[#233648] rounded-xl p-6 shadow-lg">
                            <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
                            <div className="space-y-4">
                                <div className="flex gap-4 items-start">
                                    <div className="mt-1 size-2 rounded-full bg-primary shrink-0"></div>
                                    <div>
                                        <p className="text-sm text-white">Completed module <span className="text-primary">"Social Engineering Tactics"</span></p>
                                        <p className="text-xs text-text-secondary">2 hours ago</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="mt-1 size-2 rounded-full bg-green-500 shrink-0"></div>
                                    <div>
                                        <p className="text-sm text-white">Earned badge <span className="text-green-400">"First Responder"</span></p>
                                        <p className="text-xs text-text-secondary">Yesterday</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
