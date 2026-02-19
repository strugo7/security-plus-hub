// ──────────────────────────────────────────────────
//  AppLayout – wraps all inner app pages with the
//  shared header and consistent dark background.
//  Usage:  <AppLayout>  <YourPage />  </AppLayout>
// ──────────────────────────────────────────────────

import React from 'react';
import AppHeader from '../shared/AppHeader';

interface AppLayoutProps {
    children: React.ReactNode;
    searchPlaceholder?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, searchPlaceholder }) => {
    return (
        <div
            className="min-h-screen flex flex-col"
            style={{ background: '#0d1117', color: '#e6edf3' }}
            dir="ltr"
        >
            <AppHeader searchPlaceholder={searchPlaceholder} />
            <main className="flex-1 w-full max-w-screen-xl mx-auto px-6 md:px-10 py-8">
                {children}
            </main>
        </div>
    );
};

export default AppLayout;
