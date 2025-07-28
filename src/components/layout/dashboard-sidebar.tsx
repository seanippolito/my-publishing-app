// src/components/layout/dashboard-sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    BookOpenIcon,
    SparklesIcon,
    ChatBubbleLeftRightIcon,
    Cog6ToothIcon,
    HomeIcon,
    ArrowRightStartOnRectangleIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { SignOutButton } from '@clerk/nextjs';

interface DashboardSidebarProps {
    userName: string;
}

const navItems = [
    { name: 'My Home Base', href: '/dashboard', icon: HomeIcon }, // Changed 'Overview'
    { name: 'My Story Vault', href: '/books', icon: BookOpenIcon }, // Changed 'My Books'
    { name: 'AI Magic Tools', href: '/ai-tools', icon: SparklesIcon }, // Changed 'AI Tools'
    { name: 'Friendship Forest', href: '/community', icon: ChatBubbleLeftRightIcon }, // Changed 'Community'
    { name: 'My Settings Pad', href: '/settings', icon: Cog6ToothIcon }, // Changed 'Settings'
];

export default function DashboardSidebar({ userName }: DashboardSidebarProps) {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-primary text-text-light p-6 flex flex-col justify-between shadow-lg rounded-r-2xl"> {/* Primary background, rounded right corners */}
            <div>
                <div className="flex items-center gap-2 text-2xl font-heading font-extrabold mb-8 text-accent"> {/* Stronger heading font */}
                    <Link href="/" passHref>
                        <div className="flex items-center gap-2">
                            <img src="/images/book-worm-1.svg" alt="Creathor Logo" className="h-8 w-auto filter brightness-125 saturate-150" />
                            Creathor
                        </div>
                    </Link>
                </div>
                <nav>
                    <ul>
                        {navItems.map((item) => {
                            // Adjusting active state for nested routes
                            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
                            return (
                                <li key={item.name} className="mb-3"> {/* Slightly less mb */}
                                    <Link
                                        href={item.href}
                                        className={`flex items-center p-3 rounded-lg transition-all duration-200 text-lg font-body font-semibold transform hover:scale-105 ${ // Increased font size, added scale hover
                                            isActive ? 'bg-accent text-primary shadow-md' : 'hover:bg-secondary/70 text-white' // Accent for active, secondary hover
                                        }`}
                                    >
                                        <item.icon className="h-6 w-6 mr-3" />
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
            <div className="mt-8 text-center border-t-2 border-accent/50 pt-4"> {/* Accent border */}
                <p className="font-heading font-bold text-xl text-accent">{userName}</p> {/* Accent color for username */}
                <p className="text-sm opacity-80 mb-4 text-white">Your Creator Rank!</p> {/* Playful label */}
                <SignOutButton>
                    <Button
                        onClick={async () => {
                            // await fetch('/path-to-sign-out-api'); // Optional: Replace with your sign-out API path if needed
                            window.location.href = '/';
                        }}
                        className="p-4 w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full shadow-md"
                    >
                        <ArrowRightStartOnRectangleIcon className="h-5 w-5 mr-2" />
                        Log Out
                    </Button>
                </SignOutButton>
            </div>
        </aside>
    );
}