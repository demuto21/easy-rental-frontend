/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { VehicleDetailsView } from '../../../views/VehicleDetailsView';
import { useClientAuth } from '../../providers/auth-provider';

export default function VehicleDetailsPage({ params }: { params: { id: string } }) {
    const { isAuth } = useClientAuth();
    const router = useRouter();

    return (
        <VehicleDetailsView
            vehicleId={params.id}
            isAuth={isAuth}
            onBack={() => router.push('/catalog')}
            onAuthRequired={() => router.push('/auth')}
            onStartBooking={() => router.push('/catalog')}
        />
    );
}
