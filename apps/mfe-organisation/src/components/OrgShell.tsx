/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import { useOrgAuth } from '../app/providers/auth-provider';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { AuthView } from '../views/AuthView';
import { orgService } from '@pwa-easy-rental/shared-services';
import { Loader2 } from 'lucide-react';

export function OrgShell({ children }: { children: React.ReactNode }) {
    const { isAuth, isLoading, userData, orgData, lang, darkMode, initError, t, setLang, toggleTheme, fetchContext, logout } = useOrgAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleAuth = async (isNew: boolean, form: any) => {
        try {
            const authPromise = isNew
                ? orgService.registerOrg(form)
                : orgService.loginOrg(form);
            const res = await authPromise;
            if (res.ok && res.data.token) {
                localStorage.setItem('auth_token', res.data.token);
                await fetchContext();
                return true;
            }
        } catch { /* ignore */ }
        return false;
    };

    const handleInstallPWA = () => {
        /* PWA Prompt logic here */
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
                handleInstall={handleInstallPWA}
                t={t}
            />
            <main className="flex-1 flex flex-col min-h-0 overflow-hidden relative isolate">
                <Header
                    userData={userData}
                    orgData={orgData}
                    lang={lang}
                    setLang={setLang}
                    darkMode={darkMode}
                    toggleTheme={toggleTheme}
                    setSidebarOpen={setSidebarOpen}
                    t={t}
                />
                <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 bg-[#f4f7fe] dark:bg-[#0f1323] custom-scrollbar">
                    <div className="max-w-[1600px] mx-auto h-full text-left">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
