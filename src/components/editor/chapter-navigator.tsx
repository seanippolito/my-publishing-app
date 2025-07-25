// src/components/editor/chapter-navigator.tsx
'use client';

import React from 'react';
import { PlusIcon, BookOpenIcon, CheckIcon } from '@heroicons/react/24/outline'; // Using Heroicons for icons
import { Button } from '@/components/ui/button';

// Define the type for a single chapter
interface Chapter {
    id: string;
    title: string;
    // You could extend this with `parentId` for nested chapters, `order`, etc.
}

interface ChapterNavigatorProps {
    chapters: Chapter[];
    currentChapterId: string | null; // ID of the chapter currently being edited/viewed
    onChapterSelect?: (chapterId: string) => void;
    onAddChapter?: () => void; // Callback for adding a new chapter
}

export default function ChapterNavigator({
                                             chapters,
                                             currentChapterId,
                                             onChapterSelect,
                                             onAddChapter,
                                         }: ChapterNavigatorProps) {
    return (
        <div className="flex flex-col h-full overflow-hidden">
            <h2 className="text-xl font-heading font-semibold mb-4 text-text-dark dark:text-text-light">
                Chapters
            </h2>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar"> {/* Added custom-scrollbar for better aesthetics */}
                <nav>
                    <ul>
                        {chapters.length === 0 ? (
                            <li className="text-gray-500 dark:text-gray-400 text-sm italic">
                                No chapters yet. Click Add Chapter to begin!
                            </li>
                        ) : (
                            chapters.map((chapter) => (
                                <li key={chapter.id} className="mb-2">
                                    <button
                                        onClick={() => onChapterSelect && onChapterSelect(chapter.id)}
                                        className={`flex items-center w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                                            chapter.id === currentChapterId
                                                ? 'bg-primary text-white shadow-md'
                                                : 'hover:bg-gray-200 dark:hover:bg-gray-600 text-text-dark dark:text-text-light'
                                        }`}
                                    >
                                        {chapter.id === currentChapterId ? (
                                            <CheckIcon className="h-5 w-5 mr-2 text-white" />
                                        ) : (
                                            <BookOpenIcon className="h-5 w-5 mr-2 text-primary dark:text-accent" />
                                        )}
                                        <span className="font-body text-md truncate">{chapter.title}</span>
                                    </button>
                                </li>
                            ))
                        )}
                    </ul>
                </nav>
            </div>

            <div className="mt-6">
                <Button
                    onClick={onAddChapter}
                    className="p-4 w-full flex items-center justify-center bg-accent hover:bg-accent/90 text-white"
                >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add Chapter
                </Button>
            </div>
        </div>
    );
}