// src/app/(dashboard)/books/[bookId]/edit/page.tsx
'use client';

import React from 'react'; // Ensure React is imported
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import RichTextEditor from '@/components/editor/rich-text-editor';
import ChapterNavigator from '@/components/editor/chapter-navigator';
import AISidebar from '@/components/editor/ai-sidebar';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast'; // Import toast
import LoadingSpinner from '@/components/ui/spinner';

interface Chapter {
    id: string;
    title: string;
}

interface BookData {
    id: string;
    title: string;
    content: string; // Lexical JSON string
    chapters: Chapter[]; // Use Chapter type
}

export default function BookEditPage({ params }: { params: { bookId: string  } }) {
    const router = useRouter();
    const { bookId } = params;
    const [bookData, setBookData] = useState<BookData | null>(null);
    const [editorContent, setEditorContent] = useState<string>('');
    const [currentChapterId, setCurrentChapterId] = useState<string | null>(null); // State for active chapter
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        async function fetchBook() {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay

            const mockChapters: Chapter[] = [
                { id: 'chap1', title: 'Introduction: The Unwritten Page' },
                { id: 'chap2', title: 'Chapter 1: The Whispering Woods' },
                { id: 'chap3', title: 'Chapter 2: A Glimmer of Hope' },
                { id: 'chap4', title: 'Epilogue: Beyond the Horizon' },
            ];

            const mockFetchedContent = bookId === 'new'
                ? '' // New book starts empty
                : JSON.stringify({
                    root: {
                        children: [
                            { type: 'paragraph', children: [{ text: `Welcome to editing Book ID: ${bookId}. Start writing your story here.`, type: 'text' }] },
                            { type: 'paragraph', children: [{ text: 'This is a sample paragraph with some ', type: 'text' }, { text: 'bold', type: 'text', format: 1 }, { text: ' and ', type: 'text' }, { text: 'italic', type: 'text', format: 2 }, { text: ' text.', type: 'text' }] },
                            { type: 'heading', tag: 'h2', children: [{ text: 'Chapter One: The Awakening', type: 'text' }] },
                            { type: 'paragraph', children: [{ text: 'The ancient forest whispered secrets of old magic...', type: 'text' }] },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        type: 'root',
                        version: 1,
                    },
                });

            setBookData({
                id: bookId,
                title: bookId === 'new' ? 'New Untitled Book' : `My Awesome Book ${bookId}`,
                content: mockFetchedContent,
                chapters: mockChapters,
            });
            setEditorContent(mockFetchedContent);
            setCurrentChapterId(mockChapters[0]?.id || null); // Set first chapter as active
            setIsLoading(false);
        }
        fetchBook();
    }, [bookId]);

    const handleSaveContent = async () => {
        setIsSaving(true);
        console.log('Saving content:', editorContent);
        console.log('Current active chapter:', currentChapterId); // You'd likely save content per chapter
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast.success('Book content saved successfully!');
        setIsSaving(false);

        if (bookId === 'new') {
            const newBookId = 'mock-new-book-id-123';
            router.push(`/books/${newBookId}/edit`);
        }
    };

    const handleChapterSelect = useCallback((chapterId: string) => {
        setCurrentChapterId(chapterId);
        // In a real app, you would:
        // 1. Save the current chapter's content (if unsaved changes exist)
        // 2. Fetch the content for the newly selected `chapterId` from your backend
        // 3. Update the RichTextEditor's `initialContent` prop (or use a Lexical command to load it)
        toast(`Switched to chapter: ${chapterId}`); // FIX APPLIED HERE: Changed toast.info to toast()
        console.log(`Selected chapter: ${chapterId}`);
    }, []);

    const handleAddChapter = useCallback(async () => {
        const currentChapters = bookData?.chapters || []; // Get current chapters from state
        const newChapterId = `chap${Date.now()}`; // Mock ID
        const newChapterTitle = `New Chapter ${currentChapters.length + 1}`; // FIX APPLIED HERE: Used currentChapters.length

        // Optimistic update
        const updatedChapters = [...currentChapters, { id: newChapterId, title: newChapterTitle }];
        setBookData(prev => prev ? { ...prev, chapters: updatedChapters } : null);

        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
        toast.success('New chapter added!');
        setCurrentChapterId(newChapterId); // Automatically select the new chapter

        console.log('Add new chapter triggered!');
    }, [bookData?.chapters]); // Depend on bookData.chapters to get updated length

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="flex flex-col h-[calc(100vh-120px)] p-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-heading font-bold text-primary dark:text-accent">
                    {bookData?.title}
                </h1>
                <Button className="p-4" onClick={handleSaveContent} disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Book'}
                </Button>
            </div>

            <div className="flex flex-1 overflow-hidden space-x-6">
                {/* Chapter Navigator Sidebar */}
                <div className="w-1/4 min-w-[200px] max-w-[300px] bg-gray-50 dark:bg-gray-700 rounded-lg p-4 overflow-y-auto hidden md:block">
                    <ChapterNavigator
                        chapters={bookData?.chapters || []}
                        currentChapterId={currentChapterId}
                        onChapterSelect={handleChapterSelect}
                        onAddChapter={handleAddChapter}
                    />
                </div>

                {/* Main Editor Area */}
                <div className="flex-1 flex flex-col min-w-0">
                    <RichTextEditor
                        initialContent={bookData?.content} // Note: This would need to be updated when switching chapters
                        onContentChange={setEditorContent}
                    />
                </div>

                {/* AI Assistant Sidebar */}
                <div className="w-1/4 min-w-[250px] max-w-[350px] bg-gray-50 dark:bg-gray-700 rounded-lg p-4 overflow-y-auto hidden lg:block">
                    <AISidebar editorContent={editorContent} />
                </div>
            </div>
        </div>
    );
}