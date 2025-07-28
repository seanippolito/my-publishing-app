// src/app/books/[bookId]/page.tsx
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
    ArrowLeftIcon, Bars3Icon, ChevronLeftIcon, ChevronRightIcon,
    BookOpenIcon, SparklesIcon, CheckCircleIcon, XMarkIcon // Ensure XMarkIcon is imported
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import LoadingSpinner from '@/components/ui/spinner';
import { toast } from 'react-hot-toast';
import Link from 'next/link'; // Added Link for the "Story Not Found" go home button

// --- Mock Data Structure for a Book on the Reading Page ---
interface ChapterContent {
    id: string;
    title: string;
    pages: string[]; // Each string represents a "page" of text/content
}

interface ReadingBook {
    id: string;
    title: string;
    author: string;
    chapters: ChapterContent[];
}

const mockReadingBooks: ReadingBook[] = [
    {
        id: 'book1',
        title: 'The Mystery of the Whispering Woods',
        author: 'Leo Explorer',
        chapters: [
            {
                id: 'chap1',
                title: 'Chapter 1: The Secret Map',
                pages: [
                    `In the heart of Sunny Meadow, nestled beside the Giggle-brook, lived a curious squirrel named Nutty. One breezy morning, while chasing a particularly bouncy acorn, Nutty tumbled head over tail into a hidden hollow. It wasn't just any hollow; it was a tiny cave! And inside, nestled among sparkling moss, lay an ancient, rolled-up map.`,
                    `The map was drawn on a crispy leaf, and glowed with a faint, magical light. It showed a winding path through the Whispering Woods, leading to a spot marked with a shimmering star. "A secret!" chittered Nutty, his tiny nose twitching with excitement. "A mystery to solve! But what treasure lies at the end?"`,
                    `The Whispering Woods was a place of legends, where trees told secrets in rustling leaves and wildflowers sang lullabies to sleepy bumblebees. No animal dared venture too deep, for fear of getting lost in its magical maze. But Nutty, with his brave heart and newfound map, felt a tingle of adventure in his paws. He packed his favorite berry, a shiny pebble for luck, and took a deep breath. His epic quest had just begun!`
                ],
            },
            {
                id: 'chap2',
                title: 'Chapter 2: The Talking River',
                pages: [
                    `Nutty scurried along the map's winding path. The trees around him whispered, "Who goes there?" in soft, leafy voices. Soon, he arrived at a sparkling river. But this wasn't just any river; it bubbled with tiny, friendly voices! "Hello, little traveler!" giggled the river, its water twinkling.`,
                    `"Are you the Whispering River?" asked Nutty, clutching his map. "Indeed! And you must be Nutty, the brave squirrel with the secret map!" replied the river. "Your journey is long, but full of wonders. To cross me, you must answer my riddle: What has an eye but cannot see?" Nutty thought hard. What could it be?`
                ],
            },
            {
                id: 'chap3',
                title: 'Chapter 3: The Sunstone Mountain',
                pages: [
                    `After solving the river's riddle (the answer was a needle, of course!), Nutty bounced across on a giant, bouncy lily pad. The map now pointed towards Sunstone Mountain, a towering peak that shimmered with all the colors of the rainbow. Legends said the Sunstone held the forest's oldest magic.`,
                    `The climb was tough, but Nutty was brave. He met singing birds who shared their melodies and sleepy bears who snored gentle encouragement. Finally, at the very top, he saw it: a colossal, glowing Sunstone, pulsing with warmth and light. It wasn't a treasure chest, but something far more magical.`
                ],
            },
        ],
    },
    {
        id: 'book2',
        title: 'Galactic Friendship Mission',
        author: 'Astro Ava',
        chapters: [
            {
                id: 'chap1',
                title: 'Chapter 1: The Starlight Invitation',
                pages: [
                    `In a galaxy far, far away, on a planet made entirely of bouncy jelly, lived a friendly alien named Blobby. Blobby loved to bounce! One night, a giant star twinkled extra bright, and a tiny, shimmering invitation floated down. It asked Blobby to join the Galactic Friendship Mission!`,
                    `"Woohoo!" jiggled Blobby. "A mission to make new friends across the stars!" Blobby packed a bag of bouncy snacks and hopped into their squishy spaceship, ready for a cosmic adventure.`
                ],
            },
            {
                id: 'chap2',
                title: 'Chapter 2: Meeting the Gloop-Gloop',
                pages: [
                    `Blobby's spaceship zoomed past rainbow nebulae and glittery asteroid fields. Their first stop was Planet Gloop, home of the Gloop-Gloops – aliens made of wobbly, friendly slime!`,
                    `"Gloop-gloop!" chimed a small, blue Gloop-Gloop, offering Blobby a bouncy space marshmallow. Blobby jiggled with delight. This mission was already super fun! They spent the day bouncing and sharing stories, learning about each other's planets.`
                ],
            },
        ],
    },
    {
        id: 'book3',
        title: 'Galactic Friendship Mission',
        author: 'Astro Ava',
        chapters: [
            {
                id: 'chap1',
                title: 'Chapter 1: The Starlight Invitation',
                pages: [
                    `In a galaxy far, far away, on a planet made entirely of bouncy jelly, lived a friendly alien named Blobby. Blobby loved to bounce! One night, a giant star twinkled extra bright, and a tiny, shimmering invitation floated down. It asked Blobby to join the Galactic Friendship Mission!`,
                    `"Woohoo!" jiggled Blobby. "A mission to make new friends across the stars!" Blobby packed a bag of bouncy snacks and hopped into their squishy spaceship, ready for a cosmic adventure.`
                ],
            },
            {
                id: 'chap2',
                title: 'Chapter 2: Meeting the Gloop-Gloop',
                pages: [
                    `Blobby's spaceship zoomed past rainbow nebulae and glittery asteroid fields. Their first stop was Planet Gloop, home of the Gloop-Gloops – aliens made of wobbly, friendly slime!`,
                    `"Gloop-gloop!" chimed a small, blue Gloop-Gloop, offering Blobby a bouncy space marshmallow. Blobby jiggled with delight. This mission was already super fun! They spent the day bouncing and sharing stories, learning about each other's planets.`
                ],
            },
        ],
    },
    {
        id: 'book4',
        title: 'Galactic Friendship Mission',
        author: 'Astro Ava',
        chapters: [
            {
                id: 'chap1',
                title: 'Chapter 1: The Starlight Invitation',
                pages: [
                    `In a galaxy far, far away, on a planet made entirely of bouncy jelly, lived a friendly alien named Blobby. Blobby loved to bounce! One night, a giant star twinkled extra bright, and a tiny, shimmering invitation floated down. It asked Blobby to join the Galactic Friendship Mission!`,
                    `"Woohoo!" jiggled Blobby. "A mission to make new friends across the stars!" Blobby packed a bag of bouncy snacks and hopped into their squishy spaceship, ready for a cosmic adventure.`
                ],
            },
            {
                id: 'chap2',
                title: 'Chapter 2: Meeting the Gloop-Gloop',
                pages: [
                    `Blobby's spaceship zoomed past rainbow nebulae and glittery asteroid fields. Their first stop was Planet Gloop, home of the Gloop-Gloops – aliens made of wobbly, friendly slime!`,
                    `"Gloop-gloop!" chimed a small, blue Gloop-Gloop, offering Blobby a bouncy space marshmallow. Blobby jiggled with delight. This mission was already super fun! They spent the day bouncing and sharing stories, learning about each other's planets.`
                ],
            },
        ],
    },
    {
        id: 'book5',
        title: 'Galactic Friendship Mission',
        author: 'Astro Ava',
        chapters: [
            {
                id: 'chap1',
                title: 'Chapter 1: The Starlight Invitation',
                pages: [
                    `In a galaxy far, far away, on a planet made entirely of bouncy jelly, lived a friendly alien named Blobby. Blobby loved to bounce! One night, a giant star twinkled extra bright, and a tiny, shimmering invitation floated down. It asked Blobby to join the Galactic Friendship Mission!`,
                    `"Woohoo!" jiggled Blobby. "A mission to make new friends across the stars!" Blobby packed a bag of bouncy snacks and hopped into their squishy spaceship, ready for a cosmic adventure.`
                ],
            },
            {
                id: 'chap2',
                title: 'Chapter 2: Meeting the Gloop-Gloop',
                pages: [
                    `Blobby's spaceship zoomed past rainbow nebulae and glittery asteroid fields. Their first stop was Planet Gloop, home of the Gloop-Gloops – aliens made of wobbly, friendly slime!`,
                    `"Gloop-gloop!" chimed a small, blue Gloop-Gloop, offering Blobby a bouncy space marshmallow. Blobby jiggled with delight. This mission was already super fun! They spent the day bouncing and sharing stories, learning about each other's planets.`
                ],
            },
        ],
    },
];

