'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { MyBookingsView } from '../../views/MyBookingsView';
import { useClientAuth } from '../providers/auth-provider';

export default function BookingsPage() {
    const { userData } = useClientAuth();
    const router = useRouter();

    return <MyBookingsView userData={userData} onNavigateToCatalog={() => router.push('/catalog')} />;
}
