// src/types/content.ts
// Core content types for the Security+ (SY0-701) syllabus

export type SectionColor = 'blue' | 'red' | 'green' | 'orange' | 'purple';

export interface Section {
  id: number;           // 1–5
  title: string;        // "General Security Concepts"
  description: string;
  weight: number;       // Exam weight %
  icon: string;         // Material Symbols icon name
  color: SectionColor;
  topics: Topic[];
}

export interface Topic {
  id: string;           // "1.1", "2.3", etc.
  sectionId: number;
  title: string;        // "Security Controls"
  description: string;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  topicId: string;
  title: string;
  content: LessonBlock[];
  estimatedMinutes: number;
  order: number;
}

export type BlockType =
  | 'heading'
  | 'paragraph'
  | 'list'
  | 'code'
  | 'table'
  | 'callout'
  | 'quiz'
  | 'diagram';

export interface LessonBlock {
  id: string;
  type: BlockType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
}
