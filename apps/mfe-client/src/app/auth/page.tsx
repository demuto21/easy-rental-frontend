/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { AuthView } from '../../views/AuthView';
import { authService } from '@pwa-easy-rental/shared-services';
import { useClientAuth } from '../providers/auth-provider';

export default function AuthPage() {
    const router = useRouter();
    const { fetchProfile } = useClientAuth();

    const handleAuthAction = async (isSignUp: boolean, form: any) => {
        const res = isSignUp ? await authService.registerClient(form) : await authService.login(form);
        if (res.ok) {
            const credentials = isSignUp ? { email: form.email, password: form.password } : form;
            const logRes = await authService.login(credentials);
            if (logRes.ok && logRes.data.token) {
                localStorage.setItem('auth_token', logRes.data.token);
                await fetchProfile();
                router.push('/');
                return true;
            }
        }
        return false;
    };

    return (
        <AuthView
            onAuth={handleAuthAction}
            onBack={() => router.push('/catalog')}
        />
    );
}
