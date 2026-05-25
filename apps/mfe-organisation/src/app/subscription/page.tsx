'use client';
import React from 'react';
import { SubscriptionView } from '../../views/SubscriptionView';
import { useOrgAuth } from '../providers/auth-provider';

export default function SubscriptionPage() {
    const { orgData, t } = useOrgAuth();
    return <SubscriptionView orgData={orgData} t={t} />;
}
