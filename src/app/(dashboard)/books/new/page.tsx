// src/app/(dashboard)/books/new/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ArrowRightIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

export default function StartNewStoryPage() {
    const [title, setTitle] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const router = useRouter();

    const handleCreateStory = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) {
            toast.error('Your story needs a title, Super Creator!');
            return;
        }

        setIsCreating(true);
        toast.loading('Sparking up your new adventure...', { id: 'createStoryToast' });

        try {
            // Mock API call to create a new book entry in your backend
            // In a real app, this would be a fetch to your Next.js API route: `/api/books`
            // which interacts with your Supabase/Drizzle setup to insert a new row.
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay

            // Assume the backend returns a new book ID
            const newBookId = `story-${Date.now()}`; // Generate a unique mock ID

            toast.success('Your new story is ready! Let the adventure begin!', { id: 'createStoryToast' });

            // Redirect to the editor page for the new book
            router.push(`/books/${newBookId}/edit`);

        } catch (error) {
            console.error('Failed to create new story:', error);
            toast.error('Oh no! Something went wrong. Try again!', { id: 'createStoryToast' });
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] p-6 bg-background-light dark:bg-background-dark text-text-dark dark:text-text-light font-body">
            <Card className="w-full max-w-md p-8 rounded-2xl shadow-xl text-center bg-white dark:bg-gray-800 border-b-4 border-primary">
                <PlusCircleIcon className="h-24 w-24 mx-auto mb-6 text-primary dark:text-accent animate-bounce-slow" />
                <h1 className="text-4xl font-heading font-bold mb-4 text-primary dark:text-accent">
                    Start a New Story!
                </h1>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                    Give your amazing adventure a title. You can always change it later!
                </p>
                <form onSubmit={handleCreateStory} className="space-y-6">
                    <Input
                        type="text"
                        placeholder="Your Awesome Story Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full text-center text-lg md:text-xl p-3 rounded-full border-2 border-secondary focus:border-accent shadow-md transition-all duration-200"
                        required
                        disabled={isCreating}
                    />
                    <Button
                        type="submit"
                        className="w-full flex items-center justify-center bg-accent hover:bg-accent/90 text-primary font-semibold text-xl py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                        disabled={isCreating}
                    >
                        {isCreating ? (
                            <>
                                <span className="animate-spin mr-3">🌀</span> Creating...
                            </>
                        ) : (
                            <>
                                Let's Go! <ArrowRightIcon className="h-6 w-6 ml-3" />
                            </>
                        )}
                    </Button>
                </form>
            </Card>
        </div>
    );
}