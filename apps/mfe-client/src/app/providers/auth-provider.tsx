/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { authService } from '@pwa-easy-rental/shared-services';

interface ClientAuthContextType {
    isAuth: boolean;
    isLoading: boolean;
    userData: any;
    lang: 'FR' | 'EN';
    darkMode: boolean;
    setLang: (lang: 'FR' | 'EN') => void;
    toggleDarkMode: () => void;
    fetchProfile: () => Promise<void>;
    logout: () => void;
}

const ClientAuthContext = createContext<ClientAuthContextType | null>(null);

export function ClientAuthProvider({ children }: { children: ReactNode }) {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState<any>(null);
    const [lang, setLang] = useState<'FR' | 'EN'>('FR');
    const [darkMode, setDarkMode] = useState(false);

    const fetchProfile = useCallback(async () => {
        try {
            const res = await authService.getUserMe();
            if (res.ok && res.data) {
                setUserData(res.data);
                setIsAuth(true);
            } else {
                localStorage.removeItem('auth_token');
                setIsAuth(false);
            }
        } catch {
            setIsAuth(false);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            setDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark');
            setDarkMode(false);
        }
        const token = localStorage.getItem('auth_token');
        if (token) fetchProfile();
        else setIsLoading(false);
    }, [fetchProfile]);

    const toggleDarkMode = () => {
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
        <ClientAuthContext.Provider value={{ isAuth, isLoading, userData, lang, darkMode, setLang, toggleDarkMode, fetchProfile, logout }}>
            {children}
        </ClientAuthContext.Provider>
    );
}

export function useClientAuth() {
    const ctx = useContext(ClientAuthContext);
    if (!ctx) throw new Error('useClientAuth must be used within ClientAuthProvider');
    return ctx;
}
