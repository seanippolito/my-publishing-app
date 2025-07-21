// src/app/(dashboard)/page.tsx
// This can be a Server Component to fetch initial data for analytics
'use client'; // Marking as client component because of the original context, though it can be server.
// If you fetch sensitive data, it should be a Server Component or use server actions.

import { useUser } from '@clerk/nextjs'; // Using useUser for client-side user info
import OverviewStats from '@/components/dashboard/overview-stats';
import QuickActions from '@/components/dashboard/quick-actions';
import { Suspense } from 'react';
import LoadingSpinner from '@/components/ui/spinner'; // Assuming you'll create one

export default function DashboardOverviewPage() {
    const { user } = useUser(); // Get user for client-side personalized greeting

    // Mock data for MVP. In reality, this would come from your Supabase/Drizzle backend.
    const mockStats = {
        totalBooks: 5,
        totalSales: '1,234.56', // Mock currency
        recentComments: 12,
        followers: 150,
    };

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

            <section>
                <h3 className="text-3xl font-heading font-semibold mb-6">Your Performance At A Glance</h3>
                <Suspense fallback={<LoadingSpinner />}>
                    {/* OverviewStats could be a Client Component if it has interactive elements,
              or a Server Component that takes props from fetched data. */}
                    <OverviewStats stats={mockStats} />
                </Suspense>
            </section>

            <section>
                <h3 className="text-3xl font-heading font-semibold mb-6">Quick Actions</h3>
                <QuickActions />
            </section>

            {/* More sections like recent activity feed, notifications etc. */}
        </div>
    );
}