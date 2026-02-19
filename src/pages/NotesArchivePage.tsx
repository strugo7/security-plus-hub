// src/pages/NotesArchivePage.tsx
// Note Archive — matches "Page 8 - Note Archive" UX/UI design

import React, { useState } from 'react';
import AppLayout from '../components/layout/AppLayout';

interface MockNote {
    id: string;
    title: string;
    content: string;
    topic: string;
    tags: string[];
    time: string;
    isPinned: boolean;
    color: string;
}

const C = '#0da6f2';

const MOCK_NOTES: MockNote[] = [
    {
        id: 'n1',
        title: 'TLS Handshake Process',
        content: 'Client Hello → Server Hello → Certificate → Key Exchange → Change Cipher Spec → Finished. TLS 1.3 reduced to 1-RTT.',
        topic: '1.4 — Cryptographic Solutions',
        tags: ['cryptography', 'tls', 'protocol'],
        time: '5 mins ago',
        isPinned: true,
        color: '#0da6f2',
    },
    {
        id: 'n2',
        title: 'Social Engineering Attack Types',
        content: 'Phishing, Spear Phishing, Whaling, Vishing, Smishing, Pretexting, Baiting, Quid Pro Quo, Tailgating, Insider Threat.',
        topic: '2.4 — Malicious Activity Indicators',
        tags: ['social-engineering', 'attacks'],
        time: '2 hours ago',
        isPinned: false,
        color: '#f97316',
    },
    {
        id: 'n3',
        title: 'CVSS Score Ranges',
        content: '0.0-3.9 Low | 4.0-6.9 Medium | 7.0-8.9 High | 9.0-10.0 Critical. Calculated from AV, AC, PR, UI, S, C, I, A.',
        topic: '4.3 — Vulnerability Management',
        tags: ['vulnerability', 'scoring'],
        time: 'Yesterday',
        isPinned: false,
        color: '#a855f7',
    },
    {
        id: 'n4',
        title: 'PKI Components Mnemonic',
        content: 'CA signs certs, RA verifies identity, CRL lists revoked, OCSP gives real-time status, CSR is the request.',
        topic: '1.4 — Cryptographic Solutions',
        tags: ['pki', 'cryptography'],
        time: '2 days ago',
        isPinned: true,
        color: '#22c55e',
    },
    {
        id: 'n5',
        title: 'Incident Response Steps',
        content: 'PICERL: Preparation → Identification → Containment → Eradication → Recovery → Lessons Learned.',
        topic: '4.8 — Incident Response',
        tags: ['incident-response'],
        time: '3 days ago',
        isPinned: false,
        color: '#ec4899',
    },
];

