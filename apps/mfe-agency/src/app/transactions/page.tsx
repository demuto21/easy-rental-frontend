'use client';
import React from 'react';
import { TransactionsView } from '../../views/TransactionsView';
import { useAgencyAuth } from '../providers/auth-provider';

export default function TransactionsPage() {
    const { userData, t } = useAgencyAuth();
    return <TransactionsView userData={userData} t={t} />;
}
