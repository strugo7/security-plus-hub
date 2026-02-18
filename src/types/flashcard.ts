import type { Difficulty } from './question';

export type MasteryLevel = 'new' | 'learning' | 'reviewing' | 'mastered';

export interface Flashcard {
    id: string;                    // "fc-001"
    front: string;
    back: string;
    section: string;               // "1.2"
    tags: string[];
    difficulty: Difficulty;
}

export interface FlashcardProgress {
    cardId: string;
    masteryLevel: MasteryLevel;
    lastReviewed: string;          // ISO date
    nextReview: string;            // ISO date
    correctStreak: number;
    totalReviews: number;
}
