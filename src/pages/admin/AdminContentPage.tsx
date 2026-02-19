// src/pages/admin/AdminContentPage.tsx
// Content management — sections, topics, lessons

import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { useNavigate } from 'react-router-dom';

const C = '#22c55e';

const CONTENT_ITEMS = [
    { id: 'c1', type: 'Lesson', title: 'Security Control Types', section: '1.1', status: 'published', updatedAt: '2026-02-12' },
    { id: 'c2', type: 'Lesson', title: 'CIA Triad Deep Dive', section: '1.2', status: 'draft', updatedAt: '2026-02-15' },
    { id: 'c3', type: 'Quiz', title: 'Section 1 Practice Quiz', section: '1', status: 'published', updatedAt: '2026-01-20' },
    { id: 'c4', type: 'Flashcard', title: 'Cryptography Deck', section: '1.4', status: 'published', updatedAt: '2026-02-01' },
    { id: 'c5', type: 'Lesson', title: 'Threat Intelligence Overview', section: '2.1', status: 'published', updatedAt: '2026-02-10' },
    { id: 'c6', type: 'Simulation', title: 'SQL Injection Lab', section: '2.3', status: 'published', updatedAt: '2026-02-18' },
];

const TYPE_COLORS: Record<string, string> = { Lesson: '#0da6f2', Quiz: '#a855f7', Flashcard: '#f59e0b', Simulation: '#ef4444' };

export default function AdminContentPage() {
    const navigate = useNavigate();
    return (
        <AdminLayout>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div>
                    <p className="text-xs font-mono" style={{ color: C }}>ADMIN / CONTENT</p>
                    <h1 className="text-xl font-bold" style={{ color: '#e6edf3' }}>Content Manager</h1>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all" style={{ background: C, color: '#0d1117' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#16a34a')}
                    onMouseLeave={e => (e.currentTarget.style.background = C)}
                >
                    <span className="material-symbols-outlined text-base">add</span>
                    New Content
                </button>
            </div>

            <div className="rounded-xl border border-solid overflow-hidden" style={{ background: '#161b22', borderColor: '#30363d' }}>
                <table className="w-full">
                    <thead>
                        <tr style={{ borderBottom: '1px solid #30363d', background: 'rgba(255,255,255,0.02)' }}>
                            {['Type', 'Title', 'Section', 'Status', 'Updated', 'Actions'].map(h => (
                                <th key={h} className="px-4 py-3 text-xs font-bold uppercase text-left" style={{ color: '#64748b' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {CONTENT_ITEMS.map((item, i) => (
                            <tr key={item.id} style={{ borderBottom: i < CONTENT_ITEMS.length - 1 ? '1px solid #21262d' : 'none' }}
                                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                            >
                                <td className="px-4 py-3">
                                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${TYPE_COLORS[item.type]}18`, color: TYPE_COLORS[item.type] }}>
                                        {item.type}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <span className="text-sm font-medium" style={{ color: '#e6edf3' }}>{item.title}</span>
                                </td>
                                <td className="px-4 py-3">
                                    <span className="text-sm font-mono" style={{ color: '#8b949e' }}>{item.section}</span>
                                </td>
                                <td className="px-4 py-3">
                                    <span className="text-xs px-2 py-0.5 rounded-full" style={{
                                        background: item.status === 'published' ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)',
                                        color: item.status === 'published' ? '#22c55e' : '#f59e0b',
                                    }}>{item.status}</span>
                                </td>
                                <td className="px-4 py-3">
                                    <span className="text-sm" style={{ color: '#8b949e' }}>{item.updatedAt}</span>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex gap-2">
                                        <button className="text-xs px-2 py-1 rounded transition-all" style={{ color: '#0da6f2' }}
                                            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(13,166,242,0.1)')}
                                            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                                        >Edit</button>
                                        <button className="text-xs px-2 py-1 rounded transition-all" style={{ color: '#8b949e' }}
                                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#e6edf3'; }}
                                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8b949e'; }}
                                        >Preview</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
