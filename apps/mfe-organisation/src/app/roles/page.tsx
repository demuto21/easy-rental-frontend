'use client';
import React from 'react';
import { RolesView } from '../../views/RolesView';
import { useOrgAuth } from '../providers/auth-provider';

export default function RolesPage() {
    const { userData, t } = useOrgAuth();
    return <RolesView userData={userData} t={t} />;
}
