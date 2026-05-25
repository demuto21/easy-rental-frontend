'use client';
import React from 'react';
import { ReservationsView } from '../../views/ReservationsView';
import { useOrgAuth } from '../providers/auth-provider';

export default function ReservationsPage() {
    const { orgData, t } = useOrgAuth();
    return <ReservationsView orgId={orgData?.id} t={t} />;
}
