'use client';
import React from 'react';
import { NotificationsView } from '../../views/NotificationsView';
import { useClientAuth } from '../providers/auth-provider';

export default function NotificationsPage() {
    const { userData } = useClientAuth();

    return <NotificationsView clientId={userData?.id} />;
}
