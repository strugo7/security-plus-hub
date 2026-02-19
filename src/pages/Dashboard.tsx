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
    const overallProgress = Math.round(
        domains.reduce((acc, d) => acc + d.progress, 0) / domains.length
    );

    return (
        <AppLayout>
            {/* Welcome banner */}
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
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <p className="text-sm font-mono mb-1" style={{ color: '#0da6f2' }}>
                            &gt; WELCOME BACK, {user.name.toUpperCase()}
                        </p>
                        <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#e6edf3' }}>
                            Ready to continue your Security+ journey?
                        </h1>
                        <p className="text-sm" style={{ color: '#8b949e' }}>
                            Pick up where you left off. Your exam is in{' '}
                            <span style={{ color: '#e6edf3', fontWeight: 600 }}>
                                {user.examDaysLeft} days
                            </span>
                            .
                        </p>
                    </div>
                    <button
                        className="shrink-0 px-6 py-3 rounded-lg font-semibold text-sm transition-all flex items-center gap-2"
                        style={{ background: '#0da6f2', color: '#0d1117' }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = '#0b8acb')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = '#0da6f2')}
                    >
                        <span className="material-symbols-outlined text-lg">play_arrow</span>
                        Resume Learning
                    </button>
                </div>

                {/* Quick stat chips */}
                <div className="relative z-10 mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Modules Done', value: `${user.modulesDone}/${user.modulesTotal}`, icon: 'check_circle' },
                        { label: 'Study Hours', value: `${user.studyHours}h`, icon: 'schedule' },
                        { label: 'Exam Readiness', value: `${overallProgress}%`, icon: 'speed' },
                        { label: 'Study Streak', value: `${user.studyStreak} days`, icon: 'local_fire_department' },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="flex items-center gap-3 rounded-xl p-3 border border-solid"
                            style={{ background: 'rgba(255,255,255,0.03)', borderColor: '#30363d' }}
                        >
                            <span
                                className="material-symbols-outlined text-2xl"
                                style={{ color: '#0da6f2' }}
                            >
                                {stat.icon}
                            </span>
                            <div>
                                <div
                                    className="text-lg font-bold leading-none"
                                    style={{ color: '#e6edf3' }}
                                >
                                    {stat.value}
                                </div>
                                <div className="text-xs mt-0.5" style={{ color: '#8b949e' }}>
                                    {stat.label}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Overall progress bar */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold" style={{ color: '#e6edf3' }}>
                        Overall Progress
                    </span>
                    <span className="text-sm font-mono" style={{ color: '#0da6f2' }}>
                        {overallProgress}%
                    </span>
                </div>
                <div
                    className="h-2 rounded-full overflow-hidden"
                    style={{ background: '#161b22' }}
                >
                    <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                            width: `${overallProgress}%`,
                            background: 'linear-gradient(90deg, #0da6f2, #00d4ff)',
                            boxShadow: '0 0 8px rgba(13,166,242,0.6)',
                        }}
                    />
                </div>
            </div>

            {/* Two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* ── Domain cards ── */}
                <div className="lg:col-span-2">
                    <h2 className="text-lg font-bold mb-4" style={{ color: '#e6edf3' }}>
                        📚 Security+ Domains
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {domains.map((domain) => (
                            <div
                                key={domain.id}
                                className="group relative rounded-2xl cursor-pointer transition-all duration-300"
                                style={{
                                    background: 'linear-gradient(145deg, #1c2333 0%, #161b22 100%)',
                                    border: '1px solid #30363d',
                                    boxShadow:
                                        '0 4px 6px rgba(0,0,0,0.4), 0 1px 3px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
                                }}
                                onClick={() => navigate(`/sections/${domain.id}`)}
                                onMouseEnter={(e) => {
                                    const el = e.currentTarget as HTMLDivElement;
                                    el.style.borderColor = domain.accentFrom;
                                    el.style.boxShadow = `0 12px 28px rgba(0,0,0,0.5), 0 4px 8px rgba(0,0,0,0.4), 0 0 0 1px ${domain.accentFrom}44, 0 0 24px ${domain.accentFrom}22, inset 0 1px 0 rgba(255,255,255,0.08)`;
                                    el.style.transform = 'translateY(-4px)';
                                }}
                                onMouseLeave={(e) => {
                                    const el = e.currentTarget as HTMLDivElement;
                                    el.style.borderColor = '#30363d';
                                    el.style.boxShadow =
                                        '0 4px 6px rgba(0,0,0,0.4), 0 1px 3px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)';
                                    el.style.transform = 'translateY(0)';
                                }}
                            >
                                {/* Coloured top accent */}
                                <div
                                    className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
                                    style={{
                                        background: `linear-gradient(90deg, ${domain.accentFrom}, ${domain.accentTo})`,
                                    }}
                                />

                                <div className="p-5 pt-6">
                                    {/* Icon + % badge */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div
                                            className="w-11 h-11 rounded-xl flex items-center justify-center"
                                            style={{
                                                background: `linear-gradient(135deg, ${domain.accentFrom}22, ${domain.accentTo}11)`,
                                                border: `1px solid ${domain.accentFrom}44`,
                                                boxShadow: `0 2px 8px ${domain.accentFrom}33`,
                                            }}
                                        >
                                            <span
                                                className={`material-symbols-outlined text-2xl ${domain.iconColor}`}
                                            >
                                                {domain.icon}
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <span
                                                className="text-2xl font-extrabold font-mono leading-none"
                                                style={{
                                                    color: domain.accentFrom,
                                                    textShadow: `0 0 12px ${domain.accentFrom}66`,
                                                }}
                                            >
                                                {domain.progress}%
                                            </span>
                                            <p
                                                className="text-[10px] mt-0.5"
                                                style={{ color: '#8b949e' }}
                                            >
                                                complete
                                            </p>
                                        </div>
                                    </div>

                                    <h3
                                        className="font-bold text-sm mb-0.5 leading-snug"
                                        style={{ color: '#e6edf3' }}
                                    >
                                        {domain.title}
                                    </h3>
                                    <p className="text-xs mb-3" style={{ color: '#8b949e' }}>
                                        {domain.subtitle} · {domain.done}/{domain.modules} modules
                                    </p>

                                    <div
                                        className="h-2 rounded-full overflow-hidden"
                                        style={{ background: 'rgba(255,255,255,0.06)' }}
                                    >
                                        <div
                                            className="h-full rounded-full transition-all duration-700"
                                            style={{
                                                width: `${domain.progress}%`,
                                                background: `linear-gradient(90deg, ${domain.accentFrom}, ${domain.accentTo})`,
                                                boxShadow: `0 0 6px ${domain.accentFrom}88`,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Sidebar ── */}
                <div className="space-y-6">

                    {/* Exam countdown */}
                    <div
                        className="rounded-xl p-5 border border-solid text-center"
                        style={{
                            background: 'linear-gradient(135deg, #0a1929 0%, #0d1117 100%)',
                            borderColor: '#1e3a52',
                        }}
                    >
                        <p className="text-xs font-mono mb-2" style={{ color: '#0da6f2' }}>
                            EXAM COUNTDOWN
                        </p>
                        <div
                            className="text-4xl font-bold font-mono mb-1"
                            style={{ color: '#e6edf3' }}
                        >
                            {user.examDaysLeft}d {String(user.examHoursLeft).padStart(2, '0')}h
                        </div>
                        <p className="text-xs" style={{ color: '#8b949e' }}>
                            CompTIA Security+ (SY0-701)
                        </p>
                        <button
                            className="mt-4 w-full py-2 rounded-lg text-sm font-semibold transition-colors border border-solid"
                            style={{
                                background: 'rgba(13,166,242,0.1)',
                                borderColor: '#0da6f2',
                                color: '#0da6f2',
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.background = 'rgba(13,166,242,0.2)')
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.background = 'rgba(13,166,242,0.1)')
                            }
                        >
                            Take Practice Exam
                        </button>
                    </div>

                    {/* Recent activity */}
                    <div
                        className="rounded-xl p-5 border border-solid"
                        style={{ background: '#161b22', borderColor: '#30363d' }}
                    >
                        <h3 className="text-sm font-bold mb-4" style={{ color: '#e6edf3' }}>
                            Recent Activity
                        </h3>
                        <div className="space-y-4">
                            {recentTopics.map((topic, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div
                                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                        style={{ background: 'rgba(13,166,242,0.1)' }}
                                    >
                                        <span
                                            className="material-symbols-outlined text-base"
                                            style={{ color: '#0da6f2' }}
                                        >
                                            {topic.icon}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p
                                            className="text-xs font-medium leading-tight truncate"
                                            style={{ color: '#e6edf3' }}
                                        >
                                            {topic.title}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px]" style={{ color: '#8b949e' }}>
                                                {topic.time}
                                            </span>
                                            <span
                                                className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                                                style={{
                                                    background:
                                                        topic.tag === 'IN PROGRESS'
                                                            ? 'rgba(13,166,242,0.15)'
                                                            : 'rgba(34,197,94,0.15)',
                                                    color:
                                                        topic.tag === 'IN PROGRESS' ? '#0da6f2' : '#22c55e',
                                                }}
                                            >
                                                {topic.tag}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick links */}
                    <div
                        className="rounded-xl p-5 border border-solid"
                        style={{ background: '#161b22', borderColor: '#30363d' }}
                    >
                        <h3 className="text-sm font-bold mb-4" style={{ color: '#e6edf3' }}>
                            Quick Links
                        </h3>
                        <div className="space-y-2">
                            {quickLinks.map((link) => (
                                <button
                                    key={link.label}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors"
                                    style={{ color: '#8b949e' }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLButtonElement).style.background =
                                            'rgba(255,255,255,0.05)';
                                        (e.currentTarget as HTMLButtonElement).style.color = '#e6edf3';
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLButtonElement).style.background =
                                            'transparent';
                                        (e.currentTarget as HTMLButtonElement).style.color = '#8b949e';
                                    }}
                                >
                                    <span
                                        className="material-symbols-outlined text-lg"
                                        style={{ color: link.color }}
                                    >
                                        {link.icon}
                                    </span>
                                    <span className="text-sm font-medium">{link.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Dashboard;
