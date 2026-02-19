// src/components/layout/AdminLayout.tsx
// Layout wrapper for admin pages — includes an admin-specific sidebar/header

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const C = '#137fec';

const NAV_ITEMS = [
    { label: 'Dashboard', icon: 'dashboard', path: '/admin' },
    { label: 'Users', icon: 'group', path: '/admin/users' },
    { label: 'Content', icon: 'description', path: '/admin/content' },
    { label: 'Analytics', icon: 'analytics', path: '/admin/analytics' },
];

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    return (
        <div
            style={{ minHeight: '100vh', background: '#0d1117', color: '#e6edf3', display: 'flex' }}
            className="font-sans"
        >
            {/* Sidebar */}
            <aside
                style={{
                    width: '220px',
                    flexShrink: 0,
                    background: '#161b22',
                    borderRight: '1px solid #30363d',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '1.5rem 0.75rem',
                    gap: '0.5rem',
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                }}
            >
                {/* Logo */}
                <div style={{ padding: '0 0.75rem', marginBottom: '1.5rem' }}>
                    <p style={{ fontSize: '0.65rem', fontFamily: 'monospace', color: C, letterSpacing: '0.1em', marginBottom: '2px' }}>ADMIN CONSOLE</p>
                    <p style={{ fontSize: '0.95rem', fontWeight: 800, color: '#e6edf3' }}>CyberGuard</p>
                </div>

                {NAV_ITEMS.map(({ label, icon, path }) => {
                    const isActive = pathname === path || (path !== '/admin' && pathname.startsWith(path));
                    return (
                        <button
                            key={path}
                            onClick={() => navigate(path)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.625rem',
                                padding: '0.625rem 0.75rem',
                                borderRadius: '0.5rem',
                                background: isActive ? `${C}18` : 'transparent',
                                border: `1px solid ${isActive ? `${C}44` : 'transparent'}`,
                                color: isActive ? C : '#8b949e',
                                fontWeight: isActive ? 600 : 400,
                                fontSize: '0.875rem',
                                cursor: 'pointer',
                                transition: 'all 0.15s',
                                width: '100%',
                                textAlign: 'left',
                            }}
                            onMouseEnter={e => {
                                if (!isActive) {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                                    e.currentTarget.style.color = '#e6edf3';
                                }
                            }}
                            onMouseLeave={e => {
                                if (!isActive) {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.color = '#8b949e';
                                }
                            }}
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>{icon}</span>
                            {label}
                        </button>
                    );
                })}

                <div style={{ flex: 1 }} />

                {/* Back to app */}
                <button
                    onClick={() => navigate('/dashboard')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.625rem 0.75rem',
                        borderRadius: '0.5rem',
                        background: 'rgba(239,68,68,0.06)',
                        border: '1px solid rgba(239,68,68,0.2)',
                        color: '#ef4444',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        width: '100%',
                        transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.12)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.06)')}
                >
                    <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>exit_to_app</span>
                    Exit Admin
                </button>
            </aside>

            {/* Main content */}
            <main style={{ flex: 1, padding: '2rem 2.5rem', overflowY: 'auto' }}>
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
