// src/components/dashboard/overview-stats.tsx
// This could be a client component for interactive elements, or just display props.
'use client'; // Marking as client component for demonstration, though it could be server.

import { Card } from '@/components/ui/card'; // We'll create a generic Card component
import {
    BookOpenIcon,
    CurrencyDollarIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    UsersIcon
} from '@heroicons/react/24/outline';

interface OverviewStatsProps {
    stats: {
        totalBooks: number;
        totalSales: string;
        recentComments: number;
        followers: number;
    };
}

export default function OverviewStats({ stats }: OverviewStatsProps) {
    const statItems = [
        { label: 'Total Books', value: stats.totalBooks, icon: BookOpenIcon },
        { label: 'Total Earnings', value: `$${stats.totalSales}`, icon: CurrencyDollarIcon },
        { label: 'New Comments', value: stats.recentComments, icon: ChatBubbleOvalLeftEllipsisIcon },
        { label: 'Followers', value: stats.followers, icon: UsersIcon },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statItems.map((item) => (
                <Card key={item.label} className="p-6 flex items-center space-x-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
                    <div className="p-3 rounded-full bg-primary/20 dark:bg-primary/40 text-primary dark:text-accent">
                        <item.icon className="h-8 w-8" />
                    </div>
                    <div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{item.label}</p>
                        <p className="text-3xl font-heading font-bold mt-1">{item.value}</p>
                    </div>
                </Card>
            ))}
        </div>
    );
}