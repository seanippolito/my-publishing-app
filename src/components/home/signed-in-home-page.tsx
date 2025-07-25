// src/components/home/signed-in-home-page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import {
    MagnifyingGlassIcon, BookOpenIcon, UserGroupIcon, HeartIcon, PlusCircleIcon,
    PencilSquareIcon, LightBulbIcon, SparklesIcon, ChatBubbleOvalLeftEllipsisIcon,
    GlobeAltIcon, FireIcon, ArrowRightIcon // Added new icons for genre/new content/likes
} from '@heroicons/react/24/outline'; // Updated icons import
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

interface SignedInHomePageProps {
    userName: string;
}

// Helper to get genre icon
const getGenreIcon = (genre: string) => {
    switch (genre.toLowerCase()) {
        case 'adventure': return <GlobeAltIcon className="h-5 w-5 text-primary" />;
        case 'sci-fi': return <FireIcon className="h-5 w-5 text-accent" />; // Using FireIcon as a placeholder for sci-fi
        case 'fantasy': return <SparklesIcon className="h-5 w-5 text-secondary" />;
        default: return <BookOpenIcon className="h-5 w-5 text-gray-500" />;
    }
};

// Mock data for curated books, friends' activity
const mockCuratedBooks = [
    { id: 'book1', title: 'The Mystery of the Whispering Woods', author: 'Leo Explorer', genre: 'Adventure', cover: 'https://via.placeholder.com/150x200/64B5F6/FFFFFF?text=Adventure', isNew: true },
    { id: 'book2', title: 'Galactic Friendship Mission', author: 'Astro Ava', genre: 'Sci-Fi', cover: 'https://via.placeholder.com/150x200/A5D6A7/FFFFFF?text=Sci-Fi', isNew: false },
    { id: 'book3', title: 'The Sparkling Gem Quest', author: 'Ruby Writes', genre: 'Fantasy', cover: 'https://via.placeholder.com/150x200/FFD54F/FFFFFF?text=Fantasy', isNew: true },
    { id: 'book4', title: 'Robots Who Dream', author: 'Binary Bea', genre: 'Sci-Fi', cover: 'https://via.placeholder.com/150x200/FFAB91/FFFFFF?text=Sci-Fi', isNew: false },
    { id: 'book5', title: 'The Dino-Dance Party', author: 'Rex Roar', genre: 'Adventure', cover: 'https://via.placeholder.com/150x200/81C784/FFFFFF?text=Dino+Fun', isNew: true },
];

const mockFriendsActivity = [
    { id: 'friend1', name: 'Zoe Zest', activity: 'just published "The Sky-High City"', type: 'published', link: '/dashboard/books/friend1-book', commentSnippet: 'Amazing story, loved the ending!' },
    { id: 'friend2', name: 'Max Marvel', activity: 'is reading "Mystery of the Whispering Woods"', type: 'reading', link: '/books/book1', commentSnippet: null, isCollaborating: true },
    { id: 'friend3', name: 'Lily Learn', activity: 'started "Journey to the Moon"', type: 'writing', link: '/dashboard/books/friend3-book', commentSnippet: 'Such a creative beginning!' },
    { id: 'friend4', name: 'Sam Story', activity: 'is online now!', type: 'online', link: null },
];

