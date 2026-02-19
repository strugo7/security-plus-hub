// src/pages/FlashcardStudyPage.tsx
// Spaced-repetition study mode — matches "Page 5.1" UX/UI design

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import { useProgress } from '../context/ProgressContext';
import type { FlashcardRating } from '../types/flashcard';

const C = '#137fec';

const MOCK_CARDS = [
    { id: 'c1', front: 'What is TLS 1.3?', back: 'Transport Layer Security 1.3 is a cryptographic protocol providing secure communication over a network. It eliminates weak cipher suites and mandates forward secrecy using ephemeral key exchange.' },
    { id: 'c2', front: 'Define Zero-Day Vulnerability', back: 'A security flaw exploited before the vendor knows about it or releases a patch. Attackers exploit the window between discovery and patch release.' },
    { id: 'c3', front: 'What is SQL Injection?', back: 'An injection attack where malicious SQL statements are inserted into an input field, manipulating the database to reveal or destroy data.' },
    { id: 'c4', front: 'CVSS Score Range', back: 'Common Vulnerability Scoring System: 0.0-3.9 (Low), 4.0-6.9 (Medium), 7.0-8.9 (High), 9.0-10.0 (Critical). It quantifies vulnerability severity.' },
    { id: 'c5', front: 'What is a Man-in-the-Middle Attack?', back: 'An attack where the attacker secretly intercepts and potentially alters communications between two parties who believe they are communicating directly.' },
];

const ratingConfig: { rating: FlashcardRating; label: string; color: string; bg: string; icon: string }[] = [
    { rating: 'hard', label: 'Hard', color: '#ef4444', bg: 'rgba(239,68,68,0.1)', icon: 'sentiment_dissatisfied' },
    { rating: 'medium', label: 'Medium', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', icon: 'sentiment_neutral' },
    { rating: 'easy', label: 'Easy', color: '#22c55e', bg: 'rgba(34,197,94,0.1)', icon: 'sentiment_very_satisfied' },
];

export default function FlashcardStudyPage() {
    const { deckId } = useParams<{ deckId: string }>();
    const navigate = useNavigate();
    const { updateFlashcardProgress } = useProgress();

    const [index, setIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [rated, setRated] = useState<boolean[]>(new Array(MOCK_CARDS.length).fill(false));
    const [sessionStats, setSessionStats] = useState({ easy: 0, medium: 0, hard: 0 });

    const card = MOCK_CARDS[index];
    const progress = Math.round(((index) / MOCK_CARDS.length) * 100);

    const handleRate = (rating: FlashcardRating) => {
        updateFlashcardProgress(card.id, rating);
        setSessionStats(s => ({ ...s, [rating]: s[rating] + 1 }));
        setRated(r => { const n = [...r]; n[index] = true; return n; });
        setIsFlipped(false);

        setTimeout(() => {
            if (index < MOCK_CARDS.length - 1) {
                setIndex(i => i + 1);
            } else {
                // Session complete – return to manager
                navigate('/flashcards');
            }
        }, 300);
    };

    return (
        <AppLayout>
            {/* Header */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <button
                    onClick={() => navigate('/flashcards')}
                    className="flex items-center gap-2 text-sm font-mono transition-colors"
                    style={{ color: '#8b949e', background: 'none', border: 'none', cursor: 'pointer' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#e6edf3')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#8b949e')}
                >
                    <span className="material-symbols-outlined text-base">arrow_back</span>
                    Back to Decks
                </button>

                <div className="flex items-center gap-4 text-sm" style={{ color: '#8b949e' }}>
                    <span>{index + 1} / {MOCK_CARDS.length}</span>
                    <span>·</span>
                    <span style={{ color: '#22c55e' }}>{sessionStats.easy} easy</span>
                    <span>·</span>
                    <span style={{ color: '#f59e0b' }}>{sessionStats.medium} medium</span>
                    <span>·</span>
                    <span style={{ color: '#ef4444' }}>{sessionStats.hard} hard</span>
                </div>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 rounded-full overflow-hidden mb-8" style={{ background: '#161b22' }}>
                <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${C}, #0ea5e9)` }}
                />
            </div>

            {/* Card */}
            <div className="flex flex-col items-center gap-8">
                <div
                    onClick={() => setIsFlipped(f => !f)}
                    className="w-full max-w-2xl cursor-pointer select-none"
                    style={{ perspective: '1000px' }}
                >
                    <div
                        style={{
                            position: 'relative',
                            height: '320px',
                            transformStyle: 'preserve-3d',
                            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                        }}
                    >
                        {/* Front */}
                        <div
                            className="absolute inset-0 rounded-2xl border border-solid flex flex-col items-center justify-center p-8 text-center"
                            style={{
                                background: 'linear-gradient(145deg, #1c2333, #161b22)',
                                borderColor: isFlipped ? '#30363d' : C,
                                boxShadow: isFlipped ? 'none' : `0 0 30px ${C}22`,
                                backfaceVisibility: 'hidden',
                            }}
                        >
                            <p className="text-xs font-mono mb-4" style={{ color: C }}>QUESTION — Tap to reveal answer</p>
                            <h2 className="text-2xl font-bold" style={{ color: '#e6edf3' }}>{card.front}</h2>
                            <div className="mt-6 flex gap-2">
                                {Array(MOCK_CARDS.length).fill(0).map((_, i) => (
                                    <div key={i} className="w-2 h-2 rounded-full transition-all" style={{ background: i === index ? C : i < index ? '#22c55e' : '#30363d' }} />
                                ))}
                            </div>
                        </div>

                        {/* Back */}
                        <div
                            className="absolute inset-0 rounded-2xl border border-solid flex flex-col items-center justify-center p-8 text-center"
                            style={{
                                background: 'linear-gradient(145deg, #0d2137, #161b22)',
                                borderColor: '#22c55e',
                                boxShadow: '0 0 30px rgba(34,197,94,0.12)',
                                backfaceVisibility: 'hidden',
                                transform: 'rotateY(180deg)',
                            }}
                        >
                            <p className="text-xs font-mono mb-4" style={{ color: '#22c55e' }}>ANSWER</p>
                            <p className="text-base leading-relaxed" style={{ color: '#e6edf3' }}>{card.back}</p>
                        </div>
                    </div>
                </div>

                {/* Rating Buttons (only visible when flipped) */}
                <div
                    className="flex gap-4 transition-all duration-300"
                    style={{ opacity: isFlipped ? 1 : 0, pointerEvents: isFlipped ? 'auto' : 'none' }}
                >
                    {ratingConfig.map(({ rating, label, color, bg, icon }) => (
                        <button
                            key={rating}
                            onClick={() => handleRate(rating)}
                            className="flex flex-col items-center gap-2 px-8 py-4 rounded-xl border border-solid font-medium transition-all"
                            style={{ background: bg, borderColor: `${color}44`, color }}
                            onMouseEnter={e => { e.currentTarget.style.background = `${color}22`; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = bg; e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                            <span className="material-symbols-outlined text-2xl">{icon}</span>
                            <span className="text-sm">{label}</span>
                        </button>
                    ))}
                </div>

                {!isFlipped && (
                    <p className="text-sm" style={{ color: '#8b949e' }}>
                        Click the card to flip and reveal the answer
                    </p>
                )}
            </div>
        </AppLayout>
    );
}
