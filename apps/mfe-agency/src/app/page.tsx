'use client';
import React from 'react';
import { DashboardView } from '../../views/DashboardView';
import { useAgencyAuth } from '../providers/auth-provider';

export default function DashboardPage() {
  const { userData, agencyData, stats, t } = useAgencyAuth();
  return <DashboardView userData={userData} agencyData={agencyData} stats={stats} t={t} />;
}