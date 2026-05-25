/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Sun, Moon, LogOut, Car, Home, Ticket, Bell, Route, Wifi, WifiOff } from "lucide-react";
import { notifService } from "@pwa-easy-rental/shared-services";
import { useClientAuth } from "../app/providers/auth-provider";
import Link from "next/link";

export const Header = ({ toggleTheme, darkMode, lang, setLang, onLogout }: any) => {
    const router = useRouter();
    const pathname = usePathname();
    const { isAuth, userData } = useClientAuth();
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        setIsOnline(navigator.onLine);
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    useEffect(() => {
        if (userData?.id) {
            const fetchNotifsCount = () => {
                notifService.countUnreadClient(userData.id).then(res => {
                    if (res.ok) setUnreadCount(res.data);
                });
            };
            fetchNotifsCount();
            const interval = setInterval(fetchNotifsCount, 10000);
            return () => clearInterval(interval);
        }
    }, [userData?.id]);

    return (
        <header className="fixed top-0 left-0 right-0 h-20 px-6 md:px-12 flex items-center justify-between z-[100] bg-white/70 dark:bg-[#0f1323]/70 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-10">
                {/* LOGO */}
                <Link href="/" className="flex items-center gap-3">
                    <div className="size-10 bg-[#0528d6] rounded-xl flex items-center justify-center text-white shadow-md">
                        <span className="font-semibold italic text-lg">E</span>
                    </div>
                    <span className="text-lg font-semibold text-slate-900 dark:text-white">
                        Easy<span className="text-[#0528d6]">Rental</span>
                    </span>
                </Link>

                {/* NAV */}
                <nav className="hidden lg:flex items-center gap-6">
                    <NavLink label="Accueil" active={pathname === "/"} href="/" icon={<Home size={16} />} />
                    <NavLink label="Catalogue" active={pathname === "/catalog"} href="/catalog" icon={<Car size={16} />} />
                    {isAuth && (
                        <div className="hidden lg:flex items-center gap-6">
                            <NavLink label="Mes trajets" active={pathname === "/bookings"} href="/bookings" icon={<Route size={16} />} />
                            <NavLink label="Réservations" active={pathname === "/reservations"} href="/reservations" icon={<Ticket size={16} />} />
                        </div>
                    )}
                </nav>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-4">
                {/* Offline indicator */}
                {!isOnline && (
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-50 border border-amber-200 rounded-lg text-amber-600">
                        <WifiOff size={14} />
                        <span className="text-[10px] font-bold">Hors ligne</span>
                    </div>
                )}
                {isOnline && (
                    <div className="hidden md:flex items-center gap-1 text-green-500 opacity-40">
                        <Wifi size={14} />
                    </div>
                )}

                <button
                    onClick={() => setLang(lang === "FR" ? "EN" : "FR")}
                    className="px-3 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                    {lang}
                </button>

                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {isAuth ? (
                    <>
                        <button
                            onClick={() => router.push("/notifications")}
                            className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                        >
                            <Bell size={20} />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 text-[10px] bg-red-500 text-white rounded-full px-1.5 py-[1px] animate-in zoom-in">
                                    {unreadCount > 9 ? '9+' : unreadCount}
                                </span>
                            )}
                        </button>

                        {/* PROFILE */}
                        <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800">
                            <button onClick={() => router.push("/profile")} className="flex items-center gap-3">
                                <div className="hidden sm:block text-right">
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">{userData?.firstname}</p>
                                    <p className="text-xs text-slate-500">Client</p>
                                </div>
                                <div className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-medium text-[#0528d6]">
                                    {userData?.firstname?.charAt(0)}
                                </div>
                            </button>
                            <button
                                onClick={onLogout}
                                className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    </>
                ) : (
                    <button
                        onClick={() => router.push("/auth")}
                        className="px-5 py-2.5 bg-[#0528d6] text-white rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition"
                    >
                        Connexion
                    </button>
                )}
            </div>
        </header>
    );
};

const NavLink = ({ label, active, href, icon }: { label: string; active: boolean; href: string; icon: React.ReactNode }) => (
    <Link
        href={href}
        className={`flex items-center gap-2 text-sm font-medium transition-colors ${active ? "text-[#0528d6]" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
            }`}
    >
        {icon}
        {label}
    </Link>
);