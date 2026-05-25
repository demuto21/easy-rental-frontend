'use client';
import React from 'react';
import { NotificationsView } from '../../views/NotificationsView';
import { useAgencyAuth } from '../providers/auth-provider';

export default function NotificationsPage() {
    const { agencyData, t } = useAgencyAuth();
    return <NotificationsView agencyId={agencyData?.id} t={t} />;
}
