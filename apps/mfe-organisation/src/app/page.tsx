'use client';
import React from 'react';
import { DashboardView } from '../../views/DashboardView';
import { useOrgAuth } from '../providers/auth-provider';

export default function DashboardPage() {
  const { userData, orgData, stats, t } = useOrgAuth();
  return <DashboardView userData={userData} orgData={orgData} stats={stats} t={t} />;
}