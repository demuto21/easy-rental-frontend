'use client';
import React from 'react';
import { ProfileView } from '../../views/ProfileView';
import { useAgencyAuth } from '../providers/auth-provider';

export default function ProfilePage() {
    const { userData, agencyData, parentOrg, fetchContext, t } = useAgencyAuth();
    return <ProfileView userData={userData} agencyData={agencyData} parentOrg={parentOrg} onUpdate={fetchContext} t={t} />;
}
