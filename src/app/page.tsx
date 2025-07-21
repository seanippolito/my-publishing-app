// src/app/page.tsx
'use client'; // This component needs client-side interactivity

import Link from 'next/link';
import {SignedIn, SignedOut, SignInButton, SignUpButton, UserButton} from '@clerk/nextjs';
import { SparklesIcon, UsersIcon, BookOpenIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col bg-bg-light dark:bg-bg-dark text-text-dark dark:text-text-light font-body">
            {/* Header/Nav - Cleaned up */}
            <header className="w-full px-6 py-4 flex justify-between items-center z-10 sticky top-0 bg-bg-light/90 dark:bg-bg-dark/90 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    {/* Creathor Logo - You need to place your electric hammer SVG/PNG here */}
                    <img src="/images/creathor-hammer-logo.svg" alt="Creathor Logo" className="h-1/12 md:h-1/12 w-1/12" />
                    <span className="text-3xl md:text-4xl font-heading font-bold text-primary dark:text-accent">Creathor</span>
                </div>
                <nav className="flex justify-between items-center space-x-3 md:space-x-4">
                    <SignedOut>
                        <SignInButton>
                            <button className=" bg-green-600">Custom sign in button</button>
                        </SignInButton>
                        <SignUpButton>
                            <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                                Sign Up
                            </button>
                        </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                        <Link href="/dashboard" passHref>
                            <Button variant="ghost" className="text-white md:text-lg px-3 py-2">Dashboard</Button>
                        </Link>
                        <UserButton />
                    </SignedIn>
                </nav>
            </header>

            {/* Hero Section - More inviting */}
            <section className="flex-1 flex flex-col items-center justify-center text-center py-20 px-6 md:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-br from-primary to-secondary dark:from-gray-950 dark:to-gray-800 text-white">
                <div className="relative z-10 max-w-5xl mx-auto space-y-8">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold leading-tight tracking-tight drop-shadow-lg animate-fade-in-up">
                        Your Story, Unleashed
                    </h1>
                    <p className="text-lg md:text-xl lg:text-2xl font-light mb-8 opacity-90 leading-relaxed animate-fade-in-up delay-200">
                        Creathor empowers aspiring authors and seasoned writers to craft, perfect, and publish their masterpieces with cutting-edge AI assistance and a vibrant community.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up delay-400">
                        <SignUpButton mode="modal">
                            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-semibold text-lg md:text-xl px-8 py-3 md:px-10 md:py-4 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105">
                                Start Creating Today <ArrowRightIcon className="h-5 w-5 ml-3" />
                            </Button>
                        </SignUpButton>
                        <Link href="#features" passHref>
                            <Button size="lg" variant="outline" className="border-2 border-white text-white bg-transparent hover:bg-white/20 font-semibold text-lg md:text-xl px-8 py-3 md:px-10 md:py-4 rounded-full transition-all duration-300">
                                Discover Features
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section - Cleaner cards, more space */}
            <section id="features" className="py-20 md:py-28 bg-gray-50 dark:bg-gray-900 text-text-dark dark:text-text-light">
                <div className="container mx-auto px-6 max-w-6xl">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-16 text-center text-primary dark:text-accent">
                        Unlock Your Full Creative Potential
                    </h2>
                        {/* Feature 1: AI-Enhanced Creation */}
                    <div className="bg-white dark:bg-gray-800 mb-4 p-8 rounded-xl shadow-lg transform transition-transform hover:-translate-y-2 hover:shadow-2xl flex flex-col items-center text-center">
                        <SparklesIcon className="h-16 w-16 mb-6 text-accent" />
                        <h3 className="text-2xl font-heading font-semibold mb-3">AI-Powered Tools</h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            From generating plot ideas and expanding segments to perfecting grammar and crafting stunning cover art, our AI assists your every step.
                        </p>
                    </div>

                    {/* Feature 2: Collaborative Community */}
                    <div className="bg-white dark:bg-gray-800 mb-4 p-8 rounded-xl shadow-lg transform transition-transform hover:-translate-y-2 hover:shadow-2xl flex flex-col items-center text-center">
                        <UsersIcon className="h-16 w-16 mb-6 text-accent" />
                        <h3 className="text-2xl font-heading font-semibold mb-3">Collaborative Community</h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Connect with passionate writers, insightful editors, and eager readers. Share your drafts, receive feedback, and grow together.
                        </p>
                    </div>

                    {/* Feature 3: Seamless Publishing */}
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg transform transition-transform hover:-translate-y-2 hover:shadow-2xl flex flex-col items-center text-center">
                        <BookOpenIcon className="h-16 w-16 mb-6 text-accent" />
                        <h3 className="text-2xl font-heading font-semibold mb-3">Seamless Publishing</h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Directly publish your work as e-books or print-on-demand. Effortlessly integrate rich media and even generate audiobooks, all from one platform.
                        </p>
                    </div>
                </div>
            </section>

            {/* Call to Action Section - Refined */}
            <section className="py-20 bg-primary dark:bg-gray-700 text-white text-center">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8">
                        Start Your Creathor Journey Today
                    </h2>
                    <p className="text-xl font-light mb-10 leading-relaxed">
                        Join thousands of creators who are revolutionizing their writing and publishing experience.
                    </p>
                    <SignUpButton mode="modal">
                        <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-semibold text-lg md:text-xl px-12 py-5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105">
                            Sign Up for Free <ArrowRightIcon className="h-6 w-6 ml-3" />
                        </Button>
                    </SignUpButton>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 bg-gray-200 dark:bg-gray-950 text-center text-gray-700 dark:text-gray-400 text-sm">
                <div className="container mx-auto px-6">
                    <p>&copy; {new Date().getFullYear()} Creathor. All rights reserved.</p>
                    <div className="mt-4 space-x-4">
                        <Link href="/privacy" className="hover:underline text-primary dark:text-accent">Privacy Policy</Link>
                        <Link href="/terms" className="hover:underline text-primary dark:text-accent">Terms of Service</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}