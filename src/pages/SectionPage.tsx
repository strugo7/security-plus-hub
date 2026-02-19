// src/pages/SectionPage.tsx
// Section overview page matching "Page 3.1" UX/UI design

import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import { useProgress } from '../context/ProgressContext';
import { SECTIONS_DATA, type Section, type Topic } from '../data/sectionsData';

const SECTION_COLORS: Record<number, { from: string; to: string; accent: string }> = {
    1: { from: '#0da6f2', to: '#00d4ff', accent: '#0da6f2' },
    2: { from: '#f97316', to: '#fb923c', accent: '#f97316' },
    3: { from: '#22c55e', to: '#4ade80', accent: '#22c55e' },
    4: { from: '#a855f7', to: '#c084fc', accent: '#a855f7' },
    5: { from: '#ec4899', to: '#f472b6', accent: '#ec4899' },
};

export default function SectionPage() {
    const { sectionId } = useParams<{ sectionId: string }>();
    const navigate = useNavigate();
    const { progress } = useProgress();

    const section = useMemo(
        () => SECTIONS_DATA.find((s: Section) => s.id === Number(sectionId)),
        [sectionId]
    );

    if (!section) {
        return (
            <AppLayout>
                <div className="flex items-center justify-center h-64" style={{ color: '#8b949e' }}>
                    Section not found.
                </div>
            </AppLayout>
        );
    }

    const col = SECTION_COLORS[section.id] ?? SECTION_COLORS[1];
    const sectionProgress = progress.sections[section.id];
    const completedTopics = sectionProgress?.completedTopics ?? [];

    return (
        <AppLayout>
            {/* Hero Banner */}
            <div
                className="relative overflow-hidden rounded-2xl p-6 md:p-8 mb-8 border border-solid"
                style={{ background: 'linear-gradient(135deg, #0d2137 0%, #0d1117 60%)', borderColor: '#1e3a52' }}
            >
                <div
                    className="absolute right-0 top-0 h-full w-1/2 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at right, ${col.accent}18 0%, transparent 70%)` }}
                />
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="flex items-center gap-1 text-sm font-mono transition-colors"
                            style={{ color: '#8b949e' }}
                            onMouseEnter={e => (e.currentTarget.style.color = '#e6edf3')}
                            onMouseLeave={e => (e.currentTarget.style.color = '#8b949e')}
                        >
                            <span className="material-symbols-outlined text-base">arrow_back</span>
                            Dashboard
                        </button>
                        <span style={{ color: '#30363d' }}>/</span>
                        <span className="text-sm font-mono" style={{ color: col.accent }}>Domain {section.id}</span>
                    </div>

                    <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                            <p className="text-xs font-mono mb-1" style={{ color: col.accent }}>
                                DOMAIN {section.id} — {section.weight}% OF EXAM
                            </p>
                            <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#e6edf3' }}>
                                {section.title}
                            </h1>
                            <p className="text-sm max-w-xl" style={{ color: '#8b949e' }}>{section.description}</p>
                        </div>
                        <div className="text-right shrink-0">
                            <div
                                className="text-4xl font-extrabold font-mono"
                                style={{ color: col.accent, textShadow: `0 0 12px ${col.accent}66` }}
                            >
                                {sectionProgress?.completionPercentage ?? 0}%
                            </div>
                            <p className="text-xs" style={{ color: '#8b949e' }}>completed</p>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-5 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                                width: `${sectionProgress?.completionPercentage ?? 0}%`,
                                background: `linear-gradient(90deg, ${col.from}, ${col.to})`,
                                boxShadow: `0 0 8px ${col.accent}88`,
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Topics Grid */}
            <h2 className="text-lg font-bold mb-5" style={{ color: '#e6edf3' }}>📚 Topics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {section.topics.map((topic: Topic) => {
                    const isDone = completedTopics.includes(topic.id);
                    return (
                        <button
                            key={topic.id}
                            className="text-left relative rounded-2xl p-5 border border-solid transition-all duration-300 group"
                            style={{
                                background: 'linear-gradient(145deg, #1c2333 0%, #161b22 100%)',
                                borderColor: isDone ? `${col.accent}66` : '#30363d',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.4)',
                            }}
                            onClick={() => navigate(`/sections/${section.id}/${topic.id}`)}
                            onMouseEnter={e => {
                                const el = e.currentTarget;
                                el.style.borderColor = col.accent;
                                el.style.transform = 'translateY(-3px)';
                                el.style.boxShadow = `0 12px 24px rgba(0,0,0,0.5), 0 0 0 1px ${col.accent}44`;
                            }}
                            onMouseLeave={e => {
                                const el = e.currentTarget;
                                el.style.borderColor = isDone ? `${col.accent}66` : '#30363d';
                                el.style.transform = 'translateY(0)';
                                el.style.boxShadow = '0 4px 6px rgba(0,0,0,0.4)';
                            }}
                        >
                            {/* Done badge */}
                            {isDone && (
                                <div
                                    className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center"
                                    style={{ background: `${col.accent}22`, border: `1px solid ${col.accent}66` }}
                                >
                                    <span className="material-symbols-outlined text-sm" style={{ color: col.accent }}>check</span>
                                </div>
                            )}

                            <p className="text-xs font-mono mb-2" style={{ color: col.accent }}>{topic.id}</p>
                            <h3 className="font-bold text-sm mb-1 leading-snug" style={{ color: '#e6edf3' }}>{topic.title}</h3>
                            <p className="text-xs leading-relaxed" style={{ color: '#8b949e' }}>{topic.description}</p>

                            <div className="mt-3 flex items-center gap-2">
                                <span
                                    className="text-xs px-2 py-0.5 rounded font-semibold"
                                    style={{
                                        background: isDone ? `${col.accent}22` : 'rgba(255,255,255,0.06)',
                                        color: isDone ? col.accent : '#8b949e',
                                    }}
                                >
                                    {isDone ? 'Completed' : `${topic.lessons?.length ?? 0} lessons`}
                                </span>
                                <span className="text-xs flex items-center gap-1" style={{ color: '#8b949e' }}>
                                    <span className="material-symbols-outlined text-xs">schedule</span>
                                    ~{(topic.lessons?.length ?? 2) * 15} min
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>
        </AppLayout>
    );
}
