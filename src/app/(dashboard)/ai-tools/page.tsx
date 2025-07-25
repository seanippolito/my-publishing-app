// src/app/(dashboard)/page.tsx
// This can be a Server Component to fetch initial data for analytics
'use client'; // Marking as client component because of the original context, though it can be server.
// If you fetch sensitive data, it should be a Server Component or use server actions.

import { useUser } from '@clerk/nextjs'; // Using useUser for client-side user info
import LoadingSpinner from '@/components/ui/spinner'; // Assuming you'll create one

export default function AiToolsPage() {
    const { user } = useUser(); // Get user for client-side personalized greeting

    // If the user object is not yet loaded by Clerk, you might show a loading state
    if (!user) {
        return (
            <div className="flex justify-center items-center h-full">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <h2 className="text-4xl font-heading font-bold text-primary dark:text-accent">
                Welcome back, {user?.firstName || 'Publisher'}!
            </h2>
            <h1>AI Tools</h1>
        </div>
    );
}