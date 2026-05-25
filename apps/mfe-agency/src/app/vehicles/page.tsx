'use client';
import React from 'react';
import { VehiclesView } from '../../views/VehiclesView';
import { useAgencyAuth } from '../providers/auth-provider';

export default function VehiclesPage() {
    const { userData, staffPermissions, t } = useAgencyAuth();
    return <VehiclesView userData={userData} staffPermissions={staffPermissions} t={t} />;
}
