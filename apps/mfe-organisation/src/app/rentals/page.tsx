'use client';
import React from 'react';
import { RentalsView } from '../../views/RentalsView';
import { useOrgAuth } from '../providers/auth-provider';

export default function RentalsPage() {
    const { orgData, t } = useOrgAuth();
    return <RentalsView orgId={orgData?.id} t={t} />;
}
