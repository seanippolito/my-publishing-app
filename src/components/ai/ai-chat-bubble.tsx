// src/components/ai/ai-chat-bubble.tsx
'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
    SparklesIcon, XMarkIcon, PaperAirplaneIcon, BookOpenIcon, PaintBrushIcon, ChatBubbleLeftRightIcon, LightBulbIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '@/components/ui/spinner';
import { cn } from '@/lib/utils'; // For conditional classnames

type AIOutput = { type: 'text'; content: string } | { type: 'image'; url: string; alt: string };
type AIChatMessage = { role: 'user' | 'ai'; content: string | AIOutput };

export default function AIChatBubble() {
    const [isOpen, setIsOpen] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState<AIChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null); // To auto-scroll chat

    // Auto-scroll to bottom of chat
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleToggleChat = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    const handleSendMessage = useCallback(async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!prompt.trim() || isLoading) return;

        const userMessage: AIChatMessage = { role: 'user', content: prompt };
        setMessages(prev => [...prev, userMessage]);
        setPrompt(''); // Clear input immediately

        setIsLoading(true);
        toast.loading('Thinking of magic...', { id: 'aiChatToast' });

        try {
            // --- Mock AI API Call ---
            await new Promise(resolve => setTimeout(resolve, 2500)); // Simulate AI processing

            let aiResponseContent: AIOutput;
            const lowerCasePrompt = prompt.toLowerCase();

            if (lowerCasePrompt.includes('idea') || lowerCasePrompt.includes('story start')) {
                aiResponseContent = { type: 'text', content: "How about a story where a brave little firefly has to light up the whole forest because the moon went on vacation? What kind of friends does it meet?" };
            } else if (lowerCasePrompt.includes('character') || lowerCasePrompt.includes('hero')) {
                aiResponseContent = { type: 'text', content: "Imagine a hero who is super clumsy but has a magic backpack that always has exactly what they need! What's their favorite snack?" };
            } else if (lowerCasePrompt.includes('draw') || lowerCasePrompt.includes('picture') || lowerCasePrompt.includes('art')) {
                aiResponseContent = { type: 'image', url: `https://picsum.photos/seed/${Math.random()}/200/150`, alt: "A magical creature in a colorful forest." };
            } else if (lowerCasePrompt.includes('translate')) {
                aiResponseContent = { type: 'text', content: "Okay, I can translate! What phrase do you want to turn into a secret language?" };
            }
            else {
                aiResponseContent = { type: 'text', content: "That's a super question! I'm still learning, but how about this: [AI-generated response based on a general knowledge base or creative prompt]." };
            }

            setMessages(prev => [...prev, { role: 'ai', content: aiResponseContent }]);
            toast.success('Magic done!', { id: 'aiChatToast' });

        } catch (error) {
            console.error('AI Chat Error:', error);
            setMessages(prev => [...prev, { role: 'ai', content: { type: 'text', content: "Uh oh! My magic fizzled out. Can you try asking again?" } }]);
            toast.error('Magic fizzled out!', { id: 'aiChatToast' });
        } finally {
            setIsLoading(false);
        }
    }, [prompt, isLoading]);

    return (
        <>
            {/* Floating Bubble Button */}
            {!isOpen && (
                <Button
                    onClick={handleToggleChat}
                    // UPDATED CLASSES HERE: bottom-6, left-1/2, -translate-x-1/2 for horizontal centering
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 p-4 rounded-full shadow-2xl bg-accent hover:bg-accent/90 text-primary transition-all duration-300 transform hover:scale-110 animate-bounce-slow"
                    aria-label="Open AI Assistant"
                >
                    <input className="h-60 w-100 p-6 rounded-full"/>
                    <SparklesIcon className="h-10 w-10" />
                </Button>
            )}

            {/* Expanded AI Chat Panel */}
            <Card
                className={cn(
                    // Panel remains snapped to bottom-right
                    "fixed bottom-0 right-0 z-50 flex flex-col h-[calc(100vh-120px)] w-full max-w-sm bg-background-light dark:bg-background-dark shadow-2xl rounded-tl-2xl transform transition-transform duration-500 ease-out-back border-l-4 border-primary dark:border-accent",
                    isOpen ? 'translate-x-0' : 'translate-x-full' // Slide in/out from right
                )}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 bg-primary text-white rounded-tl-2xl shadow-md">
                    <div className="flex items-center gap-2">
                        <SparklesIcon className="h-8 w-8 text-accent animate-pulse-fast" />
                        <h2 className="text-xl font-heading font-bold text-accent">Creathor AI Pal</h2>
                    </div>
                    <Button
                        onClick={handleToggleChat}
                        variant="ghost"
                        size="icon"
                        className="text-white hover:text-accent hover:bg-white/20"
                        aria-label="Close AI Assistant"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </Button>
                </div>

                {/* Chat Messages Area */}
                <div className="flex-1 p-4 overflow-y-auto custom-scrollbar flex flex-col space-y-4">
                    {messages.length === 0 && (
                        <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
                            <SparklesIcon className="h-16 w-16 mx-auto text-primary opacity-50 mb-3" />
                            <p className="font-body text-lg">Ask me anything about your story!</p>
                            <p className="text-sm">Try "Give me an idea," "Describe a character," or "Draw a dragon!"</p>
                        </div>
                    )}

                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={cn(
                                "max-w-[80%] p-3 rounded-lg shadow-sm",
                                msg.role === 'user'
                                    ? 'self-end bg-secondary text-primary rounded-br-none'
                                    : 'self-start bg-background-offset-light dark:bg-gray-700 text-text-dark dark:text-text-light rounded-bl-none'
                            )}
                        >
                            {typeof msg.content === 'string' ? (
                                <p className="text-sm font-body whitespace-pre-wrap">{msg.content}</p>
                            ) : (
                                msg.content.type === 'text' ? (
                                    <p className="text-sm font-body whitespace-pre-wrap">{msg.content.content}</p>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <img src={msg.content.url} alt={msg.content.alt} className="max-w-full h-auto rounded-md mb-2 border-2 border-primary" />
                                        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">{msg.content.alt}</p>
                                    </div>
                                )
                            )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="self-start p-3 rounded-lg bg-background-offset-light dark:bg-gray-700 rounded-bl-none flex items-center">
                            <LoadingSpinner />
                            <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">Thinking...</span>
                        </div>
                    )}
                    <div ref={chatEndRef} /> {/* Scroll target */}
                </div>

                {/* Input Area */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700 flex gap-2">
                    <Textarea
                        placeholder="Ask your AI Pal..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        rows={1}
                        className="flex-1 resize-none rounded-full p-3 text-sm focus:ring-accent border-primary"
                        disabled={isLoading}
                    />
                    <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90 text-white rounded-full transition-all duration-200 transform hover:scale-110" disabled={isLoading}>
                        <PaperAirplaneIcon className="h-6 w-6" />
                    </Button>
                </form>
            </Card>
        </>
    );
}