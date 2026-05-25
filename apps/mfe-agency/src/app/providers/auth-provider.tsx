/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { agencyService, authService, driverService, orgService, vehicleService, staffService } from '@pwa-easy-rental/shared-services';
import { hasPermission } from '../../utils/permissions';
import { fr } from '../../locales/fr';
import { en } from '../../locales/en';

interface AgencyAuthContextType {
    isAuth: boolean;
    isLoading: boolean;
    userData: any;
    agencyData: any;
    parentOrg: any;
    stats: { vehicles: number; drivers: number };
    staffPermissions: any[];
    lang: 'FR' | 'EN';
    darkMode: boolean;
    initError: string;
    t: typeof fr;
    setLang: (lang: 'FR' | 'EN') => void;
    toggleTheme: () => void;
    fetchContext: () => Promise<void>;
    logout: () => void;
}

const AgencyAuthContext = createContext<AgencyAuthContextType | null>(null);

export function AgencyAuthProvider({ children }: { children: ReactNode }) {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState<any>(null);
    const [agencyData, setAgencyData] = useState<any>(null);
    const [parentOrg, setParentOrg] = useState<any>(null);
    const [stats, setStats] = useState({ vehicles: 0, drivers: 0 });
    const [staffPermissions, setStaffPermissions] = useState<any[]>([]);
    const [lang, setLang] = useState<'FR' | 'EN'>('FR');
    const [darkMode, setDarkMode] = useState(false);
    const [initError, setInitError] = useState('');
    const t = lang === 'FR' ? fr : en;

    const fetchContext = useCallback(async () => {
        setIsLoading(true);
        try {
            const [meRes, permsRes] = await Promise.all([
                authService.getUserMe(),
                staffService.getPermissions(),
            ]);
            if (meRes.ok && meRes.data) {
                const user = meRes.data;
                const perms = permsRes.ok ? permsRes.data : [];
                setUserData(user);
                setStaffPermissions(perms);
                if (user.status === 'SUSPENDED') { setInitError(t.auth.suspended); throw new Error('Suspended'); }
                if (user.agencyId) {
                    const [agencyRes, orgRes] = await Promise.all([
                        agencyService.getAgencyDetails(user.agencyId),
                        orgService.getOrgDetails(user.organizationId),
                    ]);
                    if (agencyRes.ok) setAgencyData(agencyRes.data);
                    if (orgRes.ok) setParentOrg(orgRes.data);
                    const [vehRes, drivRes] = await Promise.all([
                        hasPermission(user, perms, 'vehicle:list') ? vehicleService.getVehiclesByAgency(user.agencyId) : Promise.resolve({ ok: true, data: [] }),
                        hasPermission(user, perms, 'driver:list') ? driverService.getDriversByAgency(user.agencyId) : Promise.resolve({ ok: true, data: [] }),
                    ]);
                    setStats({ vehicles: (vehRes as any).data?.length || 0, drivers: (drivRes as any).data?.length || 0 });
                    setIsAuth(true);
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
    }, [t.auth.suspended]);

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
        <AgencyAuthContext.Provider value={{ isAuth, isLoading, userData, agencyData, parentOrg, stats, staffPermissions, lang, darkMode, initError, t, setLang, toggleTheme, fetchContext, logout }}>
            {children}
        </AgencyAuthContext.Provider>
    );
}

export function useAgencyAuth() {
    const ctx = useContext(AgencyAuthContext);
    if (!ctx) throw new Error('useAgencyAuth must be used within AgencyAuthProvider');
    return ctx;
}
