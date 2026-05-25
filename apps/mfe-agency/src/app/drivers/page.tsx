'use client';
import React from 'react';
import { DriversView } from '../../views/DriversView';
import { useAgencyAuth } from '../providers/auth-provider';

export default function DriversPage() {
    const { userData, staffPermissions, t } = useAgencyAuth();
    return <DriversView userData={userData} staffPermissions={staffPermissions} t={t} />;
}
