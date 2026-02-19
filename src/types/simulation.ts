// src/types/simulation.ts
import type { Difficulty } from './quiz';

export type SimulationType =
    | 'sql-injection'
    | 'xss'
    | 'phishing'
    | 'network-attack'
    | 'password-cracking'
    | 'social-engineering';

export interface SimulationTool {
    id: string;
    name: string;
    code: string;
    description: string;
    category: string;
}

export interface SimulationValidation {
    type: 'code' | 'action' | 'answer';
    expected: string | string[];
}

export interface SimulationStep {
    id: string;
    instruction: string;
    hint?: string;
    validation: SimulationValidation;
}

export interface TechnicalReport {
    attackType: string;
    vulnerability: string;
    impact: string;
    mitigation: string[];
    cweId?: string;
    cvssScore?: number;
}

export interface Simulation {
    id: string;
    type: SimulationType;
    title: string;
    description: string;
    difficulty: Difficulty;
    estimatedMinutes: number;
    objectives: string[];
    tools: SimulationTool[];
    steps: SimulationStep[];
    relatedTopics: string[];   // Topic IDs
}

export interface SimulationResult {
    id: string;
    simulationId: string;
    userId: string;
    completedAt: string;
    score: number;
    stepsCompleted: number;
    totalSteps: number;
    report: TechnicalReport;
}
