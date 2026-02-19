// src/pages/admin/AdminDashboardPage.tsx
// Admin overview dashboard

import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { useNavigate } from 'react-router-dom';

const C = '#137fec';

const STATS = [
    { label: 'Total Users', value: '1,284', change: '+12%', icon: 'group', color: '#0da6f2' },
    { label: 'Active Today', value: '347', change: '+8%', icon: 'person_check', color: '#22c55e' },
    { label: 'Avg. Score', value: '73.4%', change: '+2.1%', icon: 'leaderboard', color: '#a855f7' },
    { label: 'Content Items', value: '842', change: '+5', icon: 'description', color: '#f97316' },
];

const RECENT = [
    { user: 'Alice K.', action: 'Completed Section 2', time: '2 min ago', color: '#22c55e' },
    { user: 'Bob M.', action: 'Passed Practice Exam (82%)', time: '14 min ago', color: '#0da6f2' },
    { user: 'Carol N.', action: 'Created 12 Flashcards', time: '45 min ago', color: '#a855f7' },
    { user: 'Dan P.', action: 'Ran SQL Injection Sim', time: '1 hour ago', color: '#f97316' },
    { user: 'Eve S.', action: 'Joined CyberGuard', time: '2 hours ago', color: '#ec4899' },
];

export default function AdminDashboardPage() {
    const navigate = useNavigate();
    return (
        <AdminLayout>
            <div className="mb-6">
                <p className="text-xs font-mono mb-1" style={{ color: C }}>CYBERGUARD // ADMIN CONSOLE</p>
                <h1 className="text-2xl font-bold" style={{ color: '#e6edf3' }}>Admin Dashboard</h1>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {STATS.map((stat) => (
                    <div key={stat.label} className="rounded-xl border border-solid p-4 transition-all" style={{ background: '#161b22', borderColor: '#30363d' }}>
                        <div className="flex items-center justify-between mb-2">
                            <span className="material-symbols-outlined text-xl" style={{ color: stat.color }}>{stat.icon}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e' }}>{stat.change}</span>
                        </div>
                        <div className="text-2xl font-bold font-mono" style={{ color: '#e6edf3' }}>{stat.value}</div>
                        <p className="text-xs mt-0.5" style={{ color: '#8b949e' }}>{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className="rounded-xl border border-solid p-5" style={{ background: '#161b22', borderColor: '#30363d' }}>
                    <h2 className="font-bold text-sm mb-4" style={{ color: '#e6edf3' }}>🕐 Recent Activity</h2>
                    <div className="space-y-3">
                        {RECENT.map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: `${item.color}22`, color: item.color }}>{item.user[0]}</div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate" style={{ color: '#e6edf3' }}>{item.user}</p>
                                    <p className="text-xs truncate" style={{ color: '#8b949e' }}>{item.action}</p>
                                </div>
                                <span className="text-[10px] shrink-0" style={{ color: '#64748b' }}>{item.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div className="rounded-xl border border-solid p-5" style={{ background: '#161b22', borderColor: '#30363d' }}>
                    <h2 className="font-bold text-sm mb-4" style={{ color: '#e6edf3' }}>⚡ Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { label: 'Manage Users', icon: 'manage_accounts', path: '/admin/users', color: '#0da6f2' },
                            { label: 'Edit Content', icon: 'edit_note', path: '/admin/content', color: '#22c55e' },
                            { label: 'View Analytics', icon: 'analytics', path: '/admin/analytics', color: '#a855f7' },
                            { label: 'Add Lesson', icon: 'add_circle', path: '/admin/content', color: '#f97316' },
                        ].map(({ label, icon, path, color }) => (
                            <button
                                key={label}
                                onClick={() => navigate(path)}
                                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-solid transition-all"
                                style={{ background: 'rgba(255,255,255,0.02)', borderColor: '#30363d' }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.background = `${color}0d`; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = '#30363d'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                            >
                                <span className="material-symbols-outlined text-2xl" style={{ color }}>{icon}</span>
                                <span className="text-xs font-medium" style={{ color: '#e6edf3' }}>{label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
