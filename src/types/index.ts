// ─────────────────────────────────────────────
//  Shared data types for the Security+ Hub app
// ─────────────────────────────────────────────

export interface Domain {
    id: number;
    accentFrom: string;
    accentTo: string;
    icon: string;
    iconColor: string;
    title: string;
    subtitle: string;
    modules: number;
    done: number;
    progress: number;
}

export interface RecentTopic {
    icon: string;
    title: string;
    time: string;
    tag: 'IN PROGRESS' | 'COMPLETED';
}

export interface UserStats {
    xp: number;
    name: string;
    rank: string;
    level: number;
    examDaysLeft: number;
    examHoursLeft: number;
    modulesTotal: number;
    modulesDone: number;
    studyHours: number;
    studyStreak: number;
}
