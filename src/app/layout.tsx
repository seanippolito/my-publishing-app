// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Roboto } from 'next/font/google'; // Example: importing fonts
import {ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton} from '@clerk/nextjs';
import './globals.css';
import { Toaster } from 'react-hot-toast'; // Add this import


// Configure fonts (Next.js font optimization)
const inter = Inter({
    subsets: ['latin'],
    variable: '--font-heading',
    display: 'swap',
});

const roboto = Roboto({
    weight: ['400', '700'],
    subsets: ['latin'],
    variable: '--font-body',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'InkGenius - The Future of Self-Publishing',
    description: 'Empowering creators with AI-enhanced self-publishing tools and a vibrant community.',
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en" className={`${inter.variable} ${roboto.variable}`}>
                <body>
                    {children}
                    <Toaster position="bottom-right" reverseOrder={false} /> {/* Add this */}
                </body>
            </html>
        </ClerkProvider>
    );
}