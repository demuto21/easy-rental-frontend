'use client';
import React from 'react';
import { TransactionsView } from '../../views/TransactionsView';
import { useOrgAuth } from '../providers/auth-provider';

export default function TransactionsPage() {
    const { orgData, t } = useOrgAuth();
    return <TransactionsView orgId={orgData?.id} t={t} />;
}