export default function NotesArchivePage() {
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState<MockNote | null>(MOCK_NOTES[0]);
    const [activeTag, setActiveTag] = useState<string | null>(null);

    const allTags = Array.from(new Set(MOCK_NOTES.flatMap(n => n.tags)));

    const filtered = MOCK_NOTES.filter(n => {
        const matchQuery =
            !query || n.title.toLowerCase().includes(query.toLowerCase()) || n.content.toLowerCase().includes(query.toLowerCase());
        const matchTag = !activeTag || n.tags.includes(activeTag);
        return matchQuery && matchTag;
    });

    const pinned = filtered.filter(n => n.isPinned);
    const unpinned = filtered.filter(n => !n.isPinned);

    return (
        <AppLayout>
            <div className="flex gap-5" style={{ height: 'calc(100vh - 160px)' }}>
                {/* Sidebar */}
                <div
                    className="flex flex-col rounded-xl border border-solid overflow-hidden"
                    style={{ width: '280px', flexShrink: 0, background: '#161b22', borderColor: '#30363d' }}
                >
                    {/* Header */}
                    <div className="p-4 border-b border-solid" style={{ borderColor: '#30363d' }}>
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="font-bold text-sm" style={{ color: '#e6edf3' }}>📝 Notes</h2>
                            <button
                                className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                                style={{ background: `${C}18`, color: C }}
                                onMouseEnter={e => (e.currentTarget.style.background = `${C}33`)}
                                onMouseLeave={e => (e.currentTarget.style.background = `${C}18`)}
                            >
                                <span className="material-symbols-outlined text-base">add</span>
                            </button>
                        </div>
                        {/* Search */}
                        <div className="relative">
                            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-base" style={{ color: '#8b949e' }}>search</span>
                            <input
                                className="w-full rounded-lg text-xs py-2 pl-8 pr-3 outline-none"
                                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid #30363d', color: '#e6edf3' }}
                                placeholder="Search notes..."
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                onFocus={e => (e.currentTarget.style.borderColor = C)}
                                onBlur={e => (e.currentTarget.style.borderColor = '#30363d')}
                            />
                        </div>

                        {/* Tag filters */}
                        <div className="flex flex-wrap gap-1.5 mt-2.5">
                            {allTags.slice(0, 6).map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                                    className="text-[10px] px-2 py-0.5 rounded-full border border-solid transition-all"
                                    style={{
                                        borderColor: activeTag === tag ? C : '#30363d',
                                        background: activeTag === tag ? `${C}18` : 'transparent',
                                        color: activeTag === tag ? C : '#8b949e',
                                    }}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Notes list */}
                    <div className="flex-1 overflow-y-auto p-2 space-y-1">
                        {pinned.length > 0 && (
                            <>
                                <p className="px-2 py-1 text-[10px] uppercase font-bold tracking-wider" style={{ color: '#64748b' }}>📌 Pinned</p>
                                {pinned.map(note => (
                                    <NoteItem key={note.id} note={note} isSelected={selected?.id === note.id} onClick={() => setSelected(note)} />
                                ))}
                                <div className="h-px mx-2 my-2" style={{ background: '#30363d' }} />
                            </>
                        )}
                        {unpinned.length > 0 && (
                            <>
                                <p className="px-2 py-1 text-[10px] uppercase font-bold tracking-wider" style={{ color: '#64748b' }}>All Notes</p>
                                {unpinned.map(note => (
                                    <NoteItem key={note.id} note={note} isSelected={selected?.id === note.id} onClick={() => setSelected(note)} />
                                ))}
                            </>
                        )}
                    </div>
                </div>

                {/* Note Viewer / Editor */}
                <div className="flex-1 flex flex-col rounded-xl border border-solid overflow-hidden" style={{ background: '#161b22', borderColor: '#30363d' }}>
                    {selected ? (
                        <>
                            <div className="p-5 border-b border-solid" style={{ borderColor: '#30363d' }}>
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h2 className="text-lg font-bold mb-1" style={{ color: '#e6edf3' }}>{selected.title}</h2>
                                        <p className="text-xs" style={{ color: '#8b949e' }}>{selected.topic} · {selected.time}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {selected.tags.map(tag => (
                                            <span key={tag} className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${selected.color}18`, color: selected.color }}>
                                                {tag}
                                            </span>
                                        ))}
                                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8b949e', marginLeft: '0.5rem' }}>
                                            <span className="material-symbols-outlined text-base">push_pin</span>
                                        </button>
                                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8b949e' }}>
                                            <span className="material-symbols-outlined text-base">delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 p-5">
                                <textarea
                                    defaultValue={selected.content}
                                    className="w-full h-full resize-none text-sm font-mono outline-none"
                                    style={{ background: 'transparent', color: '#e6edf3', border: 'none', lineHeight: 2 }}
                                    placeholder="Start writing your note..."
                                />
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center flex-col" style={{ color: '#8b949e' }}>
                            <span className="material-symbols-outlined text-4xl mb-3">edit_note</span>
                            <p className="text-sm">Select a note or create a new one</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

function NoteItem({ note, isSelected, onClick }: { note: MockNote; isSelected: boolean; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="w-full text-left p-2.5 rounded-lg border border-solid transition-all"
            style={{
                background: isSelected ? `${note.color}10` : 'transparent',
                borderColor: isSelected ? `${note.color}44` : 'transparent',
            }}
            onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
            onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
        >
            <div className="flex items-start gap-2">
                <div className="w-1 rounded-full mt-1 self-stretch" style={{ background: note.color, minHeight: '24px' }} />
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate" style={{ color: '#e6edf3' }}>{note.title}</p>
                    <p className="text-[11px] truncate mt-0.5" style={{ color: '#8b949e' }}>{note.content.slice(0, 60)}...</p>
                    <p className="text-[10px] mt-1" style={{ color: '#4b5563' }}>{note.time}</p>
                </div>
            </div>
        </button>
    );
}
