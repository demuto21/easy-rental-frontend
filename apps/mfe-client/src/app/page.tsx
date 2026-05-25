/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { HomeView } from '../views/HomeView';
import { useClientAuth } from './providers/auth-provider';

export default function HomePage() {
  const router = useRouter();
  const { isAuth } = useClientAuth();

  const handleSelectVehicle = useCallback((id: string) => {
    router.push(`/vehicles/${id}`);
  }, [router]);

  return (
    <HomeView
      onSearch={() => router.push('/catalog')}
      setViewAll={() => router.push('/catalog')}
      onSelectVehicle={handleSelectVehicle}
    />
  );
}
