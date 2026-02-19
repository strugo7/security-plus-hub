// src/pages/SimulationReportPage.tsx
// Post-simulation technical report — matches "Page 9.1" concept

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';

const C = '#0da6f2';

const REPORT = {
    simulationId: 'sql',
    title: 'SQL Injection Attack — Technical Report',
    score: 87,
    completedAt: '2026-02-19T10:30:00Z',
    stepsCompleted: 9,
    totalSteps: 11,
    attackType: 'SQL Injection (CWE-89)',
    vulnerability: 'Unsanitized user input in /api/data?id= parameter passed directly to database query without parameterization.',
    impact: 'Full database compromise — attacker was able to dump the users table including hashed passwords and email addresses. Privilege escalation to admin possible via role column manipulation.',
    cvssScore: 9.1,
    cweId: 'CWE-89',
    mitigation: [
        'Use parameterized queries / prepared statements in all database interactions.',
        'Implement an ORM (e.g., Sequelize, TypeORM) that handles query building safely.',
        'Apply input validation and whitelist allowed characters.',
        'Use a Web Application Firewall (WAF) to detect and block injection patterns.',
        'Regularly run DAST (Dynamic Application Security Testing) tools.',
        'Enable database-level access controls — application user should have minimal permissions.',
    ],
    relatedTopics: ['2.3 — Types of Vulnerabilities', '4.3 — Vulnerability Management', '3.2 — Applying Security Principles'],
};

export default function SimulationReportPage() {
    const navigate = useNavigate();
    const { simId } = useParams();

    const scoreColor = REPORT.score >= 80 ? '#22c55e' : REPORT.score >= 60 ? '#f59e0b' : '#ef4444';

    return (
        <AppLayout>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6 text-sm font-mono" style={{ color: '#8b949e' }}>
                <button onClick={() => navigate('/simulations')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8b949e', fontFamily: 'monospace', fontSize: '0.875rem' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#e6edf3')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#8b949e')}
                >Simulations</button>
                <span>›</span>
                <span style={{ color: C }}>Report</span>
            </div>

            {/* Header Card */}
            <div
                className="rounded-2xl p-6 mb-6 border border-solid"
                style={{ background: 'linear-gradient(135deg, #0d2137, #0d1117)', borderColor: '#1e3a52' }}
            >
                <div className="flex items-start justify-between flex-wrap gap-4">
                    <div>
                        <p className="text-xs font-mono mb-2" style={{ color: C }}>SIMULATION REPORT — COMPLETED</p>
                        <h1 className="text-2xl font-bold mb-2" style={{ color: '#e6edf3' }}>{REPORT.title}</h1>
                        <p className="text-sm" style={{ color: '#8b949e' }}>
                            {REPORT.stepsCompleted}/{REPORT.totalSteps} steps · {new Date(REPORT.completedAt).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="text-5xl font-extrabold font-mono" style={{ color: scoreColor, textShadow: `0 0 16px ${scoreColor}66` }}>
                            {REPORT.score}
                        </div>
                        <p className="text-xs mt-1" style={{ color: '#8b949e' }}>Score / 100</p>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="mt-5 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${(REPORT.stepsCompleted / REPORT.totalSteps) * 100}%`, background: `linear-gradient(90deg, ${scoreColor}, ${scoreColor}88)` }} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
                {/* CVSS Badge */}
                <div className="rounded-xl border border-solid p-5 text-center" style={{ background: '#161b22', borderColor: '#ef444433', grid: '1/3' }}>
                    <p className="text-xs font-mono mb-2" style={{ color: '#ef4444' }}>CVSS SCORE</p>
                    <div className="text-4xl font-extrabold font-mono" style={{ color: '#ef4444', textShadow: '0 0 16px rgba(239,68,68,0.5)' }}>{REPORT.cvssScore}</div>
                    <p className="text-xs mt-1" style={{ color: '#8b949e' }}>{REPORT.cweId} · Critical</p>
                </div>
                <div className="rounded-xl border border-solid p-5 text-center" style={{ background: '#161b22', borderColor: '#30363d' }}>
                    <p className="text-xs font-mono mb-2" style={{ color: C }}>ATTACK TYPE</p>
                    <p className="font-bold" style={{ color: '#e6edf3' }}>{REPORT.attackType}</p>
                </div>
                <div className="rounded-xl border border-solid p-5 text-center" style={{ background: '#161b22', borderColor: '#30363d' }}>
                    <p className="text-xs font-mono mb-2" style={{ color: '#22c55e' }}>COMPLETION</p>
                    <p className="text-2xl font-bold" style={{ color: '#22c55e' }}>{Math.round((REPORT.stepsCompleted / REPORT.totalSteps) * 100)}%</p>
                </div>
            </div>

            {/* Report Body */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
                <ReportSection title="🔍 Vulnerability" color="#f97316">
                    <p className="text-sm leading-relaxed" style={{ color: '#8b949e' }}>{REPORT.vulnerability}</p>
                </ReportSection>
                <ReportSection title="💥 Impact" color="#ef4444">
                    <p className="text-sm leading-relaxed" style={{ color: '#8b949e' }}>{REPORT.impact}</p>
                </ReportSection>
            </div>

            <ReportSection title="🛡️ Mitigation Recommendations" color="#22c55e">
                <ol className="space-y-3">
                    {REPORT.mitigation.map((m, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>
                                {i + 1}
                            </span>
                            <span className="text-sm" style={{ color: '#8b949e' }}>{m}</span>
                        </li>
                    ))}
                </ol>
            </ReportSection>

            {/* Related Topics */}
            <div className="mt-5 rounded-xl border border-solid p-5" style={{ background: '#161b22', borderColor: '#30363d' }}>
                <h3 className="text-sm font-bold mb-3" style={{ color: '#e6edf3' }}>📚 Related Security+ Topics</h3>
                <div className="flex flex-wrap gap-2">
                    {REPORT.relatedTopics.map(topic => (
                        <span key={topic} className="text-xs px-3 py-1.5 rounded-full border border-solid" style={{ background: `${C}12`, borderColor: `${C}33`, color: C }}>
                            {topic}
                        </span>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6 justify-end">
                <button onClick={() => navigate('/simulations')} className="px-5 py-2.5 rounded-lg text-sm border border-solid transition-all" style={{ borderColor: '#30363d', color: '#8b949e' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#e6edf3'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8b949e'; }}
                >
                    Back to Lab
                </button>
                <button onClick={() => navigate('/simulations')} className="px-5 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2" style={{ background: C, color: '#0d1117' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#0b8acb')}
                    onMouseLeave={e => (e.currentTarget.style.background = C)}
                >
                    <span className="material-symbols-outlined text-base">replay</span>
                    Try Again
                </button>
            </div>
        </AppLayout>
    );
}

function ReportSection({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
    return (
        <div className="rounded-xl border border-solid p-5" style={{ background: '#161b22', borderColor: '#30363d' }}>
            <h3 className="text-sm font-bold mb-3" style={{ color }}>{title}</h3>
            {children}
        </div>
    );
}
