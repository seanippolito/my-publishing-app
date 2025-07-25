// src/components/home/landing-page-content.tsx
'use client';

import Link from 'next/link';
import {SignedIn, SignedOut, SignIn, SignInButton, SignUpButton, UserButton} from '@clerk/nextjs';
import { SparklesIcon, UsersIcon, BookOpenIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button'; // Reusing our Button component

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col bg-bg-light dark:bg-bg-dark text-text-dark dark:text-text-light font-body overflow-x-hidden">
            {/* Header/Nav - Playful and sticky */}
            <header className="w-full px-6 py-4 flex justify-between items-center z-20 sticky top-0 bg-primary/90 dark:bg-background-dark/90 backdrop-blur-sm shadow-lg text-white">
                <div className="flex items-center gap-3">
                    {/* Creathor Logo - You need to place your electric hammer SVG/PNG here */}
                    <img src="/images/creathor-hammer-logo.svg" alt="Creathor Logo" className="h-8 md:h-10 w-auto filter brightness-125 saturate-150" /> {/* Added filters for pop */}
                    <span className="text-3xl md:text-4xl font-heading font-extrabold text-accent">Creathor</span> {/* Accent color for logo text */}
                </div>
                <nav className="space-x-3 md:space-x-4">
                    <SignedOut>
                        <SignInButton>
                            {/*<button className="text-base md:text-lg px-3 py-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-200">Log In</button> /!* Changed "Sign In" to "Log In" *!/*/}
                        </SignInButton>
                        <SignUpButton>
                            {/*<button className="text-base md:text-lg px-3 py-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-200">Log In</button> /!* Changed "Sign In" to "Log In" *!/*/}
                        </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                        <Link href="/dashboard" passHref>
                            <Button variant="ghost" className="text-base md:text-lg px-3 py-2 text-white hover:text-accent hover:bg-white/20 transition-all duration-200">My Portal</Button> {/* Changed "Dashboard" to "My Portal" */}
                        </Link>
                        <UserButton />
                    </SignedIn>
                </nav>
            </header>

            {/* Hero Section - A grand adventure begins! */}
            <section className="flex-1 flex flex-col items-center justify-center text-center py-20 px-6 md:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-br from-primary to-secondary dark:from-background-dark dark:to-background-offset-dark text-white">
                {/* Playful background element - imagine stars, sparkles, or a friendly monster outline */}
                <div className="absolute inset-0 z-0 opacity-40 animate-pulse-slow" style={{ backgroundImage: 'url("/images/hero-bg-adventure.svg")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div> {/* Assume a more playful SVG */}
                <div className="relative z-10 max-w-5xl mx-auto space-y-8">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold leading-tight tracking-tight drop-shadow-xl text-accent animate-fade-in-up">
                        Unleash Your Super Story Power!
                    </h1>
                    <p className="text-lg md:text-xl lg:text-2xl font-body font-light mb-8 opacity-90 leading-relaxed animate-fade-in-up delay-200">
                        Welcome to Creathor, where YOU are the hero of your own writing adventure! Create dazzling tales, explore new ideas with AI magic, and share them with super friends!
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up delay-400">
                        <SignUpButton mode="modal">
                            <Button size="lg" className="bg-accent hover:bg-accent/90 text-primary font-semibold text-lg md:text-xl px-8 py-3 md:px-10 md:py-4 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 animate-bounce-once"> {/* Added bounce-once */}
                                Start Your Epic Quest! <ArrowRightIcon className="h-5 w-5 ml-3" />
                            </Button>
                        </SignUpButton>
                        <Link href="#features" passHref>
                            <Button size="lg" variant="outline" className="border-2 border-white text-white bg-transparent hover:bg-white/20 font-semibold text-lg md:text-xl px-8 py-3 md:px-10 md:py-4 rounded-full transition-all duration-300">
                                Discover Your Powers!
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section - Your Awesome Powers */}
            <section id="features" className="py-20 md:py-28 bg-background-offset-light dark:bg-background-offset-dark text-text-dark dark:text-text-light">
                <div className="container mx-auto px-6 max-w-6xl">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-16 text-center text-primary dark:text-accent">
                        Your Creathor Superpowers
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                        {/* Feature 1: AI Magic Wand */}
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg transform transition-transform hover:-translate-y-2 hover:shadow-2xl flex flex-col items-center text-center border-b-4 border-accent"> {/* Accent border */}
                            <SparklesIcon className="h-16 w-16 mb-6 text-accent animate-pulse-fast" /> {/* Added pulse for magic */}
                            <h3 className="text-2xl font-heading font-semibold mb-3 text-primary dark:text-accent">AI Magic Wand</h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                Need a super idea? Want to make your words sparkle? Our clever AI is your magic assistant for writing, translating, and drawing amazing pictures!
                            </p>
                        </div>

                        {/* Feature 2: Friendship Forest */}
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg transform transition-transform hover:-translate-y-2 hover:shadow-2xl flex flex-col items-center text-center border-b-4 border-secondary"> {/* Secondary border */}
                            <UsersIcon className="h-16 w-16 mb-6 text-secondary animate-bounce-slow" /> {/* Added bounce for fun */}
                            <h3 className="text-2xl font-heading font-semibold mb-3 text-primary dark:text-accent">Friendship Forest</h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                Join a friendly community of young writers! Share your stories, get helpful tips from friends, and find awesome adventure buddies!
                            </p>
                        </div>

                        {/* Feature 3: Publishing Portal */}
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg transform transition-transform hover:-translate-y-2 hover:shadow-2xl flex flex-col items-center text-center border-b-4 border-primary"> {/* Primary border */}
                            <BookOpenIcon className="h-16 w-16 mb-6 text-primary animate-spin-slow" /> {/* Added spin for publishing */}
                            <h3 className="text-2xl font-heading font-semibold mb-3 text-primary dark:text-accent">Publishing Portal</h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                Ready to share your tale? Print your book, make it an e-book, or even turn it into an audiobook with a few clicks! Your story, your way!
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section - Join the Adventure! */}
            <section className="py-20 bg-accent dark:bg-secondary text-primary dark:text-text-dark text-center"> {/* Changed background to accent */}
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8">
                        Ready for Your Next Big Adventure?
                    </h2>
                    <p className="text-xl font-body font-light mb-10 leading-relaxed">
                        Join the Creathor family and let your imagination soar to new heights today!
                    </p>
                    <SignUpButton mode="modal">
                        <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold text-lg md:text-xl px-12 py-5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 animate-pulse-slow"> {/* Primary button on accent background, pulse */}
                            Join the Fun! <ArrowRightIcon className="h-6 w-6 ml-3" />
                        </Button>
                    </SignUpButton>
                </div>
            </section>

            {/* Footer - Simple & Friendly */}
            <footer className="py-8 bg-background-offset-light dark:bg-background-offset-dark text-center text-text-dark dark:text-text-light text-sm">
                <div className="container mx-auto px-6">
                    <p className="font-body">&copy; {new Date().getFullYear()} Creathor. All rights reserved.</p>
                    <div className="mt-4 space-x-4">
                        <Link href="/privacy" className="hover:underline text-primary dark:text-accent font-body">Privacy Rules</Link>
                        <Link href="/terms" className="hover:underline text-primary dark:text-accent font-body">Super User Guide</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}