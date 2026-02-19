// src/pages/admin/AdminAnalyticsPage.tsx
// Analytics and insights for admins

import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';

const C = '#a855f7';

const DOMAIN_SCORES = [
    { domain: '1 — General Security', avg: 78, attempts: 1842 },
    { domain: '2 — Threats & Vulnerabilities', avg: 65, attempts: 2156 },
    { domain: '3 — Security Architecture', avg: 71, attempts: 1623 },
    { domain: '4 — Security Operations', avg: 74, attempts: 1987 },
    { domain: '5 — Program Management', avg: 69, attempts: 1342 },
];

export default function AdminAnalyticsPage() {
    return (
        <AdminLayout>
            <div className="mb-6">
                <p className="text-xs font-mono" style={{ color: C }}>ADMIN / ANALYTICS</p>
                <h1 className="text-xl font-bold" style={{ color: '#e6edf3' }}>Analytics & Insights</h1>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'Avg. Exam Score', value: '71.4%', icon: 'quiz', color: '#a855f7' },
                    { label: 'Total Study Hours', value: '12,834', icon: 'schedule', color: '#0da6f2' },
                    { label: 'Flashcards Reviewed', value: '48,291', icon: 'style', color: '#22c55e' },
                    { label: 'Simulations Run', value: '3,672', icon: 'bug_report', color: '#f97316' },
                ].map(({ label, value, icon, color }) => (
                    <div key={label} className="rounded-xl border border-solid p-4" style={{ background: '#161b22', borderColor: '#30363d' }}>
                        <span className="material-symbols-outlined text-xl" style={{ color }}>{icon}</span>
                        <div className="text-2xl font-bold font-mono mt-2" style={{ color: '#e6edf3' }}>{value}</div>
                        <p className="text-xs mt-0.5" style={{ color: '#8b949e' }}>{label}</p>
                    </div>
                ))}
            </div>

            {/* Domain Performance */}
            <div className="rounded-xl border border-solid p-5 mb-5" style={{ background: '#161b22', borderColor: '#30363d' }}>
                <h2 className="font-bold text-sm mb-5" style={{ color: '#e6edf3' }}>📊 Domain Performance (Average Score)</h2>
                <div className="space-y-4">
                    {DOMAIN_SCORES.map(({ domain, avg, attempts }) => {
                        const color = avg >= 75 ? '#22c55e' : avg >= 65 ? '#f59e0b' : '#ef4444';
                        return (
                            <div key={domain}>
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-sm" style={{ color: '#e6edf3' }}>{domain}</span>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[11px]" style={{ color: '#8b949e' }}>{attempts.toLocaleString()} attempts</span>
                                        <span className="text-sm font-bold font-mono w-12 text-right" style={{ color }}>{avg}%</span>
                                    </div>
                                </div>
                                <div className="h-2 rounded-full overflow-hidden" style={{ background: '#30363d' }}>
                                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${avg}%`, background: color }} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Most Missed Topics */}
            <div className="rounded-xl border border-solid p-5" style={{ background: '#161b22', borderColor: '#30363d' }}>
                <h2 className="font-bold text-sm mb-4" style={{ color: '#e6edf3' }}>🔴 Most Commonly Missed Topics</h2>
                <div className="space-y-2">
                    {[
                        { topic: '2.5 — Explaining vulnerability types', miss: '67%' },
                        { topic: '1.4 — Cryptographic solutions', miss: '58%' },
                        { topic: '3.1 — Security architecture models', miss: '52%' },
                        { topic: '4.6 — Incident response procedures', miss: '49%' },
                        { topic: '5.4 — Risk management processes', miss: '45%' },
                    ].map(({ topic, miss }) => (
                        <div key={topic} className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.12)' }}>
                            <span className="text-sm" style={{ color: '#e6edf3' }}>{topic}</span>
                            <span className="text-sm font-bold" style={{ color: '#ef4444' }}>{miss} miss rate</span>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
