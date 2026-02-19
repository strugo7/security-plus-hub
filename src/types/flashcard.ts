// src/types/flashcard.ts

export interface FlashcardDeck {
    id: string;
    title: string;
    description?: string;
    topicId?: string;
    sectionId?: number;
    cardCount: number;
    isPublic: boolean;       // Admin-created = public
    createdBy: string;       // User ID
}

export interface Flashcard {
    id: string;
    deckId: string;
    front: string;           // Term / Question (supports Markdown)
    back: string;            // Definition / Answer (supports Markdown)
    tags: string[];
    createdAt: string;
}

export interface FlashcardProgress {
    cardId: string;
    userId: string;
    easeFactor: number;      // SM-2 default 2.5
    interval: number;        // Days until next review
    repetitions: number;
    nextReview: string;      // ISO date
    lastReview?: string;
}

export type FlashcardRating = 'easy' | 'medium' | 'hard';