export default function ReadingPage({ params }: { params: { bookId: string } }) {
    const router = useRouter();
    const { bookId } = params; // bookId is string here because this is a client component

    const [book, setBook] = useState<ReadingBook | null>(null);
    const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [showChapterNav, setShowChapterNav] = useState(false); // State for chapter modal

    // Fetch book content mock
    useEffect(() => {
        setIsLoading(true);
        const fetchedBook = mockReadingBooks.find(b => b.id === bookId);
        if (fetchedBook) {
            setBook(fetchedBook);
            setIsLoading(false);
        } else {
            toast.error('Oh no! Story not found.', { id: 'bookNotFound' });
            // Redirect to a book listing or appropriate fallback
            router.push('/'); // Go back to the main signed-in homepage if signed in, or landing if signed out
            setIsLoading(false);
        }
    }, [bookId, router]);

    // Current chapter and page data
    const currentChapter = book?.chapters[currentChapterIndex];
    const currentPageContent = currentChapter?.pages[currentPageIndex];
    const totalPagesInChapter = currentChapter?.pages.length || 0;

    // Navigation handlers
    const goToNextPage = useCallback(() => {
        if (currentChapter && currentPageIndex < totalPagesInChapter - 1) {
            setCurrentPageIndex(prev => prev + 1);
        } else if (book && currentChapterIndex < book.chapters.length - 1) {
            setCurrentChapterIndex(prev => prev + 1);
            setCurrentPageIndex(0); // Go to first page of next chapter
            toast.success(`Chapter ${currentChapterIndex + 2} unlocked!`, { icon: '✨' }); // Gamified toast
        } else {
            toast('You reached the end of this amazing story!', { icon: '🎉' });
        }
    }, [book, currentChapter, currentChapterIndex, currentPageIndex, totalPagesInChapter]);

    const goToPreviousPage = useCallback(() => {
        if (currentPageIndex > 0) {
            setCurrentPageIndex(prev => prev - 1);
        } else if (currentChapterIndex > 0) {
            setCurrentChapterIndex(prev => prev - 1);
            // Go to last page of previous chapter
            const prevChapter = book?.chapters[currentChapterIndex - 1];
            setCurrentPageIndex(prevChapter ? prevChapter.pages.length - 1 : 0);
        } else {
            toast('You are at the very beginning of the story!', { icon: '📖' });
        }
    }, [book, currentChapterIndex, currentPageIndex]);

    const goToChapter = useCallback((chapterIndex: number) => {
        if (book && chapterIndex >= 0 && chapterIndex < book.chapters.length) {
            setCurrentChapterIndex(chapterIndex);
            setCurrentPageIndex(0); // Start from the first page of selected chapter
            setShowChapterNav(false); // Close modal
        }
    }, [book]);

    // Swipe detection (simplified - in a real app, use a dedicated gesture library)
    const touchStartX = useRef(0);
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const touchEndX = e.changedTouches[0].clientX;
        const swipeDistance = touchEndX - touchStartX.current;
        if (swipeDistance > 50) { // Swipe right (previous page)
            goToPreviousPage();
        } else if (swipeDistance < -50) { // Swipe left (next page)
            goToNextPage();
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-background-light dark:bg-background-dark">
                <LoadingSpinner />
            </div>
        );
    }

    if (!book) {
        return (
            <div className="text-center p-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg min-h-screen">
                <h1 className="text-4xl font-heading font-bold text-error">Story Not Found!</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">Oops! This adventure seems to have disappeared.</p>
                <Link href="/" passHref><Button className="mt-6 bg-primary hover:bg-primary/90 text-white rounded-full">Go Back Home</Button></Link>
            </div>
        );
    }

    return (
        <div className="relative flex flex-col items-center min-h-screen bg-background-light dark:bg-background-dark text-text-dark dark:text-text-light font-body overflow-hidden">
            {/* Top Bar for Navigation */}
            <header className="w-full bg-primary text-white p-4 flex justify-between items-center shadow-md z-10">
                <Button onClick={() => router.back()} variant="ghost" size="icon" className="text-white hover:text-accent">
                    <ArrowLeftIcon className="h-8 w-8" />
                </Button>
                <div className="flex-grow text-center">
                    <h2 className="text-2xl font-heading font-bold text-accent">{book.title}</h2>
                    <p className="text-sm font-body opacity-80">{currentChapter?.title || 'Loading Chapter...'}</p>
                </div>
                <Button onClick={() => setShowChapterNav(true)} variant="ghost" size="icon" className="text-white hover:text-accent">
                    <Bars3Icon className="h-8 w-8" />
                </Button>
            </header>

            {/* Main Reading Area */}
            <main
                className="relative flex-1 flex items-center justify-center w-full px-4 py-8 md:px-12 lg:px-24 xl:px-48"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <Card className="relative w-full max-w-4xl p-6 md:p-8 lg:p-10 bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col justify-between min-h-[500px]">
                    {/* Page Content */}
                    <div className="text-lg md:text-xl lg:text-2xl leading-relaxed text-text-dark dark:text-text-light overflow-y-auto custom-scrollbar flex-grow">
                        {currentPageContent ? (
                            <p className="whitespace-pre-wrap">{currentPageContent}</p>
                        ) : (
                            <div className="text-center text-gray-500 italic py-10">No content for this page.</div>
                        )}
                    </div>

                    {/* Page Navigation Controls */}
                    <div className="flex justify-between items-center mt-6">
                        <Button
                            onClick={goToPreviousPage}
                            disabled={currentChapterIndex === 0 && currentPageIndex === 0}
                            variant="outline"
                            size="icon"
                            className="bg-secondary hover:bg-secondary/90 text-white rounded-full shadow-md"
                        >
                            <ChevronLeftIcon className="h-7 w-7" />
                        </Button>
                        <span className="text-lg font-body font-semibold text-primary dark:text-accent">
              Page {currentPageIndex + 1} / {totalPagesInChapter}
                            {currentChapter && ` (Chapter ${currentChapterIndex + 1} of ${book.chapters.length})`}
            </span>
                        <Button
                            onClick={goToNextPage}
                            disabled={currentChapterIndex === book.chapters.length - 1 && currentPageIndex === totalPagesInChapter - 1}
                            variant="outline"
                            size="icon"
                            className="bg-secondary hover:bg-secondary/90 text-white rounded-full shadow-md"
                        >
                            <ChevronRightIcon className="h-7 w-7" />
                        </Button>
                    </div>
                </Card>
            </main>

            {/* Chapter Navigation Modal (Overlay) */}
            {showChapterNav && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                    <Card className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6">
                        <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-200 dark:border-gray-700">
                            <h3 className="text-2xl font-heading font-bold text-primary dark:text-accent">Chapters</h3>
                            <Button onClick={() => setShowChapterNav(false)} variant="ghost" size="icon" className="text-text-dark dark:text-text-light hover:text-error">
                                <XMarkIcon className="h-7 w-7" />
                            </Button>
                        </div>
                        <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
                            {book.chapters.map((chapter, index) => (
                                <button
                                    key={chapter.id}
                                    onClick={() => goToChapter(index)}
                                    className={`flex items-center w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                                        index === currentChapterIndex
                                            ? 'bg-primary text-white font-semibold shadow-md'
                                            : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-text-dark dark:text-text-light'
                                    }`}
                                >
                                    <BookOpenIcon className="h-5 w-5 mr-3" />
                                    Chapter {index + 1}: {chapter.title}
                                    {index === currentChapterIndex && (
                                        <CheckCircleIcon className="h-5 w-5 ml-auto text-accent" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}