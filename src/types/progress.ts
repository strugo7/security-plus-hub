import type { QuizResult } from './question';
import type { FlashcardProgress } from './flashcard';

export interface UserProgress {
    // General Info
    startDate: string;
    targetExamDate?: string;
    studyStreak: number;
    lastStudyDate: string;
    totalStudyTime: number;        // minutes

    // Section Progress
    sections: {
        [sectionId: string]: {
            completedTopics: string[];
            quizScores: QuizResult[];
            lastAccessed: string;
        };
    };

    // Practice
    failedQuestions: string[];     // question IDs
    flaggedQuestions: string[];    // saved for later

    // Flashcards
    flashcardProgress: FlashcardProgress[];

    // Full Exams
    fullExamResults: QuizResult[];
}
