// src/types/quiz.ts

export type Difficulty = 'easy' | 'medium' | 'hard';
export type QuestionType = 'single' | 'multiple' | 'drag-drop' | 'true-false';

export interface QuestionAsset {
    type: 'image' | 'code' | 'table';
    content: string;
    caption?: string;
}

export interface Question {
    id: string;                       // "4.1-001"
    type: QuestionType;
    question: string;
    options: string[];
    correct: number | number[];       // Index(es) of correct option(s)
    explanation: string;
    topicId: string;                  // "4.1"
    sectionId: number;                // 4
    difficulty: Difficulty;
    tags: string[];
    assets?: QuestionAsset[];
    points?: number;
}

export interface Quiz {
    id: string;
    type: 'section' | 'topic' | 'exam' | 'failed' | 'custom';
    title: string;
    questions: Question[];
    timeLimit?: number;         // Seconds (0 = no limit)
    passingScore?: number;      // Percentage
    showFeedback: boolean;
    shuffleQuestions: boolean;
    shuffleOptions: boolean;
}

export interface QuizResult {
    id: string;
    quizId: string;
    userId: string;
    date: string;
    score: number;
    totalQuestions: number;
    percentage: number;
    timeSpent: number;          // Seconds
    sectionBreakdown: Record<number, { correct: number; total: number }>;
    failedQuestionIds: string[];
    passed: boolean;
}
