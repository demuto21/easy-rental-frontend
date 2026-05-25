'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { MyReservationsView } from '../../views/ReservationsView';
import { useClientAuth } from '../providers/auth-provider';

export default function ReservationsPage() {
    const { userData } = useClientAuth();
    const router = useRouter();

    return <MyReservationsView userData={userData} onNavigateToCatalog={() => router.push('/catalog')} />;
}
