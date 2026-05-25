/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import { useClientAuth } from '../app/providers/auth-provider';
import { Header } from './Header';
import { Footer } from '@shared-ui/components/ui/Footer';
import { Loader2 } from 'lucide-react';

export function ClientShell({ children }: { children: React.ReactNode }) {
    const { isAuth, isLoading, userData, lang, darkMode, setLang, toggleDarkMode, logout } = useClientAuth();

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center bg-[#f4f7fe] dark:bg-[#080b14]">
                <Loader2 className="animate-spin text-[#0528d6] size-12" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f4f7fe] dark:bg-[#0f1323] transition-colors duration-500 font-sans">
            <Header
                isAuth={isAuth}
                userData={userData}
                toggleTheme={toggleDarkMode}
                darkMode={darkMode}
                lang={lang}
                setLang={setLang}
                onLogout={logout}
            />
            <main className="max-w-7xl mx-auto p-6 md:p-10 pt-28 md:pt-28">
                {children}
            </main>
            <Footer />
        </div>
    );
}
