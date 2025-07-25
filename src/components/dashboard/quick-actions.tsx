// src/components/dashboard/quick-actions.tsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Create a generic Button component
import {
    PencilSquareIcon,
    PlusCircleIcon,
    MegaphoneIcon,
    LightBulbIcon
} from '@heroicons/react/24/outline';

export default function QuickActions() {
    const actions = [
        { name: 'Start New Book', href: '/books/new', icon: PlusCircleIcon },
        { name: 'Edit Existing Book', href: '/books', icon: PencilSquareIcon },
        { name: 'Explore AI Tools', href: '/ai-tools', icon: LightBulbIcon },
        { name: 'Promote Your Work', href: '/community', icon: MegaphoneIcon }, // Link to community for now
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {actions.map((action) => (
                <Button
                    key={action.name}
                    asChild // Render as Link component
                    className="flex flex-col items-center justify-center p-6 text-center h-40 bg-primary hover:bg-primary/90 text-white rounded-lg shadow-md transition-transform transform hover:scale-105"
                >
                    <Link href={action.href}>
                        <action.icon className="h-10 w-10 mb-3" />
                        <span className="text-xl font-heading font-semibold">{action.name}</span>
                    </Link>
                </Button>
            ))}
        </div>
    );
}