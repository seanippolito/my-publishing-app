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
    ArrowRightStartOnRectangleIcon // Icon for Logout
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { SignOutButton } from '@clerk/nextjs'; // Import SignOutButton

interface DashboardSidebarProps {
    userName: string;
}

const navItems = [
    { name: 'Overview', href: '/dashboard', icon: HomeIcon },
    { name: 'My Books', href: '/dashboard/books', icon: BookOpenIcon },
    { name: 'AI Tools', href: '/dashboard/ai-tools', icon: SparklesIcon },
    { name: 'Community', href: '/dashboard/community', icon: ChatBubbleLeftRightIcon },
    { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
];

export default function DashboardSidebar({ userName }: DashboardSidebarProps) {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-secondary text-text-light p-6 flex flex-col justify-between shadow-lg">
            <div>
                <div className="flex items-center gap-2 text-2xl font-heading font-bold mb-8 text-accent">
                    {/* Using a placeholder for the logo here, as per your "electric hammer" request */}
                    <img src="/images/creathor-hammer-logo.svg" alt="Creathor Logo" className="h-7 w-auto" />
                    Creathor
                </div>
                <nav>
                    <ul>
                        {navItems.map((item) => {
                            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
                            return (
                                <li key={item.name} className="mb-4">
                                    <Link
                                        href={item.href}
                                        className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                                            isActive ? 'bg-primary text-white' : 'hover:bg-primary/70'
                                        }`}
                                    >
                                        <item.icon className="h-6 w-6 mr-3" />
                                        <span className="font-body text-lg">{item.name}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
            <div className="mt-8 text-center border-t border-primary/50 pt-4">
                <p className="font-heading font-semibold text-lg">{userName}</p>
                <p className="text-sm opacity-80 mb-4">Publisher Account</p>
                {/* Sign Out Button */}
                {/*<SignOutButton signOutCallback={() => window.location.href = '/'}>*/}
                {/*    <Button className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-semibold">*/}
                {/*        <ArrowRightStartOnRectangleIcon className="h-5 w-5 mr-2" />*/}
                {/*        Sign Out*/}
                {/*    </Button>*/}
                {/*</SignOutButton>*/}
            </div>
        </aside>
    );
}