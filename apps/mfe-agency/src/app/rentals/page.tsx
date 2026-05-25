'use client';
import React from 'react';
import { RentalsView } from '../../views/RentalsView';
import { useAgencyAuth } from '../providers/auth-provider';

export default function RentalsPage() {
    const { userData, staffPermissions, t } = useAgencyAuth();
    return <RentalsView userData={userData} staffPermissions={staffPermissions} t={t} />;
}
