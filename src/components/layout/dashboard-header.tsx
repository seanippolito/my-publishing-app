// src/components/layout/dashboard-header.tsx
'use client';

import { UserButton } from '@clerk/nextjs';
// import Image from 'next/image'; // Not used, can remove if you like

interface DashboardHeaderProps {
    userImage?: string | null;
    userName?: string | null;
}

export default function DashboardHeader({ userImage, userName }: DashboardHeaderProps) {
    // Simple title mapping based on common paths
    const getPageTitle = (pathname: string) => {
        if (pathname.startsWith('/books')) return 'My Story Vault';
        if (pathname.startsWith('/ai-tools')) return 'AI Magic Tools';
        if (pathname.startsWith('/community')) return 'Friendship Forest';
        if (pathname.startsWith('/settings')) return 'My Settings Pad';
        return 'My Home Base'; // Default for /dashboard
    };

    const pathname = typeof window !== 'undefined' ? window.location.pathname : ''; // Get pathname client-side

    return (
        <header className="bg-secondary dark:bg-background-offset-dark text-text-dark dark:text-text-light p-4 border-b-2 border-primary/50 dark:border-accent/50 flex justify-between items-center shadow-lg rounded-bl-2xl"> {/* Secondary background, rounded bottom-left */}
            <h1 className="text-3xl font-heading font-bold text-primary dark:text-accent">
                {getPageTitle(pathname)} {/* Dynamic title */}
            </h1>
            <div className="flex items-center space-x-4">
                {userName && <span className="hidden md:block font-body text-lg text-white font-semibold">Hello, {userName}!</span>} {/* Friendly greeting */}
                {/* Clerk's UserButton - already provides sign out */}
                <UserButton afterSignOutUrl="/" appearance={{
                    elements: {
                        userButtonAvatarBox: "w-10 h-10 border-2 border-accent", // Make avatar pop
                    }
                }} />
            </div>
        </header>
    );
}