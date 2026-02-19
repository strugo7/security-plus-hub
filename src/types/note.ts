// src/types/note.ts

export interface Note {
    id: string;
    userId: string;
    title: string;
    content: string;       // Markdown
    topicId?: string;
    lessonId?: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
    isPinned: boolean;
    color?: string;
}
