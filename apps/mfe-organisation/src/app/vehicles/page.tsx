'use client';
import React from 'react';
import { AllVehiclesView } from '../../views/AllVehiclesView';
import { useOrgAuth } from '../providers/auth-provider';

export default function VehiclesPage() {
    const { orgData, t } = useOrgAuth();
    return <AllVehiclesView orgId={orgData?.id} t={t} />;
}
