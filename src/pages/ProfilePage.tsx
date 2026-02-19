// ─────────────────────────────────────────────
//  Profile Page — displays user stats and info
// ─────────────────────────────────────────────

import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import { user, domains } from '../data/appData';

const ProfilePage: React.FC = () => {
    const overallProgress = Math.round(
        domains.reduce((acc, d) => acc + d.progress, 0) / domains.length
    );

    return (
        <AppLayout>
            {/* Banner */}
            <div
                className="relative overflow-hidden rounded-2xl p-6 md:p-8 mb-8 border border-solid"
                style={{
                    background: 'linear-gradient(135deg, #0d2137 0%, #0d1117 60%)',
                    borderColor: '#1e3a52',
                }}
            >
                <div
                    className="absolute right-0 top-0 h-full w-1/2 pointer-events-none"
                    style={{
                        background:
                            'radial-gradient(ellipse at right, rgba(13,166,242,0.12) 0%, transparent 70%)',
                    }}
                />
                <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
                    {/* Avatar */}
                    <div
                        className="w-24 h-24 rounded-full flex items-center justify-center border-4 shrink-0"
                        style={{
                            background: '#1c2128',
                            borderColor: '#0da6f2',
                            boxShadow: '0 0 24px rgba(13,166,242,0.3)',
                        }}
                    >
                        <span
                            className="material-symbols-outlined"
                            style={{ fontSize: 48, color: '#0da6f2' }}
                        >
                            person
                        </span>
                    </div>

                    {/* Info */}
                    <div className="text-center sm:text-left">
                        <div
                            className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1 rounded-full mb-2"
                            style={{
                                background: 'rgba(13,166,242,0.15)',
                                color: '#0da6f2',
                                border: '1px solid rgba(13,166,242,0.3)',
                            }}
                        >
                            <span className="material-symbols-outlined text-sm">verified</span>
                            PRO MEMBER
                        </div>
                        <h1 className="text-3xl font-extrabold mb-1" style={{ color: '#e6edf3' }}>
                            {user.name}
                        </h1>
                        <p className="text-sm" style={{ color: '#8b949e' }}>
                            {user.rank} · Level {user.level} · Joined Jan 2023
                        </p>
                    </div>
                </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'Total XP', value: user.xp.toLocaleString(), icon: 'star', color: '#f0b429' },
                    { label: 'Study Hours', value: `${user.studyHours}h`, icon: 'schedule', color: '#0da6f2' },
                    { label: 'Modules Done', value: `${user.modulesDone}/${user.modulesTotal}`, icon: 'check_circle', color: '#22c55e' },
                    { label: 'Study Streak', value: `${user.studyStreak} days`, icon: 'local_fire_department', color: '#f97316' },
                ].map((stat) => (
                    <div
                        key={stat.label}
                        className="rounded-2xl p-5 border border-solid"
                        style={{
                            background: 'linear-gradient(145deg, #1c2333 0%, #161b22 100%)',
                            borderColor: '#30363d',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                        }}
                    >
                        <span
                            className="material-symbols-outlined text-2xl mb-2 block"
                            style={{ color: stat.color }}
                        >
                            {stat.icon}
                        </span>
                        <div className="text-2xl font-extrabold" style={{ color: '#e6edf3' }}>
                            {stat.value}
                        </div>
                        <div className="text-xs mt-1" style={{ color: '#8b949e' }}>
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* Overall progress */}
            <div
                className="rounded-2xl p-6 border border-solid mb-8"
                style={{ background: '#161b22', borderColor: '#30363d' }}
            >
                <div className="flex justify-between items-center mb-3">
                    <h2 className="font-bold" style={{ color: '#e6edf3' }}>
                        Overall Security+ Progress
                    </h2>
                    <span className="font-mono font-bold" style={{ color: '#0da6f2' }}>
                        {overallProgress}%
                    </span>
                </div>
                <div className="h-3 rounded-full overflow-hidden" style={{ background: '#0d1117' }}>
                    <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                            width: `${overallProgress}%`,
                            background: 'linear-gradient(90deg, #0da6f2, #00d4ff)',
                            boxShadow: '0 0 8px rgba(13,166,242,0.6)',
                        }}
                    />
                </div>

                {/* Per-domain breakdown */}
                <div className="mt-5 space-y-3">
                    {domains.map((domain) => (
                        <div key={domain.id} className="flex items-center gap-3">
                            <span
                                className="material-symbols-outlined text-base w-5 shrink-0"
                                style={{ color: domain.accentFrom }}
                            >
                                {domain.icon}
                            </span>
                            <span className="text-xs w-48 truncate" style={{ color: '#8b949e' }}>
                                {domain.title}
                            </span>
                            <div
                                className="flex-1 h-1.5 rounded-full overflow-hidden"
                                style={{ background: '#0d1117' }}
                            >
                                <div
                                    className="h-full rounded-full"
                                    style={{
                                        width: `${domain.progress}%`,
                                        background: `linear-gradient(90deg, ${domain.accentFrom}, ${domain.accentTo})`,
                                    }}
                                />
                            </div>
                            <span
                                className="text-xs font-mono w-10 text-right shrink-0"
                                style={{ color: domain.accentFrom }}
                            >
                                {domain.progress}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Exam info */}
            <div
                className="rounded-2xl p-6 border border-solid text-center"
                style={{
                    background: 'linear-gradient(135deg, #0a1929 0%, #0d1117 100%)',
                    borderColor: '#1e3a52',
                }}
            >
                <p className="text-xs font-mono mb-2" style={{ color: '#0da6f2' }}>
                    UPCOMING EXAM
                </p>
                <p className="font-bold text-lg mb-1" style={{ color: '#e6edf3' }}>
                    CompTIA Security+ (SY0-701)
                </p>
                <p className="text-sm" style={{ color: '#8b949e' }}>
                    Target Date: Oct 15, 2024 ·{' '}
                    <span style={{ color: '#e6edf3' }}>
                        {user.examDaysLeft}d {user.examHoursLeft}h remaining
                    </span>
                </p>
            </div>
        </AppLayout>
    );
};

export default ProfilePage;
