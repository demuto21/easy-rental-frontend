'use client';
import React from 'react';
import { NotificationsView } from '../../views/NotificationsView';
import { useOrgAuth } from '../providers/auth-provider';

export default function NotificationsPage() {
    const { orgData, t } = useOrgAuth();
    return <NotificationsView orgId={orgData?.id} t={t} />;
}
