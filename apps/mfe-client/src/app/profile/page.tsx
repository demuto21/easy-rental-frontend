'use client';
import React from 'react';
import { ProfileView } from '../../views/ProfileView';
import { useClientAuth } from '../providers/auth-provider';

export default function ProfilePage() {
    const { userData, logout } = useClientAuth();

    return <ProfileView userData={userData} onLogout={logout} />;
}
