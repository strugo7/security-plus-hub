import React, { useState } from 'react';

const domains = [
    {
        id: 1,
        accentFrom: '#3b82f6',
        accentTo: '#60a5fa',
        icon: 'warning',
        iconColor: 'text-blue-400',
        title: 'Threats, Attacks & Vulnerabilities',
        subtitle: 'Domain 1 · 24%',
        modules: 12,
        done: 7,
        progress: 58,
    },
    {
        id: 2,
        accentFrom: '#a855f7',
        accentTo: '#c084fc',
        icon: 'account_tree',
        iconColor: 'text-purple-400',
        title: 'Architecture & Design',
        subtitle: 'Domain 2 · 21%',
        modules: 10,
        done: 3,
        progress: 30,
    },
    {
        id: 3,
        accentFrom: '#06b6d4',
        accentTo: '#22d3ee',
        icon: 'settings',
        iconColor: 'text-cyan-400',
        title: 'Implementation',
        subtitle: 'Domain 3 · 25%',
        modules: 14,
        done: 9,
        progress: 64,
    },
    {
        id: 4,
        accentFrom: '#22c55e',
        accentTo: '#4ade80',
        icon: 'manage_search',
        iconColor: 'text-green-400',
        title: 'Operations & Incident Response',
        subtitle: 'Domain 4 · 16%',
        modules: 9,
        done: 2,
        progress: 22,
    },
    {
        id: 5,
        accentFrom: '#f97316',
        accentTo: '#fb923c',
        icon: 'gavel',
        iconColor: 'text-orange-400',
        title: 'Governance, Risk & Compliance',
        subtitle: 'Domain 5 · 14%',
        modules: 8,
        done: 5,
        progress: 62,
    },
];

const recentTopics = [
    { icon: 'phishing', title: 'Social Engineering Tactics', time: '2h ago', tag: 'IN PROGRESS' },
    { icon: 'lock', title: 'PKI & Certificate Management', time: 'Yesterday', tag: 'COMPLETED' },
    { icon: 'bug_report', title: 'Malware Analysis Basics', time: '3 days ago', tag: 'COMPLETED' },
];