const mockFriendsList = [
    { id: 'friendA', name: 'Sparky Sue', isOnline: true, avatar: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=sparky' },
    { id: 'friendB', name: 'Quill Qwen', isOnline: false, avatar: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=quill' },
    { id: 'friendC', name: 'Rhyme Riley', isOnline: true, avatar: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=rhyme' },
    { id: 'friendD', name: 'Ink Isabelle', isOnline: true, avatar: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=isabelle' },
];


export default function SignedInHomePage({ userName }: SignedInHomePageProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterGenre, setFilterGenre] = useState('All');
    const [currentXP, setCurrentXP] = useState(750); // Mock user XP
    const [levelUpXP, setLevelUpXP] = useState(1000); // XP needed for next level
    const [currentLevel, setCurrentLevel] = useState(7); // Mock user level

    const filteredBooks = useMemo(() => {
        return mockCuratedBooks.filter(book => {
            const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.author.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesGenre = filterGenre === 'All' || book.genre === filterGenre;
            return matchesSearch && matchesGenre;
        });
    }, [searchTerm, filterGenre]);

    const handleSparkIdea = () => {
        const prompts = [
            "A talking animal who becomes a detective.",
            "A secret world hidden inside a bookshelf.",
            "A kid who discovers they can fly, but only when they sing.",
            "A magical pen that makes whatever you draw come to life.",
            "A grumpy wizard who accidentally turns his cat into a dragon."
        ];
        const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
        toast.success(`New Idea Sparked! "${randomPrompt}"`);
    };

    const handleLikeStory = (bookId: string, title: string) => {
        // In a real app: send API call to record like, update author's gems/notifications
        toast.success(`You collected a gem for liking "${title}"! ✨`);
    };

    const handleCollaborate = (friendName: string) => {
        // In a real app: initiate collaboration flow or send invitation
        toast(`Collaboration request sent to ${friendName}!`);
    };

    const handleChat = (friendName: string) => {
        // In a real app: initiate collaboration flow or send invitation
        toast(`Chat request sent to ${friendName}!`);
    };

    const handleFindFriends = () => {
        // In a real app: initiate collaboration flow or send invitation
        toast(`Search friend list... multiple directions here!`);
    };

    const xpPercentage = (currentXP / levelUpXP) * 100;

    return (
        <div className="min-h-screen bg-background-offset-light dark:bg-background-dark text-text-dark dark:text-text-light font-body">
            {/* Header for Signed-In Page */}
            <header className="w-full px-6 py-4 flex justify-between items-center z-10 sticky top-0 bg-primary/90 dark:bg-background-offset-dark/90 backdrop-blur-sm shadow-lg text-white">
                <div className="flex items-center gap-3">
                    <img src="/images/creathor-hammer-logo.svg" alt="Creathor Logo" className="h-8 w-auto filter brightness-125 saturate-150" />
                    <span className="text-3xl font-heading font-extrabold text-accent">Creathor</span>
                </div>
                <nav className="flex items-center space-x-2 md:space-x-4">
                    <Link href="/books/new" passHref>
                        <Button variant="ghost" className="p-4 text-white hover:text-accent hover:bg-white/20 transition-all duration-200" title="Start New Story">
                            <PlusCircleIcon className="h-6 w-6" />
                        </Button>
                    </Link>
                    <Link href="/books" passHref>
                        <Button variant="ghost" className="p-4 text-white hover:text-accent hover:bg-white/20 transition-all duration-200" title="Continue Adventures">
                            <PencilSquareIcon className="h-6 w-6" />
                        </Button>
                    </Link>
                    <Button variant="ghost" className="p-4 text-white hover:text-accent hover:bg-white/20 transition-all duration-200" title="Spark an Idea!" onClick={handleSparkIdea}>
                        <LightBulbIcon className="h-6 w-6" />
                    </Button>

                    <Link href="/dashboard" passHref>
                        <Button variant="ghost" className="p-4 text-white hover:text-accent hover:bg-white/20">My Portal</Button>
                    </Link>
                    {/* Clerk's UserButton would typically be handled by the Layout.tsx for consistency */}
                </nav>
            </header>

            {/* Main Content Area */}
            <main className="container mx-auto px-6 py-8 md:py-12 max-w-7xl">
                {/* Welcome & Progress Section */}
                <section className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-b-4 border-accent">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-primary dark:text-accent text-center">
                        Welcome, Super Creator {userName}!
                    </h1>
                    {/* XP & Level Progress Bar */}
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-body font-semibold text-text-dark dark:text-text-light">Level {currentLevel}</span>
                        <div className="flex-1 h-5 bg-gray-200 dark:bg-gray-700 rounded-full mx-4 overflow-hidden">
                            <div
                                className="h-full bg-success rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${xpPercentage}%` }}
                            ></div>
                        </div>
                        <span className="text-lg font-body font-semibold text-text-dark dark:text-text-light">{currentXP}/{levelUpXP} XP</span>
                    </div>
                    <p className="text-center text-gray-600 dark:text-gray-300 font-body">
                        Keep creating to level up and unlock new powers!
                    </p>
                </section>

                {/* Creator's Workbench / Quick Actions */}
                <section className="mb-12 p-6 bg-background-light dark:bg-gray-800 rounded-2xl shadow-xl border-b-4 border-primary">
                    <h2 className="text-3xl font-heading font-bold mb-6 text-primary dark:text-accent text-center">
                        Your Creator's Workbench
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Link href="/books/new" passHref>
                            <Button className="w-full flex flex-col items-center justify-center p-6 bg-accent hover:bg-accent/90 text-primary font-semibold text-lg md:text-xl h-32 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 animate-bounce-once">
                                <PlusCircleIcon className="h-10 w-10 mb-2" />
                                Start New Story!
                            </Button>
                        </Link>
                        <Link href="/books" passHref>
                            <Button className="w-full flex flex-col items-center justify-center p-6 bg-secondary hover:bg-secondary/90 text-primary font-semibold text-lg md:text-xl h-32 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105">
                                <PencilSquareIcon className="h-10 w-10 mb-2" />
                                Continue My Adventures!
                            </Button>
                        </Link>
                        <Button onClick={handleSparkIdea} className="w-full flex flex-col items-center justify-center p-6 bg-primary hover:bg-primary/90 text-white font-semibold text-lg md:text-xl h-32 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105">
                            <LightBulbIcon className="h-10 w-10 mb-2" />
                            Spark an Idea!
                        </Button>
                    </div>
                </section>

                {/* --- DYNAMIC CONTENT CARDS --- */}
                {/* Search & Filter Section */}
                <section className="mb-12 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-center gap-4 border-b-4 border-secondary">
                    <div className="relative flex-grow w-full md:w-auto">
                        <Input
                            type="text"
                            placeholder="Search for stories by title or author..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full rounded-full border-2 border-primary focus:border-accent text-lg"
                        />
                        <MagnifyingGlassIcon className="h-6 w-6 absolute left-3 top-1/2 -translate-y-1/2 text-primary dark:text-accent" />
                    </div>
                    <div className="w-full md:w-auto">
                        <select
                            value={filterGenre}
                            onChange={(e) => setFilterGenre(e.target.value)}
                            className="block w-full px-4 py-2 rounded-full border-2 border-primary bg-background-light dark:bg-gray-700 text-text-dark dark:text-text-light text-lg appearance-none"
                            style={{ paddingRight: '2.5rem', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%23${(getComputedStyle(document.documentElement).getPropertyValue('--color-primary').substring(1)).replace('#', '')}'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.5em 1.5em' }}
                        >
                            <option value="All">All Genres</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Sci-Fi">Sci-Fi</option>
                            <option value="Fantasy">Fantasy</option>
                            {/* Add more genres */}
                        </select>
                    </div>
                </section>

                {/* Curated Books Section - Enhanced */}
                <section className="mb-12">
                    <h2 className="text-3xl font-heading font-bold mb-6 text-primary dark:text-accent text-center">
                        Top Adventures for You!
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredBooks.length === 0 ? (
                            <p className="col-span-full text-center text-gray-500 dark:text-gray-400">No stories found matching your search. Try a different quest!</p>
                        ) : (
                            filteredBooks.map(book => (
                                <Card key={book.id} className="relative p-4 bg-white dark:bg-gray-700 rounded-lg shadow-lg flex flex-col items-center text-center transition-transform transform hover:scale-105 border-b-4 border-accent overflow-hidden">
                                    {book.isNew && (
                                        <div className="absolute top-0 right-0 bg-success text-white px-3 py-1 rounded-bl-lg font-bold text-xs z-10 animate-pulse-fast">
                                            NEW! <SparklesIcon className="h-4 w-4 inline-block ml-1" />
                                        </div>
                                    )}
                                    <img src={book.cover} alt={book.title} className="w-28 h-36 object-cover rounded-md mb-3 border-2 border-primary" />
                                    <div className="flex items-center gap-2 mb-2">
                                        {getGenreIcon(book.genre)} {/* Genre Icon */}
                                        <h3 className="text-lg font-heading font-semibold text-primary dark:text-accent">{book.title}</h3>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">by {book.author}</p>
                                    <div className="flex items-center mt-3 space-x-2">
                                        <Button
                                            size="sm"
                                            className="bg-accent hover:bg-accent/90 text-primary rounded-full font-semibold no-underline p-4"
                                            onClick={() => handleLikeStory(book.id, book.title)}
                                        >
                                            <HeartIcon className="h-5 w-5 mr-1" /> Collect Gem!
                                        </Button>
                                        <Link href={`/books/${book.id}`} passHref>
                                            <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-white p-4">
                                                Read Now!
                                            </Button>
                                        </Link>
                                    </div>
                                </Card>
                            ))
                        )}
                    </div>
                </section>

                {/* --- FRIENDSHIP FOREST & COLLABORATIVE PLAY --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                    {/* Friends Activity Section - Enhanced */}
                    <section className="lg:col-span-2">
                        <h2 className="text-3xl font-heading font-bold mb-6 text-primary dark:text-accent text-center">
                            What Your Friends Are Up To!
                        </h2>
                        <div className="grid grid-cols-1 gap-4">
                            {mockFriendsActivity.map(activity => (
                                <Card key={activity.id} className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-lg flex items-center gap-4 transition-transform transform hover:scale-105 border-l-4 border-primary">
                                    <UserGroupIcon className="h-10 w-10 text-primary dark:text-accent flex-shrink-0" />
                                    <div className="flex-grow">
                                        <p className="text-lg font-body font-semibold">{activity.name} <span className="text-gray-600 dark:text-gray-300 font-normal text-base">{activity.activity}</span></p>
                                        {activity.commentSnippet && (
                                            <p className="text-sm text-gray-500 dark:text-gray-400 italic flex items-center mt-1">
                                                <ChatBubbleOvalLeftEllipsisIcon className="h-4 w-4 mr-1" /> {activity.commentSnippet}
                                            </p>
                                        )}
                                        {activity.link && (
                                            <Link href={activity.link} passHref>
                                                <Button variant="link" className="text-secondary hover:text-secondary/80 p-0 h-auto">
                                                    View Adventure!
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                    {activity.isCollaborating && (
                                        <Button onClick={() => handleCollaborate(activity.name)} className="bg-success hover:bg-success/90 text-white font-semibold flex-shrink-0 p-3">
                                            Team Up!
                                        </Button>
                                    )}
                                </Card>
                            ))}
                        </div>
                    </section>

                    {/* Friends List Widget - New! */}
                    <section className="lg:col-span-1">
                        <h2 className="text-3xl font-heading font-bold mb-6 text-primary dark:text-accent text-center">
                            Your Adventure Squad
                        </h2>
                        <Card className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-lg border-b-4 border-accent">
                            <ul>
                                {mockFriendsList.map(friend => (
                                    <li key={friend.id} className="flex items-center gap-3 py-2 border-b border-gray-200 dark:border-gray-600 last:border-b-0">
                                        <div className="relative">
                                            <img src={friend.avatar} alt={friend.name} className="h-10 w-10 rounded-full border-2 border-primary" />
                                            {friend.isOnline && (
                                                <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-700"></span>
                                            )}
                                        </div>
                                        <span className="font-body font-semibold text-lg flex-grow">{friend.name}</span>
                                        {friend.isOnline && (
                                            <Button onClick={() => handleChat(friend.name)} size="sm" variant="outline" className="bg-secondary/20 p-4 hover:bg-secondary/40 text-secondary border-secondary rounded-full">
                                                Chat
                                            </Button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            <Button onClick={() => handleFindFriends()} className="w-full mt-4 p-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full shadow-md">
                                Find More Friends!
                            </Button>
                        </Card>
                    </section>
                </div>

                {/* Quick Access to My Portal (Already styled, kept here for completeness) */}
                <section className="text-center mt-12">
                    <h2 className="text-3xl font-heading font-bold mb-6 text-primary dark:text-accent">
                        Ready for Your Own Epic Creation?
                    </h2>
                    <Link href="/dashboard" passHref>
                        <Button size="lg" className="bg-accent hover:bg-accent/90 text-primary p-4 font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 animate-bounce-once">
                            Go to My Portal! <ArrowRightIcon className="h-6 w-6 ml-3" />
                        </Button>
                    </Link>
                </section>
            </main>
        </div>
    );
}