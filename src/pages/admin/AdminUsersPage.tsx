// src/pages/admin/AdminUsersPage.tsx
// User management for admins

import React, { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';

const C = '#137fec';

const USERS = [
    { id: 'u1', name: 'Alice Kim', email: 'alice@example.com', role: 'student', progress: 64, joined: '2025-01-15', status: 'active' },
    { id: 'u2', name: 'Bob Mitchell', email: 'bob@example.com', role: 'student', progress: 42, joined: '2025-02-01', status: 'active' },
    { id: 'u3', name: 'Carol Nguyen', email: 'carol@example.com', role: 'student', progress: 89, joined: '2024-12-10', status: 'active' },
    { id: 'u4', name: 'Dan Park', email: 'dan@example.com', role: 'student', progress: 12, joined: '2025-03-01', status: 'inactive' },
    { id: 'u5', name: 'Eve Santos', email: 'eve@example.com', role: 'admin', progress: 100, joined: '2024-11-01', status: 'active' },
];

export default function AdminUsersPage() {
    const [query, setQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState<string>('all');

    const filtered = USERS.filter(u => {
        const matchQ = !query || u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase());
        const matchR = roleFilter === 'all' || u.role === roleFilter;
        return matchQ && matchR;
    });

    return (
        <AdminLayout>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div>
                    <p className="text-xs font-mono" style={{ color: C }}>ADMIN / USERS</p>
                    <h1 className="text-xl font-bold" style={{ color: '#e6edf3' }}>User Management</h1>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-base" style={{ color: '#8b949e' }}>search</span>
                        <input className="rounded-lg text-sm py-2 pl-8 pr-3 outline-none w-48" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid #30363d', color: '#e6edf3' }}
                            placeholder="Search users..."
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                        />
                    </div>
                    <select
                        value={roleFilter}
                        onChange={e => setRoleFilter(e.target.value)}
                        className="rounded-lg text-sm py-2 px-3 outline-none"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid #30363d', color: '#e6edf3' }}
                    >
                        <option value="all">All Roles</option>
                        <option value="student">Student</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
            </div>

            <div className="rounded-xl border border-solid overflow-hidden" style={{ background: '#161b22', borderColor: '#30363d' }}>
                <table className="w-full">
                    <thead>
                        <tr style={{ borderBottom: '1px solid #30363d', background: 'rgba(255,255,255,0.02)' }}>
                            {['User', 'Role', 'Progress', 'Joined', 'Status', 'Actions'].map(h => (
                                <th key={h} className="px-4 py-3 text-xs font-bold uppercase text-left" style={{ color: '#64748b' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((user, i) => (
                            <tr key={user.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #21262d' : 'none' }}
                                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                            >
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: `${C}22`, color: C }}>{user.name[0]}</div>
                                        <div>
                                            <p className="text-sm font-medium" style={{ color: '#e6edf3' }}>{user.name}</p>
                                            <p className="text-[11px]" style={{ color: '#8b949e' }}>{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <span className="text-xs px-2 py-0.5 rounded-full border" style={{ background: user.role === 'admin' ? '#f9731618' : `${C}18`, borderColor: user.role === 'admin' ? '#f97316' : C, color: user.role === 'admin' ? '#f97316' : C }}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background: '#30363d' }}>
                                            <div className="h-full rounded-full" style={{ width: `${user.progress}%`, background: user.progress >= 70 ? '#22c55e' : user.progress >= 40 ? '#f59e0b' : '#ef4444' }} />
                                        </div>
                                        <span className="text-xs" style={{ color: '#8b949e' }}>{user.progress}%</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <span className="text-sm" style={{ color: '#8b949e' }}>{user.joined}</span>
                                </td>
                                <td className="px-4 py-3">
                                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: user.status === 'active' ? 'rgba(34,197,94,0.1)' : 'rgba(107,114,128,0.1)', color: user.status === 'active' ? '#22c55e' : '#6b7280' }}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <button className="text-xs px-2 py-1 rounded transition-all" style={{ color: '#8b949e' }}
                                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#e6edf3'; }}
                                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8b949e'; }}
                                        >Edit</button>
                                        <button className="text-xs px-2 py-1 rounded transition-all" style={{ color: '#ef4444' }}
                                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; }}
                                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                                        >Remove</button>
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
