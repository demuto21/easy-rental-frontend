/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import { useAgencyAuth } from '../app/providers/auth-provider';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { AuthView } from '../views/AuthView';
import { authService } from '@pwa-easy-rental/shared-services';
import { Loader2 } from 'lucide-react';

export function AgencyShell({ children }: { children: React.ReactNode }) {
    const { isAuth, isLoading, userData, agencyData, parentOrg, staffPermissions, lang, darkMode, initError, t, setLang, toggleTheme, fetchContext, logout } = useAgencyAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleAuth = async (form: any) => {
        try {
            const res = await authService.login(form);
            if (res.ok && res.data.token) {
                localStorage.setItem('auth_token', res.data.token);
                await fetchContext();
                return true;
            }
        } catch { /* ignore */ }
        return false;
    };

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center bg-[#f4f7fe] dark:bg-[#080b14]">
                <Loader2 className="animate-spin text-[#0528d6] size-12" />
            </div>
        );
    }

    if (!isAuth) {
        return (
            <AuthView
                onAuth={handleAuth}
                lang={lang}
                setLang={setLang}
                darkMode={darkMode}
                toggleTheme={toggleTheme}
                t={t}
                initError={initError}
            />
        );
    }

    return (
        <div className="flex h-screen bg-white dark:bg-[#080b14] overflow-hidden transition-colors duration-500">
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                handleLogout={logout}
                parentOrg={parentOrg}
                userData={userData}
                staffPermissions={staffPermissions}
                t={t}
            />
            <main className="flex-1 flex flex-col overflow-hidden relative">
                <Header
                    userData={userData}
                    agencyData={agencyData}
                    lang={lang}
                    setLang={setLang}
                    darkMode={darkMode}
                    toggleTheme={toggleTheme}
                    setSidebarOpen={setSidebarOpen}
                    t={t}
                />
                <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 bg-[#f4f7fe] dark:bg-[#0f1323] custom-scrollbar text-left">
                    <div className="max-w-[1600px] mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
