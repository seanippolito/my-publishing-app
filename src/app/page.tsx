// src/app/page.tsx
'use client'; // This component needs client-side interactivity for Clerk

import { useAuth, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import LandingPageContent from '@/components/home/landing-page-content'; // We'll create this from existing content
import SignedInHomePage from '@/components/home/signed-in-home-page';   // We'll create this for logged-in users
import LoadingSpinner from '@/components/ui/spinner';

export default function HomePageRoot() {
    const { isLoaded, isSignedIn } = useAuth(); // Use useAuth for auth status
    const { user } = useUser(); // Use useUser to access user object if needed on this page

    // If auth status isn't loaded yet, show a loading spinner
    if (!isLoaded) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <LoadingSpinner />
            </div>
        );
    }

    // If the user is signed in, render the personalized homepage
    if (isSignedIn) {
        return <SignedInHomePage userName={user?.firstName || user?.username || 'Creator'} />;
    }

    // If the user is signed out, render the landing page content
    return <LandingPageContent />;
}