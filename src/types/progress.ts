// src/types/progress.ts
import type { QuizResult } from './quiz';
import type { FlashcardProgress } from './flashcard';

export interface SectionProgress {
    sectionId: number;
    completedTopics: string[];   // Topic IDs e.g. ["1.1","1.2"]
    quizScores: QuizResult[];
    lastAccessed?: string;
    completionPercentage: number; // 0–100
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    earnedAt?: string;
    isLocked: boolean;
}

export interface UserProgress {
    userId: string;

    // Study Progress
    sections: Record<number, SectionProgress>;

    // Quiz / Exam History
    quizResults: QuizResult[];

    // Failed Questions flagged for review
    failedQuestionIds: string[];

    // Flashcard spaced-repetition data
    flashcardProgress: FlashcardProgress[];

    // Study Streaks
    studyStreak: number;
    longestStreak: number;
    lastStudyDate: string;

    // Achievements
    achievements: Achievement[];

    // Statistics
    totalStudyTime: number;        // Minutes
    totalQuestionsAnswered: number;
    accuracy: number;              // %
}
