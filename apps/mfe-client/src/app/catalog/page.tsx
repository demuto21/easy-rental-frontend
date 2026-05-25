/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { CatalogView } from '../../views/CatalogView';
import { useClientAuth } from '../providers/auth-provider';

export default function CatalogPage() {
    const { userData } = useClientAuth();
    const router = useRouter();

    return <CatalogView userData={userData} onSelectVehicle={(id: string) => router.push(`/vehicles/${id}`)} />;
}
