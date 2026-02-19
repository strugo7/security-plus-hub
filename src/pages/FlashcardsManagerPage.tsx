// src/pages/FlashcardsManagerPage.tsx
// Flashcard Manager — matches "Page 5 - Flashcards Manager" UX/UI design

import React, { useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface MockDeck {
    id: string;
    title: string;
    count: number;
    toReview: number;
    domain: string;
    domainColor: string;
}

const MOCK_DECKS: MockDeck[] = [
    { id: 'd1', title: 'Social Engineering', count: 24, toReview: 8, domain: 'Domain 2 – Threats', domainColor: '#f97316' },
    { id: 'd2', title: 'Malware Types', count: 18, toReview: 3, domain: 'Domain 2 – Threats', domainColor: '#f97316' },
    { id: 'd3', title: 'Attack Vectors', count: 32, toReview: 12, domain: 'Domain 2 – Threats', domainColor: '#f97316' },
    { id: 'd4', title: 'Cloud Security', count: 15, toReview: 0, domain: 'Domain 3 – Architecture', domainColor: '#22c55e' },
    { id: 'd5', title: 'Cryptography Basics', count: 42, toReview: 18, domain: 'Domain 3 – Architecture', domainColor: '#22c55e' },
    { id: 'd6', title: 'PKI & Certificates', count: 28, toReview: 7, domain: 'Domain 1 – Concepts', domainColor: '#0da6f2' },
    { id: 'd7', title: 'IAM & Access Control', count: 36, toReview: 4, domain: 'Domain 4 – Operations', domainColor: '#a855f7' },
    { id: 'd8', title: 'Incident Response', count: 20, toReview: 9, domain: 'Domain 4 – Operations', domainColor: '#a855f7' },
];

const C = '#137fec';

export default function FlashcardsManagerPage() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const { user } = useAuth();

    const totalCards = MOCK_DECKS.reduce((a, d) => a + d.count, 0);
    const totalReview = MOCK_DECKS.reduce((a, d) => a + d.toReview, 0);

    const filtered = MOCK_DECKS.filter(
        d => d.title.toLowerCase().includes(query.toLowerCase()) || d.domain.toLowerCase().includes(query.toLowerCase())
    );

    // Group by domain
    const grouped = filtered.reduce((acc, deck) => {
        if (!acc[deck.domain]) acc[deck.domain] = { color: deck.domainColor, decks: [] };
        acc[deck.domain].decks.push(deck);
        return acc;
    }, {} as Record<string, { color: string; decks: MockDeck[] }>);

    return (
        <AppLayout>
            {/* Header */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                    <div
                        className="flex items-center justify-center w-9 h-9 rounded-lg"
                        style={{ background: `${C}18`, color: C }}
                    >
                        <span className="material-symbols-outlined text-xl">style</span>
                    </div>
                    <h1 className="text-xl font-bold" style={{ color: '#e6edf3' }}>Flashcard Manager</h1>
                    <span className="text-xs px-2 py-0.5 rounded border" style={{ color: '#22c55e', background: 'rgba(34,197,94,0.1)', borderColor: 'rgba(34,197,94,0.2)' }}>
                        Editor Mode
                    </span>
                </div>

                <div className="flex items-center gap-4 text-sm" style={{ color: '#8b949e' }}>
                    <span><span className="w-2 h-2 rounded-full inline-block mr-1.5" style={{ background: C }} />Total: <strong style={{ color: '#e6edf3' }}>{totalCards}</strong></span>
                    <span className="w-px h-4 inline-block" style={{ background: '#30363d' }} />
                    <span><span className="w-2 h-2 rounded-full inline-block mr-1.5" style={{ background: '#f59e0b' }} />To Review: <strong style={{ color: '#e6edf3' }}>{totalReview}</strong></span>

                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors border border-solid" style={{ color: '#8b949e', borderColor: '#30363d' }}
                        onMouseEnter={e => { e.currentTarget.style.color = '#e6edf3'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                        onMouseLeave={e => { e.currentTarget.style.color = '#8b949e'; e.currentTarget.style.background = 'transparent'; }}
                    >
                        <span className="material-symbols-outlined text-lg">import_export</span>
                        Import/Export
                    </button>

                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                        style={{ background: `linear-gradient(135deg, ${C}, #0ea5e9)`, boxShadow: `0 2px 8px ${C}44` }}>
                        {user?.name?.slice(0, 2).toUpperCase() ?? 'U'}
                    </div>
                </div>
            </div>

            <div className="flex gap-6" style={{ height: 'calc(100vh - 200px)' }}>
                {/* Sidebar */}
                <div
                    className="rounded-xl flex flex-col overflow-hidden border border-solid"
                    style={{ width: '280px', flexShrink: 0, background: '#161b22', borderColor: '#30363d' }}
                >
                    {/* Search */}
                    <div className="p-3 border-b border-solid" style={{ borderColor: '#30363d' }}>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-lg" style={{ color: '#8b949e' }}>search</span>
                            <input
                                className="w-full rounded-lg text-sm py-2 pl-9 pr-3"
                                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid #30363d', color: '#e6edf3' }}
                                placeholder="Search decks..."
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Deck list */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-4">
                        {Object.entries(grouped).map(([domain, { color, decks }]) => (
                            <div key={domain}>
                                <div className="flex items-center justify-between px-2 mb-2">
                                    <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: '#64748b' }}>{domain}</h3>
                                    <button style={{ color: '#64748b', background: 'none', border: 'none', cursor: 'pointer' }}>
                                        <span className="material-symbols-outlined text-base">add</span>
                                    </button>
                                </div>
                                <ul className="space-y-1">
                                    {decks.map(deck => (
                                        <li key={deck.id}>
                                            <button
                                                className="w-full flex items-center justify-between p-2 rounded-lg text-sm font-medium transition-colors"
                                                style={{ color: '#8b949e' }}
                                                onClick={() => navigate(`/flashcards/${deck.id}/study`)}
                                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#e6edf3'; }}
                                                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8b949e'; }}
                                            >
                                                <span className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-lg" style={{ color }}>folder</span>
                                                    {deck.title}
                                                </span>
                                                <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: '#30363d', color: '#8b949e' }}>{deck.count}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Add deck */}
                    <div className="p-3 border-t border-solid" style={{ borderColor: '#30363d' }}>
                        <button
                            className="w-full py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 border border-dashed transition-all"
                            style={{ borderColor: '#30363d', color: '#8b949e' }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = C; e.currentTarget.style.color = C; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = '#30363d'; e.currentTarget.style.color = '#8b949e'; }}
                        >
                            <span className="material-symbols-outlined text-base">add</span>
                            New Deck
                        </button>
                    </div>
                </div>

                {/* Editor Panel */}
                <div className="flex-1 flex flex-col gap-5 overflow-y-auto">
                    {/* Card editor */}
                    <div className="rounded-xl border border-solid p-5" style={{ background: '#161b22', borderColor: '#30363d' }}>
                        <h2 className="font-bold text-sm mb-4" style={{ color: '#e6edf3' }}>Create New Flashcard</h2>
                        <div className="grid grid-cols-2 gap-5 mb-4">
                            {/* Front */}
                            <div>
                                <label className="text-xs font-semibold block mb-2" style={{ color: '#64748b' }}>FRONT (Term / Question)</label>
                                <textarea
                                    rows={5}
                                    placeholder="Enter term or question..."
                                    className="w-full rounded-lg p-3 text-sm resize-none"
                                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid #30363d', color: '#e6edf3' }}
                                    onFocus={e => (e.currentTarget.style.borderColor = C)}
                                    onBlur={e => (e.currentTarget.style.borderColor = '#30363d')}
                                />
                            </div>
                            {/* Back */}
                            <div>
                                <label className="text-xs font-semibold block mb-2" style={{ color: '#64748b' }}>BACK (Definition / Answer)</label>
                                <textarea
                                    rows={5}
                                    placeholder="Enter definition or answer..."
                                    className="w-full rounded-lg p-3 text-sm resize-none"
                                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid #30363d', color: '#e6edf3' }}
                                    onFocus={e => (e.currentTarget.style.borderColor = C)}
                                    onBlur={e => (e.currentTarget.style.borderColor = '#30363d')}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between flex-wrap gap-3">
                            <div className="flex items-center gap-2">
                                <span className="text-xs" style={{ color: '#64748b' }}>Tags:</span>
                                {['cryptography', 'concepts'].map(tag => (
                                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1" style={{ background: `${C}18`, color: C, border: `1px solid ${C}33` }}>
                                        {tag}
                                        <button style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', lineHeight: 1 }}>×</button>
                                    </span>
                                ))}
                                <button className="text-xs px-2 py-0.5 rounded-full border border-dashed" style={{ borderColor: '#30363d', color: '#64748b', cursor: 'pointer' }}>+ Add tag</button>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 rounded-lg text-sm border border-solid transition-all" style={{ borderColor: '#30363d', color: '#8b949e', background: 'transparent' }}
                                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#e6edf3'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8b949e'; }}
                                >Save & Add Another</button>
                                <button className="px-4 py-2 rounded-lg text-sm font-semibold transition-all" style={{ background: C, color: '#fff' }}
                                    onMouseEnter={e => (e.currentTarget.style.background = '#0f65bd')}
                                    onMouseLeave={e => (e.currentTarget.style.background = C)}
                                >Save Card</button>
                            </div>
                        </div>
                    </div>

                    {/* Live Preview */}
                    <div className="rounded-xl border border-solid p-5" style={{ background: '#161b22', borderColor: '#30363d' }}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-bold text-sm" style={{ color: '#e6edf3' }}>Live Preview</h2>
                            <span className="text-xs" style={{ color: '#64748b' }}>Click to flip</span>
                        </div>
                        <div
                            className="h-48 rounded-xl flex items-center justify-center text-center p-6 cursor-pointer border border-solid transition-all"
                            style={{ background: 'rgba(19,127,236,0.06)', borderColor: `${C}33` }}
                        >
                            <p style={{ color: '#e6edf3', fontSize: '1rem', fontWeight: 500 }}>What is TLS 1.3?</p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
