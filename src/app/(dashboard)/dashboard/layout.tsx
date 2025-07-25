// src/app/(dashboard)/layout.tsx
import { currentUser } from '@clerk/nextjs/server'; // Correct import for currentUser function
import type { User } from '@clerk/nextjs/server'; // CORRECTED: User type import from the server module
import DashboardSidebar from '@/components/layout/dashboard-sidebar';
import DashboardHeader from '@/components/layout/dashboard-header';
import AIChatBubble from '@/components/ai/ai-chat-bubble'; // IMPORT THE NEW COMPONENT

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
    // Fetch user data on the server side using Clerk
    // This layout is a Server Component by default in the App Router
    const user: User | null = await currentUser();

    // You might want to redirect unauthenticated users here,
    // but Clerk's middleware is the primary way to protect routes.
    // For now, we'll assume Clerk's middleware handles access control.

    return (
        <div className="flex min-h-screen bg-bg-light dark:bg-bg-dark text-text-dark dark:text-text-light font-body">
            {/* Sidebar */}
            <DashboardSidebar userName={user?.fullName || user?.username || 'Publisher'} />

            {/* Main content area */}
            <div className="flex flex-col flex-1">
                {/* Header */}
                <DashboardHeader userImage={user?.imageUrl} userName={user?.fullName || user?.username} />

                {/* Page Content */}
                <main className="flex-1 p-6 md:p-8 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}