// src/app/(dashboard)/community/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
    MagnifyingGlassIcon, BookOpenIcon, UserGroupIcon, HeartIcon, PlusCircleIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    TrophyIcon, SparklesIcon, ShareIcon, PlayCircleIcon,
    HandRaisedIcon, MegaphoneIcon, FireIcon, CheckBadgeIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'react-hot-toast';
import {MessageSquareTextIcon} from "lucide-react";

// Mock Data (re-used from signed-in-home-page for consistency)
const mockFriendsActivity = [
    { id: 'activity1', name: 'Zoe Zest', activity: 'just published "The Sky-High City"', type: 'published', link: '/books/friend1-book', commentSnippet: 'Amazing story, loved the ending! So many twists!', avatar: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=zoe' },
    { id: 'activity2', name: 'Max Marvel', activity: 'is reading "Mystery of the Whispering Woods"', type: 'reading', link: '/books/book1', commentSnippet: null, isCollaborating: true, avatar: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=max' },
    { id: 'activity3', name: 'Lily Learn', activity: 'started "Journey to the Moon"', type: 'writing', link: '/books/friend3-book', commentSnippet: 'Such a creative beginning!', avatar: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=lily' },
    { id: 'activity4', name: 'Sam Story', activity: 'is online now!', type: 'online', link: null, avatar: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=sam' },
    { id: 'activity5', name: 'Astro Ava', activity: 'commented on "The Great Space Race"', type: 'commented', link: '/books/space-race', commentSnippet: 'Your characters are out of this world!', avatar: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=ava' },
];

const mockFriendsList = [
    { id: 'friendA', name: 'Sparky Sue', isOnline: true, avatar: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=sparky' },
    { id: 'friendB', name: 'Quill Qwen', isOnline: false, avatar: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=quill' },
    { id: 'friendC', name: 'Rhyme Riley', isOnline: true, avatar: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=rhyme' },
    { id: 'friendD', name: 'Ink Isabelle', isOnline: true, avatar: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=isabelle' },
    { id: 'friendE', name: 'Page Penny', isOnline: true, avatar: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=penny' },
    { id: 'friendF', name: 'Story Stephen', isOnline: false, avatar: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=stephen' },
];

// Mock User Profiles (for step 1: Friend Profiles)
interface UserProfile {
    id: string;
    name: string;
    avatar: string;
    bio: string;
    publishedStories: { id: string; title: string; cover: string }[];
    inProgressStories: { id: string; title: string; cover: string; progress: number }[];
    badges: string[]; // Mock badge names
}

const mockUserProfiles: UserProfile[] = [
    {
        id: 'user1',
        name: 'You (Current User)',
        avatar: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=your_seed',
        bio: 'An aspiring author who loves space adventures and magical creatures!',
        publishedStories: [
            { id: 'story-004', title: 'My First Robot Friend', cover: 'https://via.placeholder.com/100x130/FFAB91/FFFFFF?text=Robot' },
            { id: 'story-007', title: 'The Time-Traveling Backpack', cover: 'https://via.placeholder.com/100x130/4A90E2/FFFFFF?text=Time' },
        ],
        inProgressStories: [
            { id: 'story-001', title: 'The Mystery of the Whispering Wind', cover: 'https://via.placeholder.com/100x130/64B5F6/FFFFFF?text=Wind', progress: 75 },
        ],
        badges: ['First Published', 'Word Master', 'Adventure Seeker'],
    },
    {
        id: 'friendA',
        name: 'Sparky Sue',
        avatar: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=sparky',
        bio: 'Loves writing about dragons and mysterious quests! Aspiring to be a master storyteller.',
        publishedStories: [
            { id: 'story-sparky1', title: 'Dragon Rider\'s First Flight', cover: 'https://via.placeholder.com/100x130/FFD54F/FFFFFF?text=Dragon' },
        ],
        inProgressStories: [
            { id: 'story-sparky2', title: 'The Secret of the Glowing Cave', cover: 'https://via.placeholder.com/100x130/A5D6A7/FFFFFF?text=Cave', progress: 50 },
        ],
        badges: ['First Published', 'Fantasy Fanatic'],
    },
    {
        id: 'friendB',
        name: 'Quill Qwen',
        avatar: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=quill',
        bio: 'Writing about all kinds of creatures!',
        publishedStories: [],
        inProgressStories: [
            { id: 'story-quill1', title: 'The Talking Tree', cover: 'https://via.placeholder.com/100x130/64B5F6/FFFFFF?text=Tree', progress: 30 },
        ],
        badges: ['New Explorer'],
    },
];

// NEW MOCK DATA for Collaborative Story Circles/Guilds
interface StoryCircle {
    id: string;
    name: string;
    members: { id: string; name: string; avatar: string }[];
    activeStory: string;
    progress: number;
}

const mockStoryCircles: StoryCircle[] = [
    {
        id: 'circle1',
        name: 'The Creative Crew',
        members: [
            { id: 'user1', name: 'You', avatar: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=your_seed' },
            { id: 'friendA', name: 'Sparky Sue', avatar: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=sparky' },
            { id: 'friendC', name: 'Rhyme Riley', avatar: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=rhyme' },
        ],
        activeStory: 'Quest for the Rainbow Gem',
        progress: 60,
    },
    {
        id: 'circle2',
        name: 'Galaxy Explorers',
        members: [
            { id: 'user1', name: 'You', avatar: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=your_seed' },
            { id: 'friendB', name: 'Quill Qwen', avatar: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=quill' },
            { id: 'friendE', name: 'Page Penny', avatar: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=penny' },
        ],
        activeStory: 'Journey to Planet Zoog',
        progress: 25,
    },
];

// NEW MOCK DATA for Story Exchange / Read-Aloud Campfire
interface StoryExchangeItem {
    id: string;
    storyTitle: string;
    authorName: string;
    type: 'review_request' | 'read_aloud';
    status: 'pending' | 'completed';
    link: string; // Link to story or review page
}

const mockStoryExchange: StoryExchangeItem[] = [
    { id: 'exchange1', storyTitle: 'The Whispering River', authorName: 'Zoe Zest', type: 'review_request', status: 'pending', link: '/books/review/whispering-river' },
    { id: 'exchange2', storyTitle: 'My Magical Treehouse', authorName: 'Max Marvel', type: 'read_aloud', status: 'pending', link: '/books/read-aloud/treehouse' },
    { id: 'exchange3', storyTitle: 'Secret of the Lost Key', authorName: 'Sparky Sue', type: 'review_request', status: 'completed', link: '/books/review/lost-key' },
];

// NEW MOCK DATA for Quest Board
interface CommunityQuest {
    id: string;
    title: string;
    description: string;
    reward: string; // e.g., "100 XP", "New Badge"
    status: 'active' | 'completed';
    link?: string; // Link to a specific writing prompt
    isHot?: boolean;
}

const mockCommunityQuests: CommunityQuest[] = [
    {
        id: 'quest1',
        title: 'Mystery Challenge: Who Stole the Moon Cheese?',
        description: 'Write a short story (min 500 words) about a space detective solving the case of the missing moon cheese!',
        reward: 'Mystery Solver Badge + 200 XP',
        status: 'active',
        link: '/ai-tools', // Link to AI tools for inspiration
        isHot: true,
    },
    {
        id: 'quest2',
        title: 'Friendship Forest Poem',
        description: 'Write a poem about friendship and adventure in the forest. Share it with your Story Circle!',
        reward: 'Poetry Star Badge + 150 XP',
        status: 'active',
        link: '/ai-tools',
    },
    {
        id: 'quest3',
        title: 'First Chapter Hero!',
        description: 'Complete the first chapter of any new story. Show us your amazing start!',
        reward: 'Chapter Champion Badge + 100 XP',
        status: 'completed',
    },
];


export default function FriendshipForestPage() {
    const [activeProfileId, setActiveProfileId] = useState<string | null>('user1'); // Default to current user's profile
    const activeProfile = useMemo(() => mockUserProfiles.find(p => p.id === activeProfileId), [activeProfileId]);

    const handleFollow = (profileName: string) => {
        toast.success(`You're now following ${profileName}'s adventures!`);
    };

    const handleGiveFeedback = (storyTitle: string) => {
        toast(`Ready to leave feedback for "${storyTitle}"! (Opens feedback editor)`);
    };

    const handleCollaborate = (friendName: string) => {
        toast(`Collaboration request sent to ${friendName}!`);
    };

    const handleJoinCircle = (circleName: string) => {
        toast.success(`You've joined ${circleName}! Welcome to the team!`);
    };

    const handleAcceptExchange = (exchangeId: string, type: string, storyTitle: string) => {
        toast.success(`Accepted ${type} for "${storyTitle}"! Let's go!`);
        // In a real app, update status in backend, open relevant editor/read-aloud page
    };

    const handleAcceptQuest = (questTitle: string) => {
        toast.success(`Quest Accepted! "${questTitle}" - Good luck, hero!`);
        // In a real app, track user's quest progress
    };


    return (
        <div className="p-6 bg-background-light dark:bg-background-dark rounded-xl shadow-xl min-h-[calc(100vh-160px)]">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-8 text-primary dark:text-accent text-center">
                The Friendship Forest
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Column: Friends List & Activity Feed */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Your Adventure Squad (Friends List) */}
                    <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border-b-4 border-secondary">
                        <h2 className="text-2xl font-heading font-bold mb-6 text-primary dark:text-accent text-center">
                            Your Adventure Squad
                        </h2>
                        <ul>
                            {mockFriendsList.map(friend => (
                                <li key={friend.id} className="flex items-center gap-3 py-2 border-b border-gray-200 dark:border-gray-600 last:border-b-0 cursor-pointer hover:bg-background-offset-light dark:hover:bg-gray-700 rounded-lg px-2 transition-colors"
                                    onClick={() => setActiveProfileId(friend.id)}>
                                    <div className="relative">
                                        <img src={friend.avatar} alt={friend.name} className="h-10 w-10 rounded-full border-2 border-primary" />
                                        {friend.isOnline && (
                                            <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-success ring-2 ring-white dark:ring-gray-700"></span>
                                        )}
                                    </div>
                                    <span className="font-body font-semibold text-lg flex-grow">{friend.name}</span>
                                    {friend.isOnline && (
                                        <Button size="sm" variant="outline" className="bg-secondary/20 hover:bg-secondary/40 text-secondary border-secondary rounded-full">
                                            Chat
                                        </Button>
                                    )}
                                </li>
                            ))}
                        </ul>
                        <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full shadow-md">
                            Find More Friends!
                        </Button>
                    </section>

                    {/* What Your Friends Are Up To! (Activity Feed) */}
                    <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border-b-4 border-primary">
                        <h2 className="text-2xl font-heading font-bold mb-6 text-primary dark:text-accent text-center">
                            What Your Friends Are Up To!
                        </h2>
                        <div className="space-y-4">
                            {mockFriendsActivity.map(activity => (
                                <Card key={activity.id} className="p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm flex items-start gap-3 border-l-4 border-accent">
                                    <img src={activity.avatar} alt={activity.name} className="h-10 w-10 rounded-full border-2 border-secondary flex-shrink-0" />
                                    <div className="flex-grow">
                                        <p className="text-base font-body font-semibold text-text-dark dark:text-text-light">{activity.name} <span className="text-gray-600 dark:text-gray-300 font-normal text-sm">{activity.activity}</span></p>
                                        {activity.commentSnippet && (
                                            <p className="text-xs text-gray-500 dark:text-gray-400 italic flex items-center mt-1">
                                                <ChatBubbleOvalLeftEllipsisIcon className="h-4 w-4 mr-1 flex-shrink-0" /> "{activity.commentSnippet}"
                                            </p>
                                        )}
                                        <div className="flex items-center mt-2 gap-2">
                                            {activity.link && (
                                                <Link href={activity.link} passHref>
                                                    <Button variant="link" className="text-secondary hover:text-secondary/80 p-0 h-auto text-sm">
                                                        View Adventure!
                                                    </Button>
                                                </Link>
                                            )}
                                            {activity.type === 'published' && (
                                                <Button onClick={() => handleGiveFeedback(activity.activity.replace('just published ', ''))} size="sm" variant="outline" className="bg-accent/20 hover:bg-accent/40 text-accent border-accent rounded-full text-xs">
                                                    Give Feedback
                                                </Button>
                                            )}
                                            {activity.isCollaborating && (
                                                <Button onClick={() => handleCollaborate(activity.name)} size="sm" className="bg-success hover:bg-success/90 text-white rounded-full text-xs">
                                                    Team Up!
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column: Friend Profile / Feedback Garden */}
                <div className="lg:col-span-3 space-y-8">
                    {activeProfile ? (
                        <section className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border-b-4 border-accent">
                            {/* Profile Header */}
                            <div className="flex items-center gap-6 mb-8 border-b border-gray-200 dark:border-gray-700 pb-6">
                                <img src={activeProfile.avatar} alt={activeProfile.name} className="h-24 w-24 rounded-full border-4 border-primary shadow-md" />
                                <div className="flex-grow">
                                    <h2 className="text-4xl font-heading font-bold text-primary dark:text-accent">{activeProfile.name}'s Treehouse</h2>
                                    <p className="text-lg text-gray-600 dark:text-gray-300 italic mt-1">{activeProfile.bio}</p>
                                </div>
                                {activeProfile.id !== 'user1' && ( // Don't show follow for self
                                    <Button onClick={() => handleFollow(activeProfile.name)} className="bg-accent hover:bg-accent/90 text-primary font-semibold rounded-full shadow-md">
                                        <HeartIcon className="h-5 w-5 mr-2" /> Follow
                                    </Button>
                                )}
                                {activeProfile.id === 'user1' && ( // Only show edit for self
                                    <Button className="bg-secondary hover:bg-secondary/90 text-white font-semibold rounded-full shadow-md">
                                        <ShareIcon className="h-5 w-5 mr-2" /> Share My Profile
                                    </Button>
                                )}
                            </div>

                            {/* Badges/Achievements */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-heading font-bold mb-4 text-primary dark:text-accent flex items-center gap-2">
                                    <TrophyIcon className="h-7 w-7" /> Achievement Garden
                                </h3>
                                {activeProfile.badges.length > 0 ? (
                                    <div className="flex flex-wrap gap-3">
                                        {activeProfile.badges.map(badge => (
                                            <span key={badge} className="bg-secondary text-white text-sm font-semibold px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
                        <SparklesIcon className="h-4 w-4" /> {badge}
                      </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400 italic">No achievements yet. Keep creating!</p>
                                )}
                            </div>

                            {/* Published Stories */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-heading font-bold mb-4 text-primary dark:text-accent flex items-center gap-2">
                                    <BookOpenIcon className="h-7 w-7" /> Published Adventures
                                </h3>
                                {activeProfile.publishedStories.length > 0 ? (
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {activeProfile.publishedStories.map(story => (
                                            <Card key={story.id} className="p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm flex flex-col items-center text-center border-b-2 border-accent">
                                                <img src={story.cover} alt={story.title} className="w-24 h-32 object-cover rounded-md mb-2 border-2 border-primary" />
                                                <p className="text-md font-body font-semibold text-text-dark dark:text-text-light truncate w-full">{story.title}</p>
                                                <Link href={`/books/${story.id}`} passHref>
                                                    <Button variant="link" size="sm" className="p-0 h-auto text-secondary hover:text-secondary/80">Read</Button>
                                                </Link>
                                            </Card>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400 italic">No published stories yet.</p>
                                )}
                            </div>

                            {/* In-Progress Stories */}
                            <div>
                                <h3 className="text-2xl font-heading font-bold mb-4 text-primary dark:text-accent flex items-center gap-2">
                                    <PlayCircleIcon className="h-7 w-7" /> Stories in the Works
                                </h3>
                                {activeProfile.inProgressStories.length > 0 ? (
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {activeProfile.inProgressStories.map(story => (
                                            <Card key={story.id} className="p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm flex flex-col items-center text-center border-b-2 border-primary">
                                                <img src={story.cover} alt={story.title} className="w-24 h-32 object-cover rounded-md mb-2 border-2 border-secondary" />
                                                <p className="text-md font-body font-semibold text-text-dark dark:text-text-light truncate w-full">{story.title}</p>
                                                <div className="w-full mt-2">
                                                    <div className="h-1 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                                                        <div className="h-full bg-success rounded-full" style={{ width: `${story.progress}%` }}></div>
                                                    </div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{story.progress}% done</p>
                                                </div>
                                                {/* Only allow collaborating on other users' stories */}
                                                {activeProfile.id !== 'user1' && (
                                                    <Button size="sm" className="mt-2 bg-success hover:bg-success/90 text-white rounded-full">
                                                        Collaborate!
                                                    </Button>
                                                )}
                                            </Card>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400 italic">No stories in progress.</p>
                                )}
                            </div>
                        </section>
                    ) : (
                        <div className="text-center p-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-b-4 border-accent">
                            <UserGroupIcon className="h-20 w-20 mx-auto text-primary opacity-60 mb-4" />
                            <p className="text-xl font-heading font-semibold text-text-dark dark:text-text-light mb-4">
                                Select a friend from your Adventure Squad to view their Treehouse!
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* NEW SECTIONS BELOW MAIN GRID */}
            {/* Collaborative Story Circles/Guilds */}
            <section className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-b-4 border-secondary">
                <h2 className="text-3xl font-heading font-bold mb-6 text-primary dark:text-accent text-center flex items-center justify-center gap-2">
                    <UserGroupIcon className="h-8 w-8" /> Collaborative Story Circles
                </h2>
                {mockStoryCircles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mockStoryCircles.map(circle => (
                            <Card key={circle.id} className="p-4 bg-background-offset-light dark:bg-gray-700 rounded-lg shadow-sm border-l-4 border-primary">
                                <h3 className="text-lg font-heading font-semibold text-primary dark:text-accent mb-2">{circle.name}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Current Story: <span className="font-semibold">{circle.activeStory}</span></p>
                                <div className="flex items-center -space-x-2 mb-3">
                                    {circle.members.map(member => (
                                        <img key={member.id} src={member.avatar} alt={member.name} className="h-8 w-8 rounded-full border-2 border-white dark:border-gray-800" title={member.name} />
                                    ))}
                                    {circle.members.length > 3 && <span className="text-sm font-semibold ml-2">+{circle.members.length - 3}</span>}
                                </div>
                                <div className="w-full mt-2 mb-3">
                                    <div className="text-xs font-body text-gray-600 dark:text-gray-400 mb-1">Progress: {circle.progress}%</div>
                                    <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                                        <div className="h-full bg-success rounded-full" style={{ width: `${circle.progress}%` }}></div>
                                    </div>
                                </div>
                                <Button onClick={() => handleJoinCircle(circle.name)} className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold rounded-full mt-2">
                                    Join Circle!
                                </Button>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 dark:text-gray-400 italic">No active Story Circles. Why not start one?</div>
                )}
                <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full shadow-md">
                    Create New Story Circle! <PlusCircleIcon className="h-5 w-5 ml-2" />
                </Button>
            </section>

            {/* "Story Exchange" or "Read-Aloud Campfire" */}
            <section className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-b-4 border-primary">
                <h2 className="text-3xl font-heading font-bold mb-6 text-primary dark:text-accent text-center flex items-center justify-center gap-2">
                    <HandRaisedIcon className="h-8 w-8" /> Story Exchange & Campfire
                </h2>
                {mockStoryExchange.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {mockStoryExchange.map(item => (
                            <Card key={item.id} className="p-4 bg-background-offset-light dark:bg-gray-700 rounded-lg shadow-sm border-l-4 border-accent flex items-center gap-4">
                                {item.type === 'review_request' ? <MessageSquareTextIcon className="h-10 w-10 text-primary flex-shrink-0" /> : <BookOpenIcon className="h-10 w-10 text-secondary flex-shrink-0" />}
                                <div className="flex-grow">
                                    <h3 className="text-lg font-body font-semibold text-text-dark dark:text-text-light">{item.storyTitle} <span className="font-normal text-gray-600 dark:text-gray-300">by {item.authorName}</span></h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                                        {item.type === 'review_request' ? 'Needs Your Awesome Feedback!' : 'Ready for a Read-Aloud!'}
                                    </p>
                                </div>
                                {item.status === 'pending' ? (
                                    <Button onClick={() => handleAcceptExchange(item.id, item.type, item.storyTitle)} className="bg-success hover:bg-success/90 text-white font-semibold rounded-full flex-shrink-0">
                                        Accept!
                                    </Button>
                                ) : (
                                    <span className="text-success text-sm font-semibold flex items-center gap-1">
                    <CheckBadgeIcon className="h-5 w-5" /> Done!
                  </span>
                                )}
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 dark:text-gray-400 italic">No pending exchanges or campfires.</div>
                )}
                <Button className="w-full mt-6 bg-accent hover:bg-accent/90 text-primary font-semibold rounded-full shadow-md">
                    Offer My Story for Exchange! <ShareIcon className="h-5 w-5 ml-2" />
                </Button>
            </section>

            {/* "Quest Board" for Community Challenges */}
            <section className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-b-4 border-accent">
                <h2 className="text-3xl font-heading font-bold mb-6 text-primary dark:text-accent text-center flex items-center justify-center gap-2">
                    <MegaphoneIcon className="h-8 w-8" /> Quest Board
                </h2>
                {mockCommunityQuests.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {mockCommunityQuests.map(quest => (
                            <Card key={quest.id} className="p-4 bg-background-offset-light dark:bg-gray-700 rounded-lg shadow-sm border-l-4 border-success">
                                <div className="flex items-center mb-2">
                                    <h3 className="text-lg font-heading font-semibold text-primary dark:text-accent flex-grow">{quest.title}</h3>
                                    {quest.isHot && <FireIcon className="h-6 w-6 text-error animate-pulse-fast ml-2" title="Hot Quest!" />}
                                    {quest.status === 'completed' && <CheckBadgeIcon className="h-6 w-6 text-success ml-2" title="Quest Completed!" />}
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{quest.description}</p>
                                <p className="text-sm font-semibold text-secondary dark:text-text-light mb-3">Reward: {quest.reward}</p>
                                {quest.status === 'active' ? (
                                    <Link href={quest.link || '#'} passHref>
                                        <Button onClick={() => handleAcceptQuest(quest.title)} className="w-full bg-primary hover:bg-primary/90 text-white font-semibold rounded-full">
                                            Accept Quest!
                                        </Button>
                                    </Link>
                                ) : (
                                    <Button className="w-full bg-gray-400 dark:bg-gray-600 text-white font-semibold rounded-full cursor-not-allowed">
                                        Quest Completed!
                                    </Button>
                                )}
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 dark:text-gray-400 italic">No new quests on the board. Check back soon!</div>
                )}
            </section>
        </div>
    );
}