'use client';
import React from 'react';
import { ReservationsView } from '../../views/ReservationsView';
import { useAgencyAuth } from '../providers/auth-provider';

export default function ReservationsPage() {
    const { userData, staffPermissions, t } = useAgencyAuth();
    return <ReservationsView userData={userData} staffPermissions={staffPermissions} t={t} />;
}
