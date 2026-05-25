'use client';
import React from 'react';
import { CategoriesView } from '../../views/CategoriesView';
import { useOrgAuth } from '../providers/auth-provider';

export default function CategoriesPage() {
    const { t } = useOrgAuth();
    return <CategoriesView t={t} />;
}