const Dashboard: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const overallProgress = Math.round(
        domains.reduce((acc, d) => acc + d.progress, 0) / domains.length
    );

    return (
        <div
            className="min-h-screen flex flex-col"
            style={{ background: '#0d1117', color: '#e6edf3' }}
            dir="ltr"
        >
            {/* ── HEADER ── */}
            <header
                className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 border-b border-solid"
                style={{
                    background: 'rgba(13,17,23,0.95)',
                    backdropFilter: 'blur(12px)',
                    borderColor: '#30363d',
                }}
            >
                <div className="flex items-center gap-3">
                    <div
                        className="flex items-center justify-center w-9 h-9 rounded-lg"
                        style={{ background: 'rgba(13,166,242,0.15)' }}
                    >
                        <span className="material-symbols-outlined text-2xl" style={{ color: '#0da6f2' }}>
                            security
                        </span>
                    </div>
                    <span className="text-lg font-bold tracking-tight hidden sm:block" style={{ color: '#e6edf3' }}>
                        CyberGuard <span style={{ color: '#0da6f2', fontWeight: 400 }}>Academy</span>
                    </span>
                </div>

                <div className="flex-1 max-w-lg mx-4 hidden md:block">
                    <div className="relative">
                        <span
                            className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-xl"
                            style={{ color: '#8b949e' }}
                        >
                            search
                        </span>
                        <input
                            type="text"
                            placeholder="Search topics, domains, or keywords..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none border border-solid"
                            style={{ background: '#161b22', borderColor: '#30363d', color: '#e6edf3' }}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-2 text-sm" style={{ color: '#8b949e' }}>
                        <span className="material-symbols-outlined text-sm" style={{ color: '#f0b429' }}>star</span>
                        <span style={{ color: '#e6edf3', fontWeight: 600 }}>7,850 XP</span>
                    </div>
                    <div
                        className="w-9 h-9 rounded-full flex items-center justify-center border-2 cursor-pointer"
                        style={{ background: '#1c2128', borderColor: '#0da6f2' }}
                    >
                        <span className="material-symbols-outlined text-xl" style={{ color: '#0da6f2' }}>person</span>
                    </div>
                </div>
            </header>

            {/* ── MAIN ── */}
            <main className="flex-1 w-full max-w-screen-xl mx-auto px-6 md:px-10 py-8">

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
                        style={{ background: 'radial-gradient(ellipse at right, rgba(13,166,242,0.12) 0%, transparent 70%)' }}
                    />
                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div>
                            <p className="text-sm font-mono mb-1" style={{ color: '#0da6f2' }}>
                                &gt; WELCOME BACK, ALEX
                            </p>
                            <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#e6edf3' }}>
                                Ready to continue your Security+ journey?
                            </h1>
                            <p className="text-sm" style={{ color: '#8b949e' }}>
                                Pick up where you left off. Your exam is in{' '}
                                <span style={{ color: '#e6edf3', fontWeight: 600 }}>14 days</span>.
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

                    <div className="relative z-10 mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: 'Modules Done', value: '26/53', icon: 'check_circle' },
                            { label: 'Study Hours', value: '85h', icon: 'schedule' },
                            { label: 'Exam Readiness', value: `${overallProgress}%`, icon: 'speed' },
                            { label: 'Study Streak', value: '6 days', icon: 'local_fire_department' },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="flex items-center gap-3 rounded-xl p-3 border border-solid"
                                style={{ background: 'rgba(255,255,255,0.03)', borderColor: '#30363d' }}
                            >
                                <span className="material-symbols-outlined text-2xl" style={{ color: '#0da6f2' }}>
                                    {stat.icon}
                                </span>
                                <div>
                                    <div className="text-lg font-bold leading-none" style={{ color: '#e6edf3' }}>
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
                        <span className="text-sm font-semibold" style={{ color: '#e6edf3' }}>Overall Progress</span>
                        <span className="text-sm font-mono" style={{ color: '#0da6f2' }}>{overallProgress}%</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: '#161b22' }}>
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

                    {/* ── Domain cards (2/3 width) ── */}
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
                                    {/* Coloured top accent bar */}
                                    <div
                                        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
                                        style={{ background: `linear-gradient(90deg, ${domain.accentFrom}, ${domain.accentTo})` }}
                                    />

                                    <div className="p-5 pt-6">
                                        {/* Icon + % */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div
                                                className="w-11 h-11 rounded-xl flex items-center justify-center"
                                                style={{
                                                    background: `linear-gradient(135deg, ${domain.accentFrom}22, ${domain.accentTo}11)`,
                                                    border: `1px solid ${domain.accentFrom}44`,
                                                    boxShadow: `0 2px 8px ${domain.accentFrom}33`,
                                                }}
                                            >
                                                <span className={`material-symbols-outlined text-2xl ${domain.iconColor}`}>
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
                                                <p className="text-[10px] mt-0.5" style={{ color: '#8b949e' }}>complete</p>
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h3 className="font-bold text-sm mb-0.5 leading-snug" style={{ color: '#e6edf3' }}>
                                            {domain.title}
                                        </h3>
                                        <p className="text-xs mb-3" style={{ color: '#8b949e' }}>
                                            {domain.subtitle} · {domain.done}/{domain.modules} modules
                                        </p>

                                        {/* Progress bar */}
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

                    {/* ── Sidebar (1/3 width) ── */}
                    <div className="space-y-6">

                        {/* Exam countdown */}
                        <div
                            className="rounded-xl p-5 border border-solid text-center"
                            style={{
                                background: 'linear-gradient(135deg, #0a1929 0%, #0d1117 100%)',
                                borderColor: '#1e3a52',
                            }}
                        >
                            <p className="text-xs font-mono mb-2" style={{ color: '#0da6f2' }}>EXAM COUNTDOWN</p>
                            <div className="text-4xl font-bold font-mono mb-1" style={{ color: '#e6edf3' }}>14d 08h</div>
                            <p className="text-xs" style={{ color: '#8b949e' }}>CompTIA Security+ (SY0-701)</p>
                            <button
                                className="mt-4 w-full py-2 rounded-lg text-sm font-semibold transition-colors border border-solid"
                                style={{ background: 'rgba(13,166,242,0.1)', borderColor: '#0da6f2', color: '#0da6f2' }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(13,166,242,0.2)')}
                                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(13,166,242,0.1)')}
                            >
                                Take Practice Exam
                            </button>
                        </div>

                        {/* Recent activity */}
                        <div
                            className="rounded-xl p-5 border border-solid"
                            style={{ background: '#161b22', borderColor: '#30363d' }}
                        >
                            <h3 className="text-sm font-bold mb-4" style={{ color: '#e6edf3' }}>Recent Activity</h3>
                            <div className="space-y-4">
                                {recentTopics.map((topic, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div
                                            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                            style={{ background: 'rgba(13,166,242,0.1)' }}
                                        >
                                            <span className="material-symbols-outlined text-base" style={{ color: '#0da6f2' }}>
                                                {topic.icon}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-medium leading-tight truncate" style={{ color: '#e6edf3' }}>
                                                {topic.title}
                                            </p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-[10px]" style={{ color: '#8b949e' }}>{topic.time}</span>
                                                <span
                                                    className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                                                    style={{
                                                        background: topic.tag === 'IN PROGRESS' ? 'rgba(13,166,242,0.15)' : 'rgba(34,197,94,0.15)',
                                                        color: topic.tag === 'IN PROGRESS' ? '#0da6f2' : '#22c55e',
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
                            <h3 className="text-sm font-bold mb-4" style={{ color: '#e6edf3' }}>Quick Links</h3>
                            <div className="space-y-2">
                                {[
                                    { icon: 'quiz', label: 'Practice Quiz', color: '#a855f7' },
                                    { icon: 'style', label: 'Flashcards', color: '#f97316' },
                                    { icon: 'menu_book', label: 'Glossary', color: '#22c55e' },
                                    { icon: 'emoji_events', label: 'Leaderboard', color: '#f0b429' },
                                ].map((link) => (
                                    <button
                                        key={link.label}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors"
                                        style={{ color: '#8b949e' }}
                                        onMouseEnter={(e) => {
                                            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)';
                                            (e.currentTarget as HTMLButtonElement).style.color = '#e6edf3';
                                        }}
                                        onMouseLeave={(e) => {
                                            (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                                            (e.currentTarget as HTMLButtonElement).style.color = '#8b949e';
                                        }}
                                    >
                                        <span className="material-symbols-outlined text-lg" style={{ color: link.color }}>
                                            {link.icon}
                                        </span>
                                        <span className="text-sm font-medium">{link.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
