'use client';
import React from 'react';
import { ProfileView } from '../../views/ProfileView';
import { useOrgAuth } from '../providers/auth-provider';

export default function ProfilePage() {
    const { userData, orgData, fetchContext, t } = useOrgAuth();
    return <ProfileView userData={userData} orgData={orgData} onUpdate={fetchContext} t={t} />;
}
