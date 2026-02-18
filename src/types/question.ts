export type Difficulty = 'easy' | 'medium' | 'hard';
export type QuestionType = 'multiple-choice' | 'multiple-select' | 'drag-drop';

export interface Question {
    id: string;                    // "1.1-001"
    type: QuestionType;
    question: string;
    options: string[];
    correct: number | number[];    // index or array for multiple-select
    explanation: string;
    topic: string;                 // "1.1"
    section: number;               // 1-5
    difficulty: Difficulty;
    tags?: string[];
}

export interface QuizState {
    questions: Question[];
    currentIndex: number;
    answers: Record<string, number | number[]>;
    score: number;
    startTime: Date;
    endTime?: Date;
    isComplete: boolean;
}

export interface QuizResult {
    quizId: string;
    date: string;
    score: number;
    totalQuestions: number;
    percentage: number;
    timeSpent: number;             // seconds
    sectionScores: Record<string, number>;
    failedQuestionIds: string[];
}
