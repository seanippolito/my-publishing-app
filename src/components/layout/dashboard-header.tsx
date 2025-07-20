// src/components/layout/dashboard-header.tsx
'use client'; // Clerk components usually need to be client components

import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';

interface DashboardHeaderProps {
    userImage?: string | null;
    userName?: string | null;
}

export default function DashboardHeader({ userImage, userName }: DashboardHeaderProps) {
    return (
        <header className="bg-bg-light dark:bg-bg-dark text-text-dark dark:text-text-light p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center shadow-md">
            <h1 className="text-2xl font-heading font-bold">
                {/* Dynamically get page title based on path or state if needed */}
                Dashboard
            </h1>
            <div className="flex items-center space-x-4">
                {/* This will render Clerk's user button */}
                <UserButton afterSignOutUrl="/" />
                {userName && <span className="hidden md:block font-body text-lg">{userName}</span>}
            </div>
        </header>
    );
}