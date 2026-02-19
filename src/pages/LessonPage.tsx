// src/pages/LessonPage.tsx
// Lesson reader with navigation bar + note taking panel
// Matches "Page 3.2" UX/UI HTML design

import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import { useProgress } from '../context/ProgressContext';
import { SECTIONS_DATA, Section, Topic, Lesson } from '../data/sectionsData';

type PanelMode = 'none' | 'notes' | 'overview';

export default function LessonPage() {
    const { sectionId, topicId } = useParams<{ sectionId: string; topicId: string }>();
    const navigate = useNavigate();
    const { markTopicComplete, addStudyTime } = useProgress();
    const [panel, setPanel] = useState<PanelMode>('none');
    const [note, setNote] = useState('');
    const startTime = useRef(Date.now());

    // Find topic
    const section = SECTIONS_DATA.find((s: Section) => s.id === Number(sectionId));
    const topic = section?.topics.find((t: Topic) => t.id === topicId);

    // Save study time on unmount
    useEffect(() => {
        return () => {
            const minutes = Math.floor((Date.now() - startTime.current) / 60000);
            if (minutes > 0) addStudyTime(minutes);
        };
    }, [addStudyTime]);

    if (!section || !topic) {
        return (
            <AppLayout>
                <div style={{ color: '#8b949e', textAlign: 'center', marginTop: '4rem' }}>Topic not found.</div>
            </AppLayout>
        );
    }

    const handleComplete = () => {
        markTopicComplete(topic.id, section.id);
        navigate(`/sections/${section.id}`);
    };

    const c = '#0da6f2';

    return (
        <AppLayout>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>

                {/* ── Main lesson content ── */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Breadcrumb + nav */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.8rem', color: '#8b949e', fontFamily: 'monospace' }}>
                        <button onClick={() => navigate('/dashboard')} style={{ color: '#8b949e', cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'monospace', fontSize: '0.8rem' }}
                            onMouseEnter={e => (e.currentTarget.style.color = '#e6edf3')}
                            onMouseLeave={e => (e.currentTarget.style.color = '#8b949e')}
                        >Dashboard</button>
                        <span>›</span>
                        <button onClick={() => navigate(`/sections/${section.id}`)} style={{ color: '#8b949e', cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'monospace', fontSize: '0.8rem' }}
                            onMouseEnter={e => (e.currentTarget.style.color = '#e6edf3')}
                            onMouseLeave={e => (e.currentTarget.style.color = '#8b949e')}
                        >{section.title}</button>
                        <span>›</span>
                        <span style={{ color: c }}>{topic.title}</span>
                    </div>

                    {/* Topic header */}
                    <div
                        className="rounded-2xl p-6 mb-6 border border-solid"
                        style={{ background: 'linear-gradient(135deg, #0d2137, #0d1117)', borderColor: '#1e3a52' }}
                    >
                        <p className="text-xs font-mono mb-2" style={{ color: c }}>{topic.id} — {section.title}</p>
                        <h1 className="text-2xl font-bold mb-2" style={{ color: '#e6edf3' }}>{topic.title}</h1>
                        <p className="text-sm" style={{ color: '#8b949e' }}>{topic.description}</p>
                    </div>

                    {/* Lesson body placeholder */}
                    <div
                        className="rounded-xl p-6 border border-solid mb-6"
                        style={{ background: '#161b22', borderColor: '#30363d', minHeight: '400px' }}
                    >
                        <div style={{ color: '#e6edf3', lineHeight: 2 }}>
                            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: c }}>Overview</h2>
                            <p style={{ color: '#8b949e', marginBottom: '1.5rem' }}>{topic.description}</p>

                            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: c }}>Key Concepts</h2>
                            {topic.lessons?.length ? (
                                <ul style={{ paddingLeft: '1.5rem', color: '#8b949e' }}>
                                    {topic.lessons.map((l: Lesson) => (
                                        <li key={l.id} style={{ marginBottom: '0.5rem' }}>
                                            <span style={{ color: '#e6edf3', fontWeight: 600 }}>{l.title}</span>
                                            {' '}— estimated {l.estimatedMinutes} min
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p style={{ color: '#8b949e', fontStyle: 'italic' }}>Content coming soon. Check back later.</p>
                            )}
                        </div>
                    </div>

                    {/* Navigation bar */}
                    <div
                        className="flex items-center justify-between rounded-xl p-4 border border-solid"
                        style={{ background: '#161b22', borderColor: '#30363d' }}
                    >
                        <button
                            onClick={() => navigate(`/sections/${section.id}`)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-solid"
                            style={{ background: 'rgba(255,255,255,0.04)', borderColor: '#30363d', color: '#8b949e' }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#e6edf3'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#8b949e'; }}
                        >
                            <span className="material-symbols-outlined text-base">arrow_back</span>
                            Back to Section
                        </button>

                        <div className="flex items-center gap-3">
                            {/* Notes toggle */}
                            <button
                                onClick={() => setPanel(panel === 'notes' ? 'none' : 'notes')}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border border-solid"
                                style={{
                                    background: panel === 'notes' ? 'rgba(13,166,242,0.1)' : 'rgba(255,255,255,0.04)',
                                    borderColor: panel === 'notes' ? c : '#30363d',
                                    color: panel === 'notes' ? c : '#8b949e',
                                }}
                            >
                                <span className="material-symbols-outlined text-base">edit_note</span>
                                Notes
                            </button>

                            <button
                                onClick={handleComplete}
                                className="flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all"
                                style={{ background: c, color: '#0d1117' }}
                                onMouseEnter={e => (e.currentTarget.style.background = '#0b8acb')}
                                onMouseLeave={e => (e.currentTarget.style.background = c)}
                            >
                                <span className="material-symbols-outlined text-base">check_circle</span>
                                Mark Complete
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Notes Panel ── */}
                {panel === 'notes' && (
                    <div
                        className="rounded-2xl border border-solid flex flex-col"
                        style={{
                            width: '340px',
                            flexShrink: 0,
                            background: '#161b22',
                            borderColor: '#30363d',
                            height: 'calc(100vh - 180px)',
                            position: 'sticky',
                            top: '100px',
                        }}
                    >
                        <div className="flex items-center justify-between p-4 border-b border-solid" style={{ borderColor: '#30363d' }}>
                            <h3 className="font-bold text-sm" style={{ color: '#e6edf3' }}>📝 Notes</h3>
                            <button onClick={() => setPanel('none')} style={{ color: '#8b949e', background: 'none', border: 'none', cursor: 'pointer' }}>
                                <span className="material-symbols-outlined text-base">close</span>
                            </button>
                        </div>
                        <div className="p-3 flex-1">
                            <textarea
                                value={note}
                                onChange={e => setNote(e.target.value)}
                                placeholder={`Notes for ${topic.title}...\n\nUse this space to jot down key points, mnemonics, or anything you want to remember.`}
                                className="w-full h-full resize-none text-sm font-mono"
                                style={{
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid #30363d',
                                    borderRadius: '8px',
                                    color: '#e6edf3',
                                    padding: '0.75rem',
                                    outline: 'none',
                                    lineHeight: 1.8,
                                    minHeight: '300px',
                                }}
                                onFocus={e => (e.currentTarget.style.borderColor = c)}
                                onBlur={e => (e.currentTarget.style.borderColor = '#30363d')}
                            />
                        </div>
                        <div className="p-3 border-t border-solid" style={{ borderColor: '#30363d' }}>
                            <button
                                onClick={() => {
                                    // In production: save to ProgressContext notes
                                    alert('Note saved! (Full implementation coming soon)');
                                }}
                                className="w-full py-2 rounded-lg text-sm font-semibold transition-all"
                                style={{ background: c, color: '#0d1117' }}
                                onMouseEnter={e => (e.currentTarget.style.background = '#0b8acb')}
                                onMouseLeave={e => (e.currentTarget.style.background = c)}
                            >
                                Save Note
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
