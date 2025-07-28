// src/app/(dashboard)/books/page.tsx
'use client';

import React, {useState, useMemo, JSX} from 'react';
import Link from 'next/link';
import {
    MagnifyingGlassIcon, BookOpenIcon, CheckCircleIcon, PlayCircleIcon, PlusCircleIcon,
    PencilSquareIcon, CalendarIcon, AcademicCapIcon, BoltIcon, StarIcon, LightBulbIcon, TrophyIcon,
    MapPinIcon, ClipboardDocumentListIcon // Added MapPinIcon for milestones, Clipboard for Author's Note
} from '@heroicons/react/24/outline'; // Updated icons import
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Define types for Story - UPDATED
interface Story {
    id: string;
    title: string;
    author: string;
    status: 'draft' | 'in-progress' | 'completed' | 'published';
    lastUpdated: string; // e.g., "2025-07-20"
    wordCount: number;
    targetWordCount: number; // For progress
    coverImage: string; // URL to mock cover
    isNewDraft?: boolean;
    reads?: number; // For popularity meter (mocked reads)
    nextQuest?: string; // For in-progress/draft stories
    milestones?: number[]; // NEW: Percentage milestones achieved (e.g., [25, 50, 75])
    authorNote?: string; // NEW: Short note for drafts
}

// Mock Data for User's Stories - UPDATED
const mockUserStories: Story[] = [
    {
        id: 'story-001',
        title: 'The Mystery of the Whispering Wind',
        author: 'You',
        status: 'in-progress',
        lastUpdated: '2025-07-22',
        wordCount: 7500,
        targetWordCount: 10000,
        coverImage: 'https://via.placeholder.com/150x200/64B5F6/FFFFFF?text=Whispering+Wind',
        nextQuest: 'Write 500 more words for Chapter 5!',
        milestones: [25, 50, 75], // Achieved 25%, 50%, 75%
    },
    {
        id: 'story-002',
        title: 'Galactic Rescue Mission: Part 1',
        author: 'You',
        status: 'in-progress',
        lastUpdated: '2025-07-20',
        wordCount: 3200,
        targetWordCount: 5000,
        coverImage: 'https://via.placeholder.com/150x200/A5D6A7/FFFFFF?text=Galactic+Rescue',
        nextQuest: 'Brainstorm ideas for the alien city!',
        milestones: [25, 50], // Achieved 25%, 50%
    },
    {
        id: 'story-003',
        title: 'The Legend of the Crystal Caves',
        author: 'You',
        status: 'completed',
        lastUpdated: '2025-07-15',
        wordCount: 12000,
        targetWordCount: 12000,
        coverImage: 'https://via.placeholder.com/150x200/FFD54F/FFFFFF?text=Crystal+Caves',
    },
    {
        id: 'story-004',
        title: 'My First Robot Friend',
        author: 'You',
        status: 'published',
        lastUpdated: '2025-07-10',
        wordCount: 8000,
        targetWordCount: 8000,
        coverImage: 'https://via.placeholder.com/150x200/FFAB91/FFFFFF?text=Robot+Friend',
        reads: 1572,
    },
    {
        id: 'story-005',
        title: 'Adventures of Captain Bolt',
        author: 'You',
        status: 'draft',
        lastUpdated: '2025-07-24',
        wordCount: 150,
        targetWordCount: 500,
        coverImage: 'https://via.placeholder.com/150x200/81C784/FFFFFF?text=Captain+Bolt',
        isNewDraft: true,
        nextQuest: 'Write the first chapter (min 200 words)!',
        authorNote: 'Remember to make the villain extra sneaky!', // Added author note
        milestones: [], // No milestones yet
    },
    {
        id: 'story-006',
        title: 'The Secret Pet Shop',
        author: 'You',
        status: 'in-progress',
        lastUpdated: '2025-07-18',
        wordCount: 1200,
        targetWordCount: 3000,
        coverImage: 'https://via.placeholder.com/150x200/F0F4C3/FFFFFF?text=Secret+Pet',
        nextQuest: 'Create a new magical pet character!',
        authorNote: 'Need more ideas for magical pets. Check my notebook.', // Added author note
        milestones: [25],
    },
    {
        id: 'story-007',
        title: 'The Time-Traveling Backpack',
        author: 'You',
        status: 'published',
        lastUpdated: '2025-07-01',
        wordCount: 10500,
        targetWordCount: 10500,
        coverImage: 'https://via.placeholder.com/150x200/4A90E2/FFFFFF?text=Time+Backpack',
        reads: 9876,
    },
];

