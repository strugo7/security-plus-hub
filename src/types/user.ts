// src/types/user.ts

export type UserRole = 'user' | 'admin';
export type MembershipTier = 'free' | 'pro' | 'enterprise';

export type AdminPermission =
    | 'lessons:manage'
    | 'questions:manage'
    | 'exams:manage'
    | 'flashcards:manage'
    | 'simulations:manage'
    | 'users:manage'
    | 'analytics:view';

export interface StoredUser {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    role: UserRole;
    membership: MembershipTier;
    permissions?: AdminPermission[];
    createdAt: string;
}

export interface RegisterData {
    email: string;
    password: string;
    name: string;
}
