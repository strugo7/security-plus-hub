// src/context/AuthContext.tsx
// LocalStorage-based authentication context (no backend required)

import React, {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useCallback,
    type ReactNode,
} from 'react';
import type { StoredUser, RegisterData } from '../types/user';
import { STORAGE_KEYS } from '../constants/storage';

// ── State ───────────────────────────────────────────────────────────────
interface AuthState {
    user: StoredUser | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}

type AuthAction =
    | { type: 'RESTORE_SESSION'; payload: StoredUser }
    | { type: 'LOGIN'; payload: StoredUser }
    | { type: 'LOGOUT' }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'UPDATE_PROFILE'; payload: Partial<StoredUser> };

function authReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case 'RESTORE_SESSION':
        case 'LOGIN':
            return { user: action.payload, isAuthenticated: true, isLoading: false };
        case 'LOGOUT':
            return { user: null, isAuthenticated: false, isLoading: false };
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        case 'UPDATE_PROFILE':
            return {
                ...state,
                user: state.user ? { ...state.user, ...action.payload } : null,
            };
        default:
            return state;
    }
}

const initialState: AuthState = {
    user: null,
    isLoading: true,
    isAuthenticated: false,
};

// ── Context ──────────────────────────────────────────────────────────────
interface AuthContextValue extends AuthState {
    login: (email: string, _password: string) => Promise<void>;
    logout: () => void;
    register: (data: RegisterData) => Promise<void>;
    updateProfile: (data: Partial<StoredUser>) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ── Provider ─────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Restore session on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
        if (stored) {
            try {
                dispatch({ type: 'RESTORE_SESSION', payload: JSON.parse(stored) });
            } catch {
                dispatch({ type: 'SET_LOADING', payload: false });
            }
        } else {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, []);

    // Persist user whenever it changes
    useEffect(() => {
        if (state.user) {
            localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(state.user));
        }
    }, [state.user]);

    const login = useCallback(async (email: string, _password: string) => {
        // Demo login — in production this would hit an API
        const user: StoredUser = {
            id: `user_${btoa(email).slice(0, 8)}`,
            email,
            name: email.split('@')[0],
            role: email.includes('admin') ? 'admin' : 'user',
            membership: 'pro',
            createdAt: new Date().toISOString(),
        };
        dispatch({ type: 'LOGIN', payload: user });
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
        dispatch({ type: 'LOGOUT' });
    }, []);

    const register = useCallback(async (data: RegisterData) => {
        const user: StoredUser = {
            id: `user_${Date.now()}`,
            email: data.email,
            name: data.name,
            role: 'user',
            membership: 'free',
            createdAt: new Date().toISOString(),
        };
        dispatch({ type: 'LOGIN', payload: user });
    }, []);

    const updateProfile = useCallback(async (data: Partial<StoredUser>) => {
        dispatch({ type: 'UPDATE_PROFILE', payload: data });
    }, []);

    return (
        <AuthContext.Provider
            value={{ ...state, login, logout, register, updateProfile }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// ── Hook ──────────────────────────────────────────────────────────────────
export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
    return ctx;
}
