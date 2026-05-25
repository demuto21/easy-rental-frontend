'use client';
import React from 'react';
import { StaffManagementView } from '../../views/StaffManagementView';
import { useOrgAuth } from '../providers/auth-provider';

export default function StaffPage() {
    const { orgData, t } = useOrgAuth();
    return <StaffManagementView orgData={orgData} t={t} />;
}
