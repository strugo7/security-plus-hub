// src/i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import he from './locales/he.json';
import { STORAGE_KEYS } from '../constants/storage';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            he: { translation: he },
        },
        lng: localStorage.getItem(STORAGE_KEYS.LANGUAGE) ?? 'en',
        fallbackLng: 'en',
        supportedLngs: ['en', 'he'],
        detection: {
            order: ['localStorage', 'navigator'],
            lookupLocalStorage: STORAGE_KEYS.LANGUAGE,
        },
        interpolation: {
            escapeValue: false, // React already escapes
        },
    });

export default i18n;
