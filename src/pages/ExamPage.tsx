// src/pages/ExamPage.tsx
// Full exam interface — matches "Page 6 - Exam interface" UX/UI design

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';

const C = '#0da6f2';

const MOCK_QUESTIONS = [
    {
        id: 'q1',
        question: "A security analyst receives an alert that a user's account is being accessed from two different countries simultaneously. Which of the following is the BEST explanation?",
        options: ['The user is using a VPN', 'The account credentials have been compromised', 'The user is using a proxy server', 'The authentication system has a flaw'],
        correct: 1,
        explanation: 'Simultaneous logins from geographically distant locations (impossible travel) strongly indicate compromised credentials. This is a key indicator in behavioral analytics and SIEM rules.',
    },
    {
        id: 'q2',
        question: 'Which cryptographic protocol provides forward secrecy by generating a new encryption key for each session?',
        options: ['RSA', 'DH static', 'ECDHE', 'AES-256'],
        correct: 2,
        explanation: 'ECDHE (Elliptic Curve Diffie-Hellman Ephemeral) generates a new key pair for each session, ensuring forward secrecy — past sessions remain secure even if the long-term key is compromised.',
    },
    {
        id: 'q3',
        question: 'What type of malware modifies the OS boot sector to hide itself from the filesystem?',
        options: ['Ransomware', 'Rootkit', 'Keylogger', 'Adware'],
        correct: 1,
        explanation: 'A rootkit modifies system-level code (like the MBR or OS kernel) to hide its presence. Boot-level rootkits are especially difficult to detect and remove.',
    },
    {
        id: 'q4',
        question: 'An attacker sends crafted packets to a server to exploit a buffer overflow. Which mitigation BEST reduces this risk?',
        options: ['Input validation and bounds checking', 'Network segmentation', 'Multi-factor authentication', 'Firewall rules'],
        correct: 0,
        explanation: 'Input validation and bounds checking prevent buffer overflows by ensuring the application does not write beyond allocated memory boundaries. ASLR and DEP are also effective mitigations.',
    },
    {
        id: 'q5',
        question: 'Which of the following BEST describes the principle of least privilege?',
        options: [
            'Users should have admin rights to perform daily tasks',
            'Accounts should only have the minimum permissions required to perform their function',
            'All users should share the same access level',
            'Privileged accounts should never be monitored',
        ],
        correct: 1,
        explanation: 'Least privilege means granting only the minimum access rights needed to perform a job function, reducing the attack surface if an account is compromised.',
    },
];

