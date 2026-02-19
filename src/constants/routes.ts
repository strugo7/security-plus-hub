export const routes = {
    // Public
    HOME: '/',
    LOADING: '/loading',

    // Auth
    LOGIN: '/login',
    REGISTER: '/register',

    // Protected – Core
    DASHBOARD: '/dashboard',
    PROFILE: '/profile',

    // Learning – Sections
    SECTIONS: {
        BASE: '/sections',
        DETAIL: '/sections/:sectionId',           // SectionPage
        LESSON: '/sections/:sectionId/:topicId',  // LessonPage
    },

    // Practice / Exams
    PRACTICE: {
        EXAM: '/practice/exam',
        EXAM_RESULTS: '/practice/exam/results',
        FAILED_QUESTIONS: '/practice/failed',
    },

    // Flashcards
    FLASHCARDS: {
        MANAGER: '/flashcards',
        STUDY: '/flashcards/:deckId/study',
    },

    // Simulations
    SIMULATIONS: {
        LIST: '/simulations',
        DETAIL: '/simulations/:simId',
        REPORT: '/simulations/:simId/report',
    },

    // Notes
    NOTES: '/notes',

    // Admin
    ADMIN: {
        LESSON_EDITOR: '/admin/lessons',
        LESSON_EDIT: '/admin/lessons/:lessonId',
        EXAM_BUILDER: '/admin/exams/builder',
        QUESTION_BANK: '/admin/questions',
        QUESTION_ANALYSIS: '/admin/questions/analysis',
    },
} as const;