export default function MyStoryVaultPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const filteredStories = useMemo(() => {
        return mockUserStories.filter(story => {
            const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                story.author.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = filterStatus === 'all' || story.status === filterStatus;
            return matchesSearch && matchesStatus;
        });
    }, [searchTerm, filterStatus]);

    const getStatusIcon = (status: Story['status']) => {
        switch (status) {
            case 'draft': return <PencilSquareIcon className="h-5 w-5 text-gray-500" />;
            case 'in-progress': return <PlayCircleIcon className="h-5 w-5 text-primary" />;
            case 'completed': return <CheckCircleIcon className="h-5 w-5 text-success" />;
            case 'published': return <AcademicCapIcon className="h-5 w-5 text-accent" />;
            default: return <BookOpenIcon className="h-5 w-5 text-gray-500" />;
        }
    };

    const getStatusColor = (status: Story['status']) => {
        switch (status) {
            case 'draft': return 'border-gray-400';
            case 'in-progress': return 'border-primary';
            case 'completed': return 'border-success';
            case 'published': return 'border-accent';
            default: return 'border-gray-300';
        }
    };

    const calculateProgress = (story: Story) => {
        if (story.status === 'completed' || story.status === 'published' || story.targetWordCount === 0) {
            return 100;
        }
        return Math.min(100, (story.wordCount / story.targetWordCount) * 100);
    };

    const storiesByStatus = useMemo(() => {
        const categories: { [key: string]: Story[] } = {
            newDrafts: [],
            inProgress: [],
            completed: [],
            published: [],
        };
        filteredStories.forEach(story => {
            if (story.isNewDraft) {
                categories.newDrafts.push(story);
            } else if (story.status === 'in-progress' || story.status === 'draft') {
                categories.inProgress.push(story);
            } else if (story.status === 'completed') {
                categories.completed.push(story);
            } else if (story.status === 'published') {
                categories.published.push(story);
            }
        });
        return categories;
    }, [filteredStories]);


    return (
        <div className="p-6 bg-background-light dark:bg-background-dark rounded-xl shadow-xl min-h-[calc(100vh-160px)]">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-8 text-primary dark:text-accent text-center">
                My Story Vault
            </h1>

            {/* Search and Filter */}
            <div className="mb-10 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex flex-col md:flex-row items-center gap-4 border-b-4 border-secondary">
                <div className="relative flex-grow w-full">
                    <Input
                        type="text"
                        placeholder="Find your story by title or author..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full rounded-full border-2 border-primary focus:border-accent text-lg"
                    />
                    <MagnifyingGlassIcon className="h-6 w-6 absolute left-3 top-1/2 -translate-y-1/2 text-primary dark:text-accent" />
                </div>
                <div className="w-full md:w-auto">
                    <Select onValueChange={setFilterStatus} defaultValue={filterStatus}>
                        <SelectTrigger className="w-full px-4 py-2 rounded-full border-2 border-primary bg-background-light dark:bg-gray-700 text-text-dark dark:text-text-light text-lg">
                            <SelectValue placeholder="Filter by Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Stories</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="draft">New Drafts (Unpublished)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Story List Sections */}

            {/* New Sparks (New Drafts) */}
            {storiesByStatus.newDrafts.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-3xl font-heading font-bold mb-6 text-primary dark:text-accent text-center">
                        ✨ New Sparks (Let's Get Started!) ✨
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {storiesByStatus.newDrafts.map(story => (
                            <StoryCard key={story.id} story={story} getStatusIcon={getStatusIcon} getStatusColor={getStatusColor} calculateProgress={calculateProgress} />
                        ))}
                    </div>
                </section>
            )}

            {/* Adventures in Progress */}
            {storiesByStatus.inProgress.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-3xl font-heading font-bold mb-6 text-primary dark:text-accent text-center">
                        ✍️ Adventures in Progress
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {storiesByStatus.inProgress.map(story => (
                            <StoryCard key={story.id} story={story} getStatusIcon={getStatusIcon} getStatusColor={getStatusColor} calculateProgress={calculateProgress} />
                        ))}
                    </div>
                </section>
            )}

            {/* Completed Tales */}
            {storiesByStatus.completed.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-3xl font-heading font-bold mb-6 text-primary dark:text-accent text-center">
                        🎉 Completed Tales
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {storiesByStatus.completed.map(story => (
                            <StoryCard key={story.id} story={story} getStatusIcon={getStatusIcon} getStatusColor={getStatusColor} calculateProgress={calculateProgress} />
                        ))}
                    </div>
                </section>
            )}

            {/* Published Adventures */}
            {storiesByStatus.published.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-3xl font-heading font-bold mb-6 text-primary dark:text-accent text-center">
                        🚀 Published Adventures!
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {storiesByStatus.published.map(story => (
                            <StoryCard key={story.id} story={story} getStatusIcon={getStatusIcon} getStatusColor={getStatusColor} calculateProgress={calculateProgress} />
                        ))}
                    </div>
                </section>
            )}

            {/* No Stories Message */}
            {filteredStories.length === 0 && (
                <div className="text-center p-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-b-4 border-accent">
                    <BookOpenIcon className="h-20 w-20 mx-auto text-primary opacity-60 mb-4" />
                    <p className="text-xl font-heading font-semibold text-text-dark dark:text-text-light mb-4">
                        Looks like your Story Vault is empty!
                    </p>
                    <Link href="/books/new" passHref>
                        <Button size="lg" className="bg-accent hover:bg-accent/90 text-primary font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
                            Start Your First Adventure! <PlusCircleIcon className="h-5 w-5 ml-2" />
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}

// StoryCard Component (Nested for simplicity in this example) - UPDATED
interface StoryCardProps {
    story: Story;
    getStatusIcon: (status: Story['status']) => JSX.Element;
    getStatusColor: (status: Story['status']) => string;
    calculateProgress: (story: Story) => number;
}

function StoryCard({ story, getStatusIcon, getStatusColor, calculateProgress }: StoryCardProps) {
    const progress = calculateProgress(story);
    const statusColorClass = getStatusColor(story.status);
    const statusIcon = getStatusIcon(story.status);

    return (
        <Card className={`relative p-4 bg-white dark:bg-gray-700 rounded-lg shadow-lg flex flex-col items-center text-center transition-transform transform hover:scale-105 border-b-4 ${statusColorClass} overflow-hidden`}>
            <div className="absolute top-2 right-2 p-1 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-sm text-sm">
                {statusIcon}
            </div>
            <img src={story.coverImage} alt={story.title} className="w-28 h-36 object-cover rounded-md mb-3 border-2 border-primary" />
            <h3 className="text-lg font-heading font-semibold text-primary dark:text-accent mb-1">{story.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">by {story.author}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Last Updated: {story.lastUpdated}</p>

            {/* Conditional Display for Progress/Quest or Popularity */}
            {(story.status === 'in-progress' || story.status === 'draft') ? (
                <div className="w-full mt-3 mb-2">
                    {/* Progress Bar */}
                    <div className="text-xs font-body text-gray-600 dark:text-gray-400 mb-1">Progress: {progress.toFixed(0)}%</div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-success rounded-full"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    {/* Next Quest & Author's Note */}
                    {(story.nextQuest || story.authorNote) && (
                        <div className="text-sm font-body mt-2 p-2 bg-background-offset-light dark:bg-background-offset-dark rounded-md border border-gray-200 dark:border-gray-600">
                            {story.nextQuest && (
                                <p className="font-semibold text-primary dark:text-accent flex items-center mb-1">
                                    <LightBulbIcon className="h-4 w-4 mr-1 flex-shrink-0" /> Next Quest: <span className="ml-1 text-gray-700 dark:text-gray-300 font-normal">{story.nextQuest}</span>
                                </p>
                            )}
                            {story.authorNote && (
                                <p className="text-gray-600 dark:text-gray-400 italic flex items-center mt-1">
                                    <ClipboardDocumentListIcon className="h-4 w-4 mr-1 flex-shrink-0" /> Note: <span className="ml-1">{story.authorNote}</span>
                                </p>
                            )}
                        </div>
                    )}
                    {/* If no quest or note, add a spacer for consistent height */}
                    {!story.nextQuest && !story.authorNote && <div className="h-10"></div>}
                </div>
            ) : (story.status === 'published') && story.reads !== undefined ? (
                <div className="w-full mt-3 mb-2 flex items-center justify-center gap-2 text-primary dark:text-accent">
                    <TrophyIcon className="h-5 w-5 animate-pulse-fast" />
                    <span className="text-base font-heading font-bold">{story.reads.toLocaleString()} Reads!</span>
                </div>
            ) : (
                <div className="h-16 mt-3 mb-2"></div> /* Increased spacer height for consistency */
            )}

            {/* Action Buttons */}
            <Link href={`/books/${story.id}/edit`} passHref>
                <Button size="sm" className="mt-4 bg-secondary hover:bg-secondary/90 text-white rounded-full font-semibold px-4">
                    {story.status === 'published' ? 'View Book' : (story.status === 'completed' ? 'Celebrate!' : 'Continue Writing')}
                </Button>
            </Link>
        </Card>
    );
}