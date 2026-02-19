// src/constants/storage.ts
// All localStorage key constants for CyberGuard Academy

export const STORAGE_KEYS = {
    // Auth
    AUTH_USER: 'cyberguard_user',
    AUTH_TOKEN: 'cyberguard_token',

    // Preferences
    LANGUAGE: 'cyberguard_language',
    THEME: 'cyberguard_theme',

    // Progress (per user)
    PROGRESS: (userId: string) => `cyberguard_progress_${userId}`,

    // Quiz State (temporary – survives refresh)
    ACTIVE_QUIZ: 'cyberguard_active_quiz',

    // Flashcard Progress (SM-2 data per user)
    FLASHCARD_PROGRESS: (userId: string) => `cyberguard_flashcards_${userId}`,

    // Notes
    NOTES: (userId: string) => `cyberguard_notes_${userId}`,

    // User-created Flashcard Decks
    USER_DECKS: (userId: string) => `cyberguard_user_decks_${userId}`,
} as const;
