// ────────────────────────────────────────────────────
//  Dashboard / Learning Hub — main home after login
//  Uses AppLayout for consistent header + background
//  All data imported from src/data/appData.ts
// ────────────────────────────────────────────────────

import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import { domains, recentTopics, quickLinks, user } from '../data/appData';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    // Helper to get domain-specific styles based on ID or index
    const getDomainStyle = (index: number) => {
        const styles = [
            { icon: 'check_circle', color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20', hoverText: 'group-hover:text-green-400', barColor: 'bg-green-500', shadow: 'shadow-[0_0_8px_rgba(34,197,94,0.4)]', statusColor: 'text-green-400' },
            { icon: 'bug_report', color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20', hoverText: 'group-hover:text-primary', barColor: 'bg-primary', shadow: 'shadow-[0_0_8px_rgba(19,127,236,0.4)]', statusColor: 'text-primary' },
            { icon: 'architecture', color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20', hoverText: 'group-hover:text-primary', barColor: 'bg-orange-500', shadow: 'shadow-[0_0_8px_rgba(249,115,22,0.4)]', statusColor: 'text-orange-400' },
            { icon: 'terminal', color: 'text-slate-400', bg: 'bg-slate-700/30', border: 'border-slate-600/30', hoverText: 'group-hover:text-primary', barColor: 'bg-slate-600', shadow: '', statusColor: 'text-slate-500' },
            { icon: 'gavel', color: 'text-slate-400', bg: 'bg-slate-700/30', border: 'border-slate-600/30', hoverText: 'group-hover:text-primary', barColor: 'bg-slate-600', shadow: '', statusColor: 'text-slate-500' },
        ];
        return styles[index] || styles[4];
    };

    const overallProgress = Math.round(
        domains.reduce((acc, d) => acc + d.progress, 0) / domains.length
    );

    return (
        <AppLayout
            user={{
                name: user.name,
                role: 'Pro Member',
                avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCh6SWWdMXSWt8npEVj2lt6awoJ0UxB8XDrjI4twduwsbpCNUc1dn28m28GrKjhqYy-5Q0IsjE-9SsjET4g0lC91ibmEQlGGNV20wgJ5iHpJ8y7Uay53Ic60KRWCxbbJ8ydAhfoscf6za0yeCz0hVFI6qXO7AAui_-_PemXWLqItr_ikLz1aDYAbbm3kkDtPvtY9dlewoFJtObsShamDQmKmNhGUj8fbp9jveImorPYflZhjXkrhalGt3oRPlXb5Z3cXbqwrVL8n54'
            }}
        >
            {/* Main Content Area - matching HTML max-width and padding */}
            <div className="w-full max-w-[1440px] mx-auto">

                {/* Welcome & Resume Section */}
                <div className="mb-10 animate-[fadeIn_0.5s_ease-out]">
                    <h2 className="text-3xl font-bold mb-6 text-white text-left">Welcome back, {user.name.split(' ')[0]}</h2>

                    {/* Resume Card */}
                    <div className="relative overflow-hidden rounded-xl bg-card-dark border border-[#233648] shadow-lg group">
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-cyber-gradient opacity-50 pointer-events-none"></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-stretch">
                            {/* Thumbnail Area */}
                            <div className="w-full md:w-64 h-48 md:h-auto shrink-0 bg-[#233648] relative overflow-hidden">
                                <div className="absolute inset-0 bg-cover bg-center opacity-80 mix-blend-overlay" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCM9U3fh7-eO7aPfZ1Ip5pSgmD1bqQXOeKpzUMUGgAaBPSTqrSPWIiDKs5tKUgbcWpMjt_Di4YJZtODkaqggBI2ryXh7ChBgwjd29wju619zvYZGUMjF7XOfIfca8deg0b2hTP_JA_IPVFci2rPfoFpAQatliWXghvH7_yBFUJ27fYIR5WBOhys5vjn_S5AQ9UiyWqkfkYAajiKF4TJoLT_KEiKqmMZYIy5f4f8ILhkW13jEevWQdtC7GVcVrR7JS1MFOJMMCxQ4vk')" }}></div>
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                    <span className="material-symbols-outlined text-white text-5xl opacity-80">play_circle</span>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="p-6 md:p-8 flex-1 flex flex-col justify-center text-left">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-primary/20 text-primary border border-primary/20">In Progress</span>
                                    <span className="text-text-secondary text-xs uppercase tracking-wider font-semibold">Security Operations</span>
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">3.2 Configuring SIEM Tools</h3>
                                <p className="text-text-secondary mb-6 max-w-2xl">
                                    Continue your deep dive into log aggregation and correlation. You've completed the section on sensor placement and are ready for configuration best practices.
                                </p>

                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
                                    <div className="flex-1 w-full sm:max-w-xs flex items-center gap-3">
                                        <div className="w-full h-2 bg-[#233648] rounded-full overflow-hidden">
                                            <div className="h-full bg-primary rounded-full w-[75%] shadow-[0_0_10px_rgba(19,127,236,0.5)]"></div>
                                        </div>
                                        <span className="text-sm font-medium text-white whitespace-nowrap">75%</span>
                                    </div>
                                    <button className="w-full sm:w-auto px-6 py-2.5 bg-primary hover:bg-blue-600 text-white font-medium rounded-lg transition-all shadow-[0_4px_14px_0_rgba(19,127,236,0.39)] hover:shadow-[0_6px_20px_rgba(19,127,236,0.23)] hover:-translate-y-0.5 flex items-center justify-center gap-2">
                                        <span>Resume Lesson</span>
                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Exam Domains Grid */}
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">Exam Domains</h3>
                    <span className="text-text-secondary text-sm">Overall Progress: {overallProgress}%</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
                    {domains.map((domain, index) => {
                        const style = getDomainStyle(index);
                        const isStarted = domain.progress > 0;
                        const isCompleted = domain.progress === 100;

                        return (
                            <div
                                key={domain.id}
                                onClick={() => navigate(`/sections/${domain.id}`)}
                                className="group flex flex-col bg-card-dark border border-[#233648] hover:border-primary/50 rounded-xl p-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(19,127,236,0.15)] hover:-translate-y-1 relative overflow-hidden cursor-pointer text-left"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-50">
                                    <span className="text-6xl font-bold text-[#233648] select-none group-hover:text-primary/10 transition-colors">0{index + 1}</span>
                                </div>

                                <div className={`mb-4 size-12 rounded-lg ${style.bg} ${style.color} flex items-center justify-center border ${style.border}`}>
                                    <span className="material-symbols-outlined">{style.icon}</span>
                                </div>

                                <h4 className={`text-lg font-bold text-white mb-2 ${style.hoverText} transition-colors`}>{domain.title}</h4>
                                <p className="text-text-secondary text-sm mb-6 flex-1 z-10 relative">{domain.description}</p>

                                <div className="mt-auto z-10 relative">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className={`text-xs font-semibold ${style.statusColor}`}>
                                            {isCompleted ? 'Completed' : isStarted ? 'In Progress' : 'Not Started'}
                                        </span>
                                        <span className="text-xs text-text-secondary">{domain.progress}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-[#233648] rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${style.barColor} rounded-full transition-all duration-1000 ${style.shadow}`}
                                            style={{ width: `${domain.progress}%` }}
                                        ></div>
                                    </div>

                                    <button className={`mt-4 w-full py-2 rounded-lg border border-[#233648] hover:bg-[#233648] text-text-secondary hover:text-white text-sm font-medium transition-colors cursor-pointer`}>
                                        {isCompleted ? 'Review Domain' : isStarted ? 'Continue' : 'Start Domain'}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AppLayout>
    );
};

export default Dashboard;
