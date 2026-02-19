// src/context/ProgressContext.tsx
// Per-user learning progress stored in localStorage

import React, {
    createContext,
    useContext,
    useMemo,
    useCallback,
    type ReactNode,
} from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAuth } from './AuthContext';
import { STORAGE_KEYS } from '../constants/storage';
import type { UserProgress, SectionProgress, Achievement } from '../types/progress';
import type { QuizResult, Question } from '../types/quiz';
import type { FlashcardProgress } from '../types/flashcard';

// Section exam weights for weighted overall progress
const SECTION_WEIGHTS: Record<number, number> = {
    1: 15,
    2: 22,
    3: 18,
    4: 28,
    5: 17,
};

function createInitialProgress(userId = 'guest'): UserProgress {
    return {
        userId,
        sections: {},
        quizResults: [],
        failedQuestionIds: [],
        flashcardProgress: [],
        studyStreak: 0,
        longestStreak: 0,
        lastStudyDate: '',
        achievements: [],
        totalStudyTime: 0,
        totalQuestionsAnswered: 0,
        accuracy: 0,
    };
}

// ── Context shape ──────────────────────────────────────────────────────────
interface ProgressContextValue {
    progress: UserProgress;
    overallProgress: number;  // Weighted 0–100
    markTopicComplete: (topicId: string, sectionId: number) => void;
    saveQuizResult: (result: QuizResult) => void;
    addFailedQuestion: (questionId: string) => void;
    removeFailedQuestion: (questionId: string) => void;
    updateFlashcardProgress: (cardId: string, rating: 'easy' | 'medium' | 'hard') => void;
    addStudyTime: (minutes: number) => void;
    updateStreak: () => void;
    unlockAchievement: (achievement: Achievement) => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

// ── SM-2 algorithm ─────────────────────────────────────────────────────────
function sm2Update(
    card: FlashcardProgress,
    rating: 'easy' | 'medium' | 'hard'
): FlashcardProgress {
    const q = rating === 'easy' ? 5 : rating === 'medium' ? 3 : 1;
    const ef = Math.max(1.3, card.easeFactor + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
    const reps = q >= 3 ? card.repetitions + 1 : 0;
    const interval =
        reps === 0 ? 1 : reps === 1 ? 1 : reps === 2 ? 6 : Math.round(card.interval * ef);

    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + interval);

    return {
        ...card,
        easeFactor: ef,
        repetitions: reps,
        interval,
        nextReview: nextReview.toISOString(),
        lastReview: new Date().toISOString(),
    };
}

// ── Provider ──────────────────────────────────────────────────────────────
export function ProgressProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const storageKey = user ? STORAGE_KEYS.PROGRESS(user.id) : STORAGE_KEYS.PROGRESS('guest');

    const [progress, setProgress] = useLocalStorage<UserProgress>(
        storageKey,
        createInitialProgress(user?.id)
    );

    const overallProgress = useMemo(() => {
        let weighted = 0;
        for (const [sid, sec] of Object.entries(progress.sections)) {
            const w = SECTION_WEIGHTS[Number(sid)] ?? 0;
            weighted += (sec.completionPercentage * w) / 100;
        }
        return Math.round(weighted);
    }, [progress.sections]);

    const markTopicComplete = useCallback(
        (topicId: string, sectionId: number) => {
            setProgress((prev) => {
                const section: SectionProgress = prev.sections[sectionId] ?? {
                    sectionId,
                    completedTopics: [],
                    quizScores: [],
                    completionPercentage: 0,
                };
                if (section.completedTopics.includes(topicId)) return prev;
                const completed = [...section.completedTopics, topicId];
                return {
                    ...prev,
                    sections: {
                        ...prev.sections,
                        [sectionId]: {
                            ...section,
                            completedTopics: completed,
                            lastAccessed: new Date().toISOString(),
                            completionPercentage: Math.min(100, completed.length * 10), // placeholder
                        },
                    },
                };
            });
        },
        [setProgress]
    );

    const saveQuizResult = useCallback(
        (result: QuizResult) => {
            setProgress((prev) => ({
                ...prev,
                quizResults: [...prev.quizResults, result],
                totalQuestionsAnswered: prev.totalQuestionsAnswered + result.totalQuestions,
                accuracy: Math.round(
                    ((prev.accuracy * prev.totalQuestionsAnswered + result.percentage) /
                        (prev.totalQuestionsAnswered + 1))
                ),
            }));
        },
        [setProgress]
    );

    const addFailedQuestion = useCallback(
        (questionId: string) => {
            setProgress((prev) => ({
                ...prev,
                failedQuestionIds: prev.failedQuestionIds.includes(questionId)
                    ? prev.failedQuestionIds
                    : [...prev.failedQuestionIds, questionId],
            }));
        },
        [setProgress]
    );

    const removeFailedQuestion = useCallback(
        (questionId: string) => {
            setProgress((prev) => ({
                ...prev,
                failedQuestionIds: prev.failedQuestionIds.filter((id) => id !== questionId),
            }));
        },
        [setProgress]
    );

    const updateFlashcardProgress = useCallback(
        (cardId: string, rating: 'easy' | 'medium' | 'hard') => {
            setProgress((prev) => {
                const existing = prev.flashcardProgress.find((c) => c.cardId === cardId) ?? {
                    cardId,
                    userId: user?.id ?? 'guest',
                    easeFactor: 2.5,
                    interval: 1,
                    repetitions: 0,
                    nextReview: new Date().toISOString(),
                };
                const updated = sm2Update(existing, rating);
                return {
                    ...prev,
                    flashcardProgress: [
                        ...prev.flashcardProgress.filter((c) => c.cardId !== cardId),
                        updated,
                    ],
                };
            });
        },
        [setProgress, user?.id]
    );

    const addStudyTime = useCallback(
        (minutes: number) => {
            setProgress((prev) => ({
                ...prev,
                totalStudyTime: prev.totalStudyTime + minutes,
            }));
        },
        [setProgress]
    );

    const updateStreak = useCallback(() => {
        setProgress((prev) => {
            const today = new Date().toDateString();
            if (prev.lastStudyDate === today) return prev;
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const streak =
                prev.lastStudyDate === yesterday.toDateString() ? prev.studyStreak + 1 : 1;
            return {
                ...prev,
                studyStreak: streak,
                longestStreak: Math.max(prev.longestStreak, streak),
                lastStudyDate: today,
            };
        });
    }, [setProgress]);

    const unlockAchievement = useCallback(
        (achievement: Achievement) => {
            setProgress((prev) => {
                if (prev.achievements.some((a) => a.id === achievement.id)) return prev;
                return {
                    ...prev,
                    achievements: [...prev.achievements, { ...achievement, earnedAt: new Date().toISOString(), isLocked: false }],
                };
            });
        },
        [setProgress]
    );

    return (
        <ProgressContext.Provider
            value={{
                progress,
                overallProgress,
                markTopicComplete,
                saveQuizResult,
                addFailedQuestion,
                removeFailedQuestion,
                updateFlashcardProgress,
                addStudyTime,
                updateStreak,
                unlockAchievement,
            }}
        >
            {children}
        </ProgressContext.Provider>
    );
}

export function useProgress(): ProgressContextValue {
    const ctx = useContext(ProgressContext);
    if (!ctx) throw new Error('useProgress must be used within <ProgressProvider>');
    return ctx;
}
