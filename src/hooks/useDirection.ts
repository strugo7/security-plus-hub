// src/hooks/useDirection.ts
// Returns RTL/LTR direction based on current i18n language

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const RTL_LANGUAGES = ['he', 'ar', 'fa', 'ur'];

export function useDirection() {
    const { i18n } = useTranslation();
    const isRTL = RTL_LANGUAGES.includes(i18n.language);
    const dir: 'rtl' | 'ltr' = isRTL ? 'rtl' : 'ltr';

    useEffect(() => {
        document.documentElement.setAttribute('dir', dir);
        document.documentElement.setAttribute('lang', i18n.language);
    }, [dir, i18n.language]);

    return { isRTL, dir };
}
