// ──────────────────────────────────────────────────
//  Shared top navigation bar used by all app pages
//  (Dashboard, Profile, and future inner pages)
// ──────────────────────────────────────────────────

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../constants/routes';
import { user } from '../../data/appData';

interface AppHeaderProps {
    /** Optionally override the search placeholder text */
    searchPlaceholder?: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({
    searchPlaceholder = 'Search topics, domains, or keywords...',
}) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <header
            className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 border-b border-solid"
            style={{
                background: 'rgba(13,17,23,0.95)',
                backdropFilter: 'blur(12px)',
                borderColor: '#30363d',
            }}
        >
            {/* Logo */}
            <button
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => navigate(routes.DASHBOARD)}
                aria-label="Go to dashboard"
            >
                <div
                    className="flex items-center justify-center w-9 h-9 rounded-lg"
                    style={{ background: 'rgba(13,166,242,0.15)' }}
                >
                    <span className="material-symbols-outlined text-2xl" style={{ color: '#0da6f2' }}>
                        security
                    </span>
                </div>
                <span
                    className="text-lg font-bold tracking-tight hidden sm:block"
                    style={{ color: '#e6edf3' }}
                >
                    CyberGuard{' '}
                    <span style={{ color: '#0da6f2', fontWeight: 400 }}>Academy</span>
                </span>
            </button>

            {/* Search */}
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
                        placeholder={searchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none border border-solid"
                        style={{
                            background: '#161b22',
                            borderColor: '#30363d',
                            color: '#e6edf3',
                        }}
                    />
                </div>
            </div>

            {/* Right: XP + avatar */}
            <div className="flex items-center gap-4">
                <div
                    className="hidden sm:flex items-center gap-2 text-sm"
                    style={{ color: '#8b949e' }}
                >
                    <span className="material-symbols-outlined text-sm" style={{ color: '#f0b429' }}>
                        star
                    </span>
                    <span style={{ color: '#e6edf3', fontWeight: 600 }}>
                        {user.xp.toLocaleString()} XP
                    </span>
                </div>

                {/* Avatar → navigates to Profile */}
                <button
                    id="profile-avatar-btn"
                    onClick={() => navigate(routes.PROFILE)}
                    className="w-9 h-9 rounded-full flex items-center justify-center border-2 cursor-pointer transition-all"
                    style={{ background: '#1c2128', borderColor: '#0da6f2' }}
                    onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = '#00d4ff';
                        (e.currentTarget as HTMLButtonElement).style.boxShadow =
                            '0 0 12px rgba(13,166,242,0.5)';
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = '#0da6f2';
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
                    }}
                    aria-label="Go to profile"
                >
                    <span className="material-symbols-outlined text-xl" style={{ color: '#0da6f2' }}>
                        person
                    </span>
                </button>
            </div>
        </header>
    );
};

export default AppHeader;
