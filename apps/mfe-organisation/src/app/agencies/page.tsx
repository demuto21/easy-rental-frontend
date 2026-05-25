'use client';
import React from 'react';
import { AgenciesView } from '../../views/AgenciesView';
import { useOrgAuth } from '../providers/auth-provider';

export default function AgenciesPage() {
    const { userData, orgData, t } = useOrgAuth();
    return <AgenciesView userData={userData} orgData={orgData} t={t} />;
}
