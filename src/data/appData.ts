// ────────────────────────────────────────────────
//  Central data store — single source of truth
//  All pages import from here, never hard-code data
// ────────────────────────────────────────────────

import type { Domain, RecentTopic, UserStats } from '../types';

export const user: UserStats = {
    xp: 7850,
    name: 'Alex M.',
    rank: 'Security Architect II',
    level: 14,
    examDaysLeft: 14,
    examHoursLeft: 8,
    modulesTotal: 53,
    modulesDone: 26,
    studyHours: 85,
    studyStreak: 6,
};

export const domains: Domain[] = [
    {
        id: 1,
        accentFrom: '#3b82f6',
        accentTo: '#60a5fa',
        icon: 'warning',
        iconColor: 'text-blue-400',
        title: 'Threats, Attacks & Vulnerabilities',
        subtitle: 'Domain 1 · 24%',
        modules: 12,
        done: 7,
        progress: 58,
        description: 'Covers different types of social engineering techniques, malware types, and unauthorized access attacks.',
    },
    {
        id: 2,
        accentFrom: '#a855f7',
        accentTo: '#c084fc',
        icon: 'account_tree',
        iconColor: 'text-purple-400',
        title: 'Architecture & Design',
        subtitle: 'Domain 2 · 21%',
        modules: 10,
        done: 3,
        progress: 30,
        description: 'Focuses on enterprise architecture, cloud security concepts, and secure application development.',
    },
    {
        id: 3,
        accentFrom: '#06b6d4',
        accentTo: '#22d3ee',
        icon: 'settings',
        iconColor: 'text-cyan-400',
        title: 'Implementation',
        subtitle: 'Domain 3 · 25%',
        modules: 14,
        done: 9,
        progress: 64,
        description: 'Details implementation of secure protocols, host and application security solutions.',
    },
    {
        id: 4,
        accentFrom: '#22c55e',
        accentTo: '#4ade80',
        icon: 'manage_search',
        iconColor: 'text-green-400',
        title: 'Operations & Incident Response',
        subtitle: 'Domain 4 · 16%',
        modules: 9,
        done: 2,
        progress: 22,
        description: 'Includes incident response procedures, digital forensics, and disaster recovery planning.',
    },
    {
        id: 5,
        accentFrom: '#f97316',
        accentTo: '#fb923c',
        icon: 'gavel',
        iconColor: 'text-orange-400',
        title: 'Governance, Risk & Compliance',
        subtitle: 'Domain 5 · 14%',
        modules: 8,
        done: 5,
        progress: 62,
        description: 'Explores risk management processes, regulations (GDPR, HIPAA), and security policies.',
    },
];

export const recentTopics: RecentTopic[] = [
    { icon: 'phishing', title: 'Social Engineering Tactics', time: '2h ago', tag: 'IN PROGRESS' },
    { icon: 'lock', title: 'PKI & Certificate Management', time: 'Yesterday', tag: 'COMPLETED' },
    { icon: 'bug_report', title: 'Malware Analysis Basics', time: '3 days ago', tag: 'COMPLETED' },
];

export const quickLinks = [
    { icon: 'quiz', label: 'Practice Quiz', color: '#a855f7' },
    { icon: 'style', label: 'Flashcards', color: '#f97316' },
    { icon: 'menu_book', label: 'Glossary', color: '#22c55e' },
    { icon: 'emoji_events', label: 'Leaderboard', color: '#f0b429' },
];
