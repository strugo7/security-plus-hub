// src/hooks/useLocalStorage.ts
// Generic typed hook for reading/writing localStorage with JSON serialisation

import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {

    const readValue = useCallback((): T => {
        if (typeof window === 'undefined') return initialValue;
        try {
            const item = window.localStorage.getItem(key);
            return item ? (JSON.parse(item) as T) : initialValue;
        } catch (error) {
            console.warn(`useLocalStorage: error reading key "${key}":`, error);
            return initialValue;
        }
    }, [key, initialValue]);

    const [storedValue, setStoredValue] = useState<T>(readValue);

    // Keep in sync if another tab changes the value
    useEffect(() => {
        const handleStorage = (e: StorageEvent) => {
            if (e.key === key) {
                setStoredValue(readValue());
            }
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, [key, readValue]);

    const setValue = useCallback(
        (value: T | ((prev: T) => T)) => {
            try {
                setStoredValue((prev) => {
                    const next = value instanceof Function ? value(prev) : value;
                    window.localStorage.setItem(key, JSON.stringify(next));
                    return next;
                });
            } catch (error) {
                console.warn(`useLocalStorage: error writing key "${key}":`, error);
            }
        },
        [key]
    );

    const removeValue = useCallback(() => {
        try {
            window.localStorage.removeItem(key);
            setStoredValue(initialValue);
        } catch (error) {
            console.warn(`useLocalStorage: error removing key "${key}":`, error);
        }
    }, [key, initialValue]);

    return [storedValue, setValue, removeValue];
}