export default function ExamPage() {
    const navigate = useNavigate();
    const TOTAL_TIME = 90 * 60; // 90 minutes
    const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [flagged, setFlagged] = useState<Set<string>>(new Set());
    const [showMap, setShowMap] = useState(false);
    const [paused, setPaused] = useState(false);

    const q = MOCK_QUESTIONS[current];

    useEffect(() => {
        if (paused) return;
        const t = setInterval(() => setTimeLeft(p => Math.max(0, p - 1)), 1000);
        return () => clearInterval(t);
    }, [paused]);

    const formatTime = (s: number) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    };

    const handleAnswer = (idx: number) => {
        setAnswers(a => ({ ...a, [q.id]: idx }));
    };

    const toggleFlag = () => {
        setFlagged(f => {
            const n = new Set(f);
            n.has(q.id) ? n.delete(q.id) : n.add(q.id);
            return n;
        });
    };

    const answered = Object.keys(answers).length;
    const progressPct = Math.round((answered / MOCK_QUESTIONS.length) * 100);
    const timeWarning = timeLeft < 600; // < 10 min

    return (
        <AppLayout>
            {/* Exam Header */}
            <div
                className="flex items-center justify-between mb-6 rounded-xl p-4 border border-solid"
                style={{ background: '#161b22', borderColor: '#30363d' }}
            >
                <div className="flex items-center gap-4">
                    <div>
                        <p className="text-xs font-mono" style={{ color: C }}>SECURITY+ EXAM SIMULATION</p>
                        <p className="text-xs" style={{ color: '#8b949e' }}>SY0-701 · 90 Questions · 90 Minutes</p>
                    </div>
                </div>

                {/* Timer */}
                <div className="flex items-center gap-4">
                    <div className="text-center">
                        <div
                            className="text-2xl font-bold font-mono"
                            style={{ color: timeWarning ? '#ef4444' : '#e6edf3', textShadow: timeWarning ? '0 0 8px rgba(239,68,68,0.6)' : 'none' }}
                        >
                            {formatTime(timeLeft)}
                        </div>
                        <p className="text-xs" style={{ color: '#8b949e' }}>Time Remaining</p>
                    </div>
                    <button
                        onClick={() => setPaused(p => !p)}
                        className="px-3 py-2 rounded-lg text-sm border border-solid transition-all"
                        style={{ borderColor: '#30363d', color: '#8b949e' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#e6edf3'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8b949e'; }}
                    >
                        <span className="material-symbols-outlined text-base">{paused ? 'play_arrow' : 'pause'}</span>
                    </button>
                </div>

                {/* Progress pill */}
                <div className="text-right">
                    <p className="text-xs" style={{ color: '#8b949e' }}>{answered}/{MOCK_QUESTIONS.length} answered</p>
                    <div className="h-1.5 w-32 rounded-full overflow-hidden mt-1" style={{ background: '#30363d' }}>
                        <div className="h-full rounded-full transition-all" style={{ width: `${progressPct}%`, background: `linear-gradient(90deg, ${C}, #00d4ff)` }} />
                    </div>
                </div>
            </div>

            <div className="flex gap-6">
                {/* Main Question */}
                <div className="flex-1">
                    {/* Question card */}
                    <div className="rounded-xl border border-solid p-6 mb-4" style={{ background: '#161b22', borderColor: '#30363d' }}>
                        <div className="flex items-start justify-between mb-4">
                            <span className="text-xs font-mono px-2 py-1 rounded" style={{ background: `${C}18`, color: C }}>
                                Question {current + 1} of {MOCK_QUESTIONS.length}
                            </span>
                            <button
                                onClick={toggleFlag}
                                className="flex items-center gap-1.5 text-xs px-2 py-1 rounded-lg border border-solid transition-all"
                                style={{
                                    borderColor: flagged.has(q.id) ? '#f59e0b' : '#30363d',
                                    color: flagged.has(q.id) ? '#f59e0b' : '#8b949e',
                                    background: flagged.has(q.id) ? 'rgba(245,158,11,0.1)' : 'transparent',
                                }}
                            >
                                <span className="material-symbols-outlined text-sm">flag</span>
                                {flagged.has(q.id) ? 'Flagged' : 'Flag for Review'}
                            </button>
                        </div>

                        <p className="text-base leading-relaxed mb-6" style={{ color: '#e6edf3' }}>{q.question}</p>

                        <div className="space-y-3">
                            {q.options.map((opt, i) => {
                                const isSelected = answers[q.id] === i;
                                return (
                                    <button
                                        key={i}
                                        onClick={() => handleAnswer(i)}
                                        className="w-full text-left flex items-start gap-3 p-4 rounded-xl border border-solid transition-all"
                                        style={{
                                            background: isSelected ? `${C}12` : 'rgba(255,255,255,0.02)',
                                            borderColor: isSelected ? C : '#30363d',
                                            color: isSelected ? '#e6edf3' : '#8b949e',
                                        }}
                                        onMouseEnter={e => { if (!isSelected) { e.currentTarget.style.borderColor = '#8b949e'; e.currentTarget.style.color = '#e6edf3'; } }}
                                        onMouseLeave={e => { if (!isSelected) { e.currentTarget.style.borderColor = '#30363d'; e.currentTarget.style.color = '#8b949e'; } }}
                                    >
                                        <span
                                            className="shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                                            style={{ borderColor: isSelected ? C : '#30363d', background: isSelected ? C : 'transparent', color: isSelected ? '#0d1117' : 'inherit' }}
                                        >
                                            {String.fromCharCode(65 + i)}
                                        </span>
                                        <span className="text-sm">{opt}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Nav buttons */}
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => setCurrent(c => Math.max(0, c - 1))}
                            disabled={current === 0}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border border-solid transition-all"
                            style={{ borderColor: '#30363d', color: current === 0 ? '#30363d' : '#8b949e' }}
                            onMouseEnter={e => { if (current > 0) { e.currentTarget.style.color = '#e6edf3'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; } }}
                            onMouseLeave={e => { e.currentTarget.style.color = current === 0 ? '#30363d' : '#8b949e'; e.currentTarget.style.background = 'transparent'; }}
                        >
                            <span className="material-symbols-outlined text-base">arrow_back</span>
                            Previous
                        </button>

                        <button
                            onClick={() => setShowMap(m => !m)}
                            className="px-5 py-2.5 rounded-lg text-sm font-medium border border-solid transition-all"
                            style={{ borderColor: '#30363d', color: '#8b949e' }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#e6edf3'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8b949e'; }}
                        >
                            Question Map
                        </button>

                        {current < MOCK_QUESTIONS.length - 1 ? (
                            <button
                                onClick={() => setCurrent(c => c + 1)}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
                                style={{ background: C, color: '#0d1117' }}
                                onMouseEnter={e => (e.currentTarget.style.background = '#0b8acb')}
                                onMouseLeave={e => (e.currentTarget.style.background = C)}
                            >
                                Next
                                <span className="material-symbols-outlined text-base">arrow_forward</span>
                            </button>
                        ) : (
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all"
                                style={{ background: '#22c55e', color: '#0d1117' }}
                                onMouseEnter={e => (e.currentTarget.style.background = '#16a34a')}
                                onMouseLeave={e => (e.currentTarget.style.background = '#22c55e')}
                            >
                                <span className="material-symbols-outlined text-base">check_circle</span>
                                Submit Exam
                            </button>
                        )}
                    </div>
                </div>

                {/* Sidebar: Question map (when open) */}
                {showMap && (
                    <div className="w-56 rounded-xl border border-solid p-4" style={{ background: '#161b22', borderColor: '#30363d' }}>
                        <h3 className="text-xs font-bold mb-3" style={{ color: '#e6edf3' }}>Question Map</h3>
                        <div className="grid grid-cols-5 gap-1.5">
                            {MOCK_QUESTIONS.map((mq, i) => {
                                const isAnswered = mq.id in answers;
                                const isFlagged = flagged.has(mq.id);
                                const isCurrent = i === current;
                                return (
                                    <button
                                        key={i}
                                        onClick={() => setCurrent(i)}
                                        className="w-8 h-8 rounded text-xs font-bold flex items-center justify-center border border-solid transition-all"
                                        style={{
                                            background: isCurrent ? C : isAnswered ? 'rgba(34,197,94,0.2)' : isFlagged ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.03)',
                                            borderColor: isCurrent ? C : isAnswered ? '#22c55e' : isFlagged ? '#f59e0b' : '#30363d',
                                            color: isCurrent ? '#0d1117' : isAnswered ? '#22c55e' : isFlagged ? '#f59e0b' : '#8b949e',
                                        }}
                                    >
                                        {i + 1}
                                    </button>
                                );
                            })}
                        </div>
                        <div className="mt-4 space-y-1.5 text-xs" style={{ color: '#8b949e' }}>
                            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded" style={{ background: '#22c55e33', border: '1px solid #22c55e' }} />Answered</div>
                            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded" style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid #f59e0b' }} />Flagged</div>
                            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #30363d' }} />Unanswered</div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
