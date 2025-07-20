// src/components/editor/ai-sidebar.tsx
'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { SparklesIcon, PaintBrushIcon, LanguageIcon, BookOpenIcon, MegaphoneIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea'; // Assuming you'll create a Textarea component
import { Input } from '@/components/ui/input'; // Assuming you'll create an Input component
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Assuming you'll create Select components
import { Card } from '@/components/ui/card';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '@/components/ui/spinner';

interface AISidebarProps {
    editorContent: string; // The full JSON string of the Lexical editor's content
    // In a real app, you might also pass a function like `onInsertContent(text: string)`
    // which the parent (BookEditPage) would use to update the Lexical editor via its API.
}

type AIOutput = { type: 'text'; content: string } | { type: 'image'; url: string; alt: string };

export default function AISidebar({ editorContent }: AISidebarProps) {
    const [activeTab, setActiveTab] = useState<'writing' | 'art' | 'tools'>('writing');
    const [aiPrompt, setAiPrompt] = useState<string>('');
    const [aiOutput, setAiOutput] = useState<AIOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState<string>('es'); // Default for translation

    // Mock function to simulate API calls
    const callAIAPI = useCallback(async (endpoint: string, data: any) => {
        setIsLoading(true);
        setAiOutput(null); // Clear previous output
        try {
            // In your actual Next.js app, this would be a fetch to your /api/ai/xxx routes
            // const response = await fetch(`/api/ai/${endpoint}`, {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(data),
            // });
            // if (!response.ok) throw new Error('AI API call failed');
            // const result = await response.json();

            // Mocking AI response based on endpoint
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay

            let mockResult: any = {};
            if (endpoint === 'generate-text') {
                mockResult.text = `AI Generated Idea: ${aiPrompt || 'A brave knight discovers a hidden dragon society.'} This idea could be expanded by focusing on the political intrigue within the dragon clans or the moral dilemma of the knight.`;
            } else if (endpoint === 'expand-segment') {
                mockResult.text = `Expanded content based on "${aiPrompt}":\n\n${editorContent.slice(0, 100)}... and then the story continued with unexpected twists and turns, delving deeper into the lore and character motivations. The ancient prophecy began to unfold, revealing secrets long buried beneath the forgotten ruins.`;
            } else if (endpoint === 'rewrite-passage') {
                mockResult.text = `Rewritten passage based on "${aiPrompt}":\n\n${editorContent.slice(0, 100)}... The narrative now flows with heightened tension and vivid imagery, captivating the reader's imagination from the very first sentence.`;
            } else if (endpoint === 'translate-text') {
                const textToTranslate = aiPrompt || editorContent.slice(0, 50) + '...';
                mockResult.text = `Translated (${selectedLanguage}): "El valiente caballero descubrió una sociedad secreta de dragones." (Original: "${textToTranslate}")`;
            } else if (endpoint === 'generate-cover-idea') {
                mockResult.text = `Cover Idea: A minimalist design featuring a silhouette of a lone figure against a vibrant, swirling nebula, with subtle hints of ancient runes. Color palette: deep blues, cosmic purples, and a striking golden accent.`;
                mockResult.imageUrl = 'https://via.placeholder.com/200x300/8e2de2/FFFFFF?text=AI+Cover+Mockup';
            } else if (endpoint === 'generate-image') {
                mockResult.text = `Generated image for: "${aiPrompt}"`;
                mockResult.imageUrl = `https://picsum.photos/seed/${Math.random()}/300/200`; // Random image from Picsum
            } else if (endpoint === 'check-grammar') {
                mockResult.text = `Grammar check (mock): The selected text has 3 potential grammar errors and 2 style suggestions. E.g., "It's" vs "Its", "affect" vs "effect".`;
            } else if (endpoint === 'improve-writing') {
                mockResult.text = `Writing pointers (mock): Consider using more active voice. Vary sentence structure. Show, don't tell, particularly in descriptive passages.`;
            }

            if (mockResult.imageUrl) {
                setAiOutput({ type: 'image', url: mockResult.imageUrl, alt: mockResult.text || 'AI Generated Image' });
            } else if (mockResult.text) {
                setAiOutput({ type: 'text', content: mockResult.text });
            }
            toast.success('AI response generated!');
        } catch (error) {
            console.error('AI Error:', error);
            toast.error('Failed to get AI response.');
            setAiOutput({ type: 'text', content: `Error: ${error instanceof Error ? error.message : String(error)}` });
        } finally {
            setIsLoading(false);
        }
    }, [aiPrompt, editorContent, selectedLanguage]);


    // Placeholder for inserting content into the editor.
    // In a real implementation, you'd pass a prop like `onInsertIntoEditor(text: string)`
    // from BookEditPage to this component, and that function would use Lexical's API.
    const handleInsertIntoEditor = useCallback(() => {
        if (aiOutput && aiOutput.type === 'text') {
            // This is where you'd call a prop function like `onInsertContent(aiOutput.content)`
            // to insert the text into the RichTextEditor.
            toast.success('AI text content copied! (Not actually inserted into editor yet)');
            // For now, we'll just log it and suggest copying.
            console.log('Would insert into editor:', aiOutput.content);
            navigator.clipboard.writeText(aiOutput.content)
                .then(() => toast.success('AI text copied to clipboard!'))
                .catch(() => toast.error('Failed to copy AI text.'));
        } else if (aiOutput && aiOutput.type === 'image') {
            toast.success('AI image URL copied! (Not actually inserted into editor yet)');
            console.log('Would insert into editor (image URL):', aiOutput.url);
            navigator.clipboard.writeText(aiOutput.url)
                .then(() => toast.success('AI image URL copied to clipboard!'))
                .catch(() => toast.error('Failed to copy AI image URL.'));
        }
    }, [aiOutput]);

    const editorContentSnippet = useMemo(() => {
        return editorContent ? editorContent.slice(0, 150) + '...' : 'No content in editor yet.';
    }, [editorContent]);


    return (
        <div className="flex flex-col h-full bg-bg-light dark:bg-bg-dark rounded-lg shadow-inner">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-heading font-semibold text-text-dark dark:text-text-light mb-2">
                    AI Assistant
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Supercharge your writing with generative AI.
                </p>
            </div>

            <div className="flex border-b border-gray-200 dark:border-gray-700">
                <Button
                    variant={activeTab === 'writing' ? 'secondary' : 'ghost'}
                    onClick={() => setActiveTab('writing')}
                    className="flex-1 rounded-none border-r border-gray-200 dark:border-gray-700"
                >
                    <BookOpenIcon className="h-5 w-5 mr-2" /> Writing
                </Button>
                <Button
                    variant={activeTab === 'art' ? 'secondary' : 'ghost'}
                    onClick={() => setActiveTab('art')}
                    className="flex-1 rounded-none border-r border-gray-200 dark:border-700"
                >
                    <PaintBrushIcon className="h-5 w-5 mr-2" /> Art
                </Button>
                <Button
                    variant={activeTab === 'tools' ? 'secondary' : 'ghost'}
                    onClick={() => setActiveTab('tools')}
                    className="flex-1 rounded-none"
                >
                    <SparklesIcon className="h-5 w-5 mr-2" /> Tools
                </Button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
                {isLoading && (
                    <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/70 flex items-center justify-center z-10 rounded-lg">
                        <LoadingSpinner />
                    </div>
                )}

                {/* Writing Tab */}
                {activeTab === 'writing' && (
                    <div className="space-y-4">
                        <Textarea
                            placeholder="Tell the AI what you want to write or improve (e.g., 'Generate a plot for a sci-fi novel about time travel', or 'Rewrite this paragraph to be more suspenseful')."
                            value={aiPrompt}
                            onChange={(e) => setAiPrompt(e.target.value)}
                            rows={4}
                            className="resize-y"
                        />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Current editor content snippet: {editorContentSnippet}
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                            <Button onClick={() => callAIAPI('generate-text', { prompt: aiPrompt })}>
                                Generate Idea
                            </Button>
                            <Button onClick={() => callAIAPI('expand-segment', { prompt: aiPrompt, content: editorContent })}>
                                Expand Segment
                            </Button>
                            <Button onClick={() => callAIAPI('rewrite-passage', { prompt: aiPrompt, content: editorContent })}>
                                Rewrite/Improve
                            </Button>
                            <div>
                                <Select onValueChange={setSelectedLanguage} defaultValue={selectedLanguage}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="es">Spanish</SelectItem>
                                        <SelectItem value="fr">French</SelectItem>
                                        <SelectItem value="de">German</SelectItem>
                                        <SelectItem value="zh">Chinese</SelectItem>
                                        {/* Add more languages as needed */}
                                    </SelectContent>
                                </Select>
                                <Button className="w-full mt-2" onClick={() => callAIAPI('translate-text', { text: editorContent, targetLanguage: selectedLanguage })}>
                                    Translate Text
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Art Tab */}
                {activeTab === 'art' && (
                    <div className="space-y-4">
                        <Input
                            placeholder="Describe your desired cover art or image (e.g., 'A futuristic city at sunset, cyberpunk style, neon lights')."
                            value={aiPrompt}
                            onChange={(e) => setAiPrompt(e.target.value)}
                        />
                        <div className="grid grid-cols-2 gap-2">
                            <Button onClick={() => callAIAPI('generate-cover-idea', { prompt: aiPrompt })}>
                                Generate Cover Idea
                            </Button>
                            <Button onClick={() => callAIAPI('generate-image', { prompt: aiPrompt })}>
                                Generate Image
                            </Button>
                        </div>
                    </div>
                )}

                {/* Tools Tab */}
                {activeTab === 'tools' && (
                    <div className="space-y-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Analyze your content for improvements.
                        </p>
                        <Button onClick={() => callAIAPI('check-grammar', { content: editorContent })}>
                            <CheckCircleIcon className="h-5 w-5 mr-2" /> Check Grammar & Style
                        </Button>
                        <Button onClick={() => callAIAPI('improve-writing', { content: editorContent })}>
                            <MegaphoneIcon className="h-5 w-5 mr-2" /> Give Writing Pointers
                        </Button>
                    </div>
                )}

                {/* AI Output Display */}
                {aiOutput && (
                    <Card className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 shadow-inner rounded-md">
                        <h3 className="text-lg font-heading font-semibold mb-2">AI Response:</h3>
                        {aiOutput.type === 'text' ? (
                            <p className="text-sm whitespace-pre-wrap">{aiOutput.content}</p>
                        ) : (
                            <div className="flex flex-col items-center">
                                <img src={aiOutput.url} alt={aiOutput.alt} className="max-w-full h-auto rounded-md mb-3" />
                                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">{aiOutput.alt}</p>
                            </div>
                        )}
                        <Button onClick={handleInsertIntoEditor} className="w-full mt-4 bg-accent hover:bg-accent/90">
                            Insert into Editor (Copy to Clipboard)
                        </Button>
                    </Card>
                )}
            </div>
        </div>
    );
}