/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { orgService, authService } from '@pwa-easy-rental/shared-services';
import { fr } from '../../locales/fr';
import { en } from '../../locales/en';

interface OrgAuthContextType {
    isAuth: boolean;
    isLoading: boolean;
    userData: any;
    orgData: any;
    stats: any;
    lang: 'FR' | 'EN';
    darkMode: boolean;
    initError: string;
    t: typeof fr;
    setLang: (lang: 'FR' | 'EN') => void;
    toggleTheme: () => void;
    fetchContext: () => Promise<void>;
    logout: () => void;
}

const OrgAuthContext = createContext<OrgAuthContextType | null>(null);

export function OrgAuthProvider({ children }: { children: ReactNode }) {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState<any>(null);
    const [orgData, setOrgData] = useState<any>(null);
    const [stats, setStats] = useState<any>(null);
    const [lang, setLang] = useState<'FR' | 'EN'>('FR');
    const [darkMode, setDarkMode] = useState(false);
    const [initError, setInitError] = useState('');
    const t = lang === 'FR' ? fr : en;

    const fetchContext = useCallback(async () => {
        setIsLoading(true);
        try {
            const meRes = await authService.getUserMe();
            if (meRes.ok && meRes.data) {
                setUserData(meRes.data);
                if (meRes.data.organizationId) {
                    try {
                        const orgRes = await orgService.getOrgDetails(meRes.data.organizationId);
                        if (orgRes.ok) setOrgData(orgRes.data);
                        const statsRes = await orgService.getOrgStats(meRes.data.organizationId);
                        if (statsRes.ok) setStats(statsRes.data);
                        setIsAuth(true);
                    } catch {
                        setInitError(t.auth.connexionFailed);
                        setIsAuth(false);
                    }
                } else {
                    setIsAuth(false);
                }
            } else {
                localStorage.removeItem('auth_token');
                setIsAuth(false);
            }
        } catch {
            setIsAuth(false);
        } finally {
            setIsLoading(false);
        }
    }, [t.auth.connexionFailed]);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') { document.documentElement.classList.add('dark'); setDarkMode(true); }
        else { document.documentElement.classList.remove('dark'); setDarkMode(false); }
        const token = localStorage.getItem('auth_token');
        if (token) fetchContext();
        else setIsLoading(false);
    }, [fetchContext]);

    const toggleTheme = () => {
        const next = !darkMode;
        setDarkMode(next);
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', next ? 'dark' : 'light');
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
        setIsAuth(false);
        setUserData(null);
        window.location.href = '/';
    };

    return (
        <OrgAuthContext.Provider value={{ isAuth, isLoading, userData, orgData, stats, lang, darkMode, initError, t, setLang, toggleTheme, fetchContext, logout }}>
            {children}
        </OrgAuthContext.Provider>
    );
}

export function useOrgAuth() {
    const ctx = useContext(OrgAuthContext);
    if (!ctx) throw new Error('useOrgAuth must be used within OrgAuthProvider');
    return ctx;
}
