// src/app/(dashboard)/ai-tools/page.tsx
'use client';

import React, { useState, useCallback, useMemo } from 'react'; // Added useMemo
import Link from 'next/link'; // Added Link for potential future use
import {
    SparklesIcon, LightBulbIcon, PaintBrushIcon, UsersIcon, BookOpenIcon, CheckCircleIcon,
    AcademicCapIcon, FireIcon, GlobeAltIcon, MapPinIcon, ClipboardDocumentListIcon,
    ChatBubbleBottomCenterTextIcon, MusicalNoteIcon, DocumentTextIcon, StarIcon // Added DocumentTextIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LoadingSpinner from '@/components/ui/spinner';
import { toast } from 'react-hot-toast';

// Define types for Story (copied from My Story Vault for consistency)
interface Story {
    id: string;
    title: string;
    author: string;
    status: 'draft' | 'in-progress' | 'completed' | 'published';
    lastUpdated: string;
    wordCount: number;
    targetWordCount: number;
    coverImage: string;
    isNewDraft?: boolean;
    reads?: number;
    nextQuest?: string;
    milestones?: number[];
    authorNote?: string;
}

// Mock Data for User's Stories (copied from My Story Vault for consistency)
// In a real app, you would fetch this from your backend/database
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
        milestones: [25, 50, 75],
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
        milestones: [25, 50],
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
        authorNote: 'Remember to make the villain extra sneaky!',
        milestones: [],
    },
    // Adding a completed and published story to show only in-progress/draft in selector
    {
        id: 'story-003', title: 'The Legend of the Crystal Caves', author: 'You', status: 'completed', lastUpdated: '2025-07-15', wordCount: 12000, targetWordCount: 12000, coverImage: 'https://via.placeholder.com/150x200/FFD54F/FFFFFF?text=Crystal+Caves',
    },
    {
        id: 'story-004', title: 'My First Robot Friend', author: 'You', status: 'published', lastUpdated: '2025-07-10', wordCount: 8000, targetWordCount: 8000, coverImage: 'https://via.placeholder.com/150x200/FFAB91/FFFFFF?text=Robot+Friend', reads: 1572,
    },
];


type AIOutput = { type: 'text'; content: string } | { type: 'image'; url: string; alt: string };

export default function AIMagicToolsPage() {
    const [activeTab, setActiveTab] = useState<'writing' | 'art' | 'gametools'>('writing');
    const [aiPrompt, setAiPrompt] = useState<string>('');
    const [aiOutput, setAiOutput] = useState<AIOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // States for specific tools
    const [challengeType, setChallengeType] = useState('genreMashup');
    const [characterTraits, setCharacterTraits] = useState('');
    const [settingKeywords, setSettingKeywords] = useState('');
    const [charADialogue, setCharADialogue] = useState('');
    const [charBDialogue, setCharBDialogue] = useState('');
    const [dialogueScenario, setDialogueScenario] = useState('');
    const [soundtrackMood, setSoundtrackMood] = useState('');

    // NEW: State for selected book to link AI suggestions to
    const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

    // Filter user's in-progress/draft stories for the selector
    const inProgressStories = useMemo(() => {
        return mockUserStories.filter(story => story.status === 'in-progress' || story.status === 'draft');
    }, []);

    // Set default selected book if available
    // useEffect(() => {
    //   if (inProgressStories.length > 0 && !selectedBookId) {
    //     setSelectedBookId(inProgressStories[0].id);
    //   }
    // }, [inProgressStories, selectedBookId]);

    // Mock AI call function
    const callAIAPI = useCallback(async (tool: string, data: any) => {
        if (!selectedBookId && (tool === 'expand-segment' || tool === 'rewrite-passage' || tool === 'check-grammar' || tool === 'translate-text' || tool === 'improve-writing')) {
            toast.error('Please select a target story first!', { id: 'selectStoryError' });
            return;
        }

        setIsLoading(true);
        setAiOutput(null);
        toast.loading(`Sparking up ${tool} magic...`, { id: 'aiToolToast' });

        try {
            await new Promise(resolve => setTimeout(resolve, 2500)); // Simulate AI processing time

            let mockResult: AIOutput;
            const targetBookTitle = selectedBookId ? `for "${inProgressStories.find(s => s.id === selectedBookId)?.title}"` : '';

            switch (tool) {
                case 'storyteller-challenge':
                    let generatedChallenge = "";
                    if (data.type === 'genreMashup') {
                        generatedChallenge = "A medieval knight uses a futuristic laser sword to fight aliens in a haunted castle!";
                    } else if (data.type === 'charSetting') {
                        generatedChallenge = "Imagine a grumpy, tiny dragon who lives in a hidden coffee shop and secretly loves making lattes for sleepy giants.";
                    } else {
                        generatedChallenge = "A magic pencil draws a portal to a world where words float in the air. What happens next?";
                    }
                    mockResult = { type: 'text', content: generatedChallenge };
                    break;
                case 'character-creator':
                    const traitDesc = data.traits || 'a magical creature';
                    mockResult = {
                        type: 'text',
                        content: `Meet ${traitDesc.split(' ')[0]} the Brave! They have ${traitDesc} and their secret power is being super good at [random skill]. What kind of adventure do they go on?`
                    };
                    break;
                case 'world-builder':
                    const setting = data.keywords || 'a mysterious island';
                    mockResult = {
                        type: 'text',
                        content: `World Details for "${setting}":\n\nThis ${setting} is surrounded by shimmering mist, guarded by ancient talking trees, and has glowing crystals that hum a secret tune. What kind of creatures live here?`
                    };
                    break;
                case 'dialogue-sparker':
                    const charA = data.charA || 'Hero';
                    const charB = data.charB || 'Villain';
                    const scenario = data.scenario || 'meeting for the first time';
                    mockResult = {
                        type: 'text',
                        content: `Dialogue Snippet for "${charA}" and "${charB}" ${scenario}:\n\n${charA}: "Whoa! Is that... your nose glowing?"\n${charB}: "Of course it is! It's how I find all the hidden cookies!"\n${charA}: "Cookies? Tell me more!"`
                    };
                    break;
                case 'story-soundtrack':
                    const mood = data.mood || 'a magical discovery';
                    mockResult = {
                        type: 'text',
                        content: `Soundtrack Idea for "${mood}":\n\nImagine soft, tinkling bells mixed with a gentle flute melody, building to a grand, sparkling crescendo. It sounds like unlocking a secret level!`
                    };
                    break;
                // Existing tools, now potentially linked to selectedBookId
                case 'story-idea':
                    mockResult = { type: 'text', content: `${aiPrompt || "A forgotten toy discovers a secret passage to a world built entirely of sweets."} ${targetBookTitle}` };
                    break;
                case 'expand-segment':
                    mockResult = { type: 'text', content: `Expanded content for "${aiPrompt || 'your text snippet'}" includes new twists, a hidden clue, and a friendly sidekick. ${targetBookTitle}` };
                    break;
                case 'rewrite-passage':
                    mockResult = { type: 'text', content: `Rewritten: "${aiPrompt || 'your passage'}" now sounds more exciting and mysterious! ${targetBookTitle}` };
                    break;
                case 'check-grammar':
                    mockResult = { type: 'text', content: `Grammar & Style Check: Found 3 grammar fixes and suggested clearer wording for 2 sentences in your text. ${targetBookTitle}` };
                    break;
                case 'translate-text':
                    mockResult = { type: 'text', content: `Translated: "${aiPrompt || 'your text'}" is now in Spanish: "¡Hola, mundo mágico!". ${targetBookTitle}` };
                    break;
                case 'improve-writing':
                    mockResult = { type: 'text', content: `Writing pointers: Consider using more active voice. Vary sentence structure. Show, don't tell. ${targetBookTitle}` };
                    break;
                case 'cover-idea':
                    mockResult = { type: 'image', url: `https://picsum.photos/seed/${Date.now()}/200/250`, alt: `Cover Idea: A fantastical creature with glowing eyes peeking out from behind a giant, sparkling mushroom in a neon forest.` };
                    break;
                case 'integrate-art':
                    mockResult = { type: 'image', url: `https://picsum.photos/seed/${Date.now() + 1}/300/200`, alt: `Art for: ${aiPrompt}` };
                    break;
                default:
                    mockResult = { type: 'text', content: "I'm not sure about that magic trick yet, Super Creator!" };
            }

            setAiOutput(mockResult);
            toast.success('Magic delivered!', { id: 'aiToolToast' });

        } catch (error) {
            console.error('AI Tool Error:', error);
            toast.error('Magic fizzled out! Try again.', { id: 'aiToolToast' });
            setAiOutput({ type: 'text', content: `Error: ${error instanceof Error ? error.message : String(error)}` });
        } finally {
            setIsLoading(false);
        }
    }, [aiPrompt, challengeType, characterTraits, settingKeywords, charADialogue, charBDialogue, dialogueScenario, soundtrackMood, selectedBookId, inProgressStories]);

    // Handle direct insertion into the book's editor
    const handleInsertIntoBook = useCallback(() => {
        if (!selectedBookId) {
            toast.error('Please select a target story first to insert content!');
            return;
        }
        if (!aiOutput) {
            toast.error('Nothing to insert! Generate AI magic first.');
            return;
        }

        // In a real application, this would:
        // 1. Send the AI output (aiOutput) to a backend API endpoint.
        // 2. The backend would then update the content of the specific chapter/book
        //    associated with `selectedBookId` in your database (Payload CMS or Supabase/Drizzle).
        // 3. For real-time updates in the editor, you might use WebSockets or re-fetch data.

        toast.success(`AI content sent to story "${inProgressStories.find(s => s.id === selectedBookId)?.title || selectedBookId}"! (Mock insertion)`);
        // Optionally, copy to clipboard as a fallback
        if (aiOutput.type === 'text') {
            navigator.clipboard.writeText(aiOutput.content);
        } else {
            navigator.clipboard.writeText(aiOutput.url);
        }
        console.log(`Mock insertion into book ${selectedBookId}:`, aiOutput);

        // After "insertion", clear output to encourage new magic
        setAiOutput(null);

    }, [selectedBookId, aiOutput, inProgressStories]);


    return (
        <div className="p-6 bg-background-light dark:bg-background-dark rounded-xl shadow-xl min-h-[calc(100vh-160px)]">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-8 text-primary dark:text-accent text-center">
                AI Magic Tools
            </h1>

            {/* Tool Category Navigation */}
            <div className="p-4 mb-10 flex justify-center bg-white dark:bg-gray-800 rounded-full shadow-lg border-b-4 border-secondary">
                <Button
                    variant={activeTab === 'writing' ? 'secondary' : 'ghost'}
                    onClick={() => { setActiveTab('writing'); setAiOutput(null); }}
                    className="flex-1 rounded-full text-lg font-semibold"
                >
                    <BookOpenIcon className="h-6 w-6 mr-2" /> Writing Magic
                </Button>
                <Button
                    variant={activeTab === 'art' ? 'secondary' : 'ghost'}
                    onClick={() => { setActiveTab('art'); setAiOutput(null); }}
                    className="flex-1 rounded-full text-lg font-semibold"
                >
                    <PaintBrushIcon className="h-6 w-6 mr-2" /> Art & Visuals
                </Button>
                <Button
                    variant={activeTab === 'gametools' ? 'secondary' : 'ghost'}
                    onClick={() => { setActiveTab('gametools'); setAiOutput(null); }}
                    className="flex-1 rounded-full text-lg font-semibold"
                >
                    <UsersIcon className="h-6 w-6 mr-2" /> Game Tools
                </Button>
            </div>

            {/* Target Book Selector (NEW SECTION) */}
            <Card className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-b-4 border-accent flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-lg font-heading font-semibold text-primary dark:text-accent">
                    <DocumentTextIcon className="h-8 w-8" />
                    Target Story:
                </div>
                <div className="flex-grow w-full md:w-auto">
                    {inProgressStories.length > 0 ? (
                        <Select onValueChange={setSelectedBookId} value={selectedBookId || ''}>
                            <SelectTrigger className="w-full rounded-full border-2 border-primary px-4 py-2">
                                <SelectValue placeholder="Choose a story to connect..." />
                            </SelectTrigger>
                            <SelectContent>
                                {inProgressStories.map(story => (
                                    <SelectItem key={story.id} value={story.id}>
                                        {story.title} ({story.status === 'draft' ? 'Draft' : 'In Progress'})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    ) : (
                        <div className="text-gray-500 dark:text-gray-400 italic text-center md:text-left">
                            No in-progress stories found. Start a new one in &#34;My Story Vault&#34;!
                        </div>
                    )}
                </div>
                {selectedBookId && (
                    <Link href={`/dashboard/books/${selectedBookId}/edit`} passHref>
                        <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-white rounded-full">
                            Go to Editor
                        </Button>
                    </Link>
                )}
            </Card>


            {/* Main Tool Content Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Tool Inputs Column */}
                <div className="space-y-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-b-4 border-primary">
                    {isLoading && (
                        <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/70 flex items-center justify-center z-10 rounded-xl">
                            <LoadingSpinner />
                        </div>
                    )}

                    {activeTab === 'writing' && (
                        <div className="space-y-8">
                            {/* Storyteller's Challenge Generator */}
                            <section>
                                <h2 className="text-2xl font-heading font-bold mb-4 text-primary dark:text-accent flex items-center gap-2">
                                    <StarIcon className="h-7 w-7" /> Storyteller&#39;s Challenge!
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">Need a fun writing challenge? Pick a type and get inspired!</p>
                                <Select onValueChange={setChallengeType} defaultValue={challengeType}>
                                    <SelectTrigger className="w-full rounded-full border-2 border-secondary px-4 py-2">
                                        <SelectValue placeholder="Choose a Challenge Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="genreMashup">Genre Mashup (e.g., Sci-Fi Pirate)</SelectItem>
                                        <SelectItem value="charSetting">Character & Setting (e.g., Grumpy Dragon in Cafe)</SelectItem>
                                        <SelectItem value="problemSolution">Problem & Solution (e.g., Magic Pencil)</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button onClick={() => callAIAPI('storyteller-challenge', { type: challengeType })} className="w-full mt-4 bg-accent hover:bg-accent/90 text-primary font-semibold rounded-full">
                                    Generate Challenge!
                                </Button>
                            </section>

                            <hr className="border-t-2 border-gray-200 dark:border-gray-700" />

                            {/* World Builder / Setting Explorer */}
                            <section>
                                <h2 className="text-2xl font-heading font-bold mb-4 text-primary dark:text-accent flex items-center gap-2">
                                    <MapPinIcon className="h-7 w-7" /> World Builder!
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">Describe a place, and AI will add magical details!</p>
                                <Textarea
                                    placeholder="e.g., 'A giant candy land', 'A city floating in clouds'"
                                    value={settingKeywords}
                                    onChange={(e) => setSettingKeywords(e.target.value)}
                                    rows={3}
                                    className="resize-y rounded-lg border-2 border-secondary"
                                />
                                <Button onClick={() => callAIAPI('world-builder', { keywords: settingKeywords })} className="w-full mt-4 bg-accent hover:bg-accent/90 text-primary font-semibold rounded-full">
                                    Explore World!
                                </Button>
                            </section>

                            <hr className="border-t-2 border-gray-200 dark:border-gray-700" />

                            {/* Dialogue Sparker */}
                            <section>
                                <h2 className="text-2xl font-heading font-bold mb-4 text-primary dark:text-accent flex items-center gap-2">
                                    <ChatBubbleBottomCenterTextIcon className="h-7 w-7" /> Dialogue Sparker!
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">Who&#39;s talking? What&#39;s happening?</p>
                                <Input
                                    type="text"
                                    placeholder="Character A (e.g., 'Brave Knight')"
                                    value={charADialogue}
                                    onChange={(e) => setCharADialogue(e.target.value)}
                                    className="mb-2 rounded-full border-2 border-secondary"
                                />
                                <Input
                                    type="text"
                                    placeholder="Character B (e.g., 'Silly Dragon')"
                                    value={charBDialogue}
                                    onChange={(e) => setCharBDialogue(e.target.value)}
                                    className="mb-2 rounded-full border-2 border-secondary"
                                />
                                <Textarea
                                    placeholder="Scenario (e.g., 'They find a secret map', 'They argue about a toy')"
                                    value={dialogueScenario}
                                    onChange={(e) => setDialogueScenario(e.target.value)}
                                    rows={2}
                                    className="resize-y rounded-lg border-2 border-secondary"
                                />
                                <Button onClick={() => callAIAPI('dialogue-sparker', { charA: charADialogue, charB: charBDialogue, scenario: dialogueScenario })} className="w-full mt-4 bg-accent hover:bg-accent/90 text-primary font-semibold rounded-full">
                                    Spark Dialogue!
                                </Button>
                            </section>

                            <hr className="border-t-2 border-gray-200 dark:border-gray-700" />

                            {/* General Writing Assistant Tools (Existing Features) */}
                            <section>
                                <h2 className="text-2xl font-heading font-bold mb-4 text-primary dark:text-accent flex items-center gap-2">
                                    <BookOpenIcon className="h-7 w-7" /> Writing Power-Ups!
                                </h2>
                                <Textarea
                                    placeholder="Tell the AI what you want to write or improve (e.g., 'Give me an idea for a space opera', 'Expand this sentence...')."
                                    value={aiPrompt}
                                    onChange={(e) => setAiPrompt(e.target.value)}
                                    rows={4}
                                    className="resize-y rounded-lg border-2 border-secondary"
                                />
                                <div className="grid grid-cols-2 gap-3 mt-4">
                                    <Button onClick={() => callAIAPI('story-idea', { prompt: aiPrompt })} className="bg-secondary hover:bg-secondary/90 text-white rounded-full">
                                        Spark Idea
                                    </Button>
                                    <Button onClick={() => callAIAPI('expand-segment', { prompt: aiPrompt })} className="bg-primary hover:bg-primary/90 text-white rounded-full">
                                        Expand Text
                                    </Button>
                                    <Button onClick={() => callAIAPI('rewrite-passage', { prompt: aiPrompt })} className="bg-accent hover:bg-accent/90 text-primary rounded-full">
                                        Rewrite Text
                                    </Button>
                                    <Button onClick={() => callAIAPI('check-grammar', { prompt: aiPrompt })} className="bg-secondary hover:bg-secondary/90 text-white rounded-full">
                                        Check Grammar
                                    </Button>
                                    <Button onClick={() => callAIAPI('translate-text', { prompt: aiPrompt })} className="bg-primary hover:bg-primary/90 text-white rounded-full">
                                        Translate Text
                                    </Button>
                                    <Button onClick={() => callAIAPI('improve-writing', { prompt: aiPrompt })} className="bg-accent hover:bg-accent/90 text-primary rounded-full">
                                        Improve Writing
                                    </Button>
                                </div>
                            </section>
                        </div>
                    )}

                    {activeTab === 'art' && (
                        <div className="space-y-8">
                            {/* Character Creator & Visualizer */}
                            <section>
                                <h2 className="text-2xl font-heading font-bold mb-4 text-primary dark:text-accent flex items-center gap-2">
                                    <UsersIcon className="h-7 w-7" /> Character Creator!
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">Describe your dream character! The AI will help you bring them to life.</p>
                                <Textarea
                                    placeholder="e.g., 'A clumsy ninja with a pet dragon', 'A robot who loves to bake cookies'"
                                    value={characterTraits}
                                    onChange={(e) => setCharacterTraits(e.target.value)}
                                    rows={3}
                                    className="resize-y rounded-lg border-2 border-secondary"
                                />
                                <Button onClick={() => callAIAPI('character-creator', { traits: characterTraits })} className="w-full mt-4 bg-accent hover:bg-accent/90 text-primary font-semibold rounded-full">
                                    Create Character!
                                </Button>
                            </section>

                            <hr className="border-t-2 border-gray-200 dark:border-gray-700" />

                            {/* General Art Tools (Existing Features) */}
                            <section>
                                <h2 className="text-2xl font-heading font-bold mb-4 text-primary dark:text-accent flex items-center gap-2">
                                    <PaintBrushIcon className="h-7 w-7" /> Art Studio Magic!
                                </h2>
                                <Textarea
                                    placeholder="Describe the cover art or image you want (e.g., 'A magical forest with glowing trees')."
                                    value={aiPrompt}
                                    onChange={(e) => setAiPrompt(e.target.value)}
                                    rows={3}
                                    className="resize-y rounded-lg border-2 border-secondary"
                                />
                                <div className="grid grid-cols-2 gap-3 mt-4">
                                    <Button onClick={() => callAIAPI('cover-idea', { prompt: aiPrompt })} className="bg-secondary hover:bg-secondary/90 text-white rounded-full">
                                        Generate Cover Idea
                                    </Button>
                                    <Button onClick={() => callAIAPI('integrate-art', { prompt: aiPrompt })} className="bg-primary hover:bg-primary/90 text-white rounded-full">
                                        Generate Art
                                    </Button>
                                </div>
                            </section>
                        </div>
                    )}

                    {activeTab === 'gametools' && (
                        <div className="space-y-8">
                            {/* Story Soundtrack Generator */}
                            <section>
                                <h2 className="text-2xl font-heading font-bold mb-4 text-primary dark:text-accent flex items-center gap-2">
                                    <MusicalNoteIcon className="h-7 w-7" /> Story Soundtrack!
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">Describe the scene&#39;s mood, and AI will suggest music!</p>
                                <Textarea
                                    placeholder="e.g., 'A spooky forest walk', 'Hero's triumphant return'"
                                    value={soundtrackMood}
                                    onChange={(e) => setSoundtrackMood(e.target.value)}
                                    rows={3}
                                    className="resize-y rounded-lg border-2 border-secondary"
                                />
                                <Button onClick={() => callAIAPI('story-soundtrack', { mood: soundtrackMood })} className="w-full mt-4 bg-accent hover:bg-accent/90 text-primary font-semibold rounded-full">
                                    Generate Soundtrack Idea!
                                </Button>
                            </section>

                            <hr className="border-t-2 border-gray-200 dark:border-gray-700" />

                            <div className="space-y-4 text-center p-8 bg-background-offset-light dark:bg-gray-900 rounded-lg">
                                <h2 className="text-2xl font-heading font-bold mb-4 text-primary dark:text-accent">
                                    More Game Tools Coming Soon!
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300">Get ready to build entire worlds and challenges with your AI pal!</p>
                                <SparklesIcon className="h-20 w-20 mx-auto text-accent mt-6 animate-pulse-slow" />
                            </div>
                        </div>
                    )}
                </div>

                {/* AI Output Column */}
                <div className="p-6 bg-background-light dark:bg-gray-800 rounded-xl shadow-lg border-b-4 border-accent relative min-h-[300px] flex flex-col justify-between"> {/* Adjusted to justify-between for sticky button */}
                    {aiOutput ? (
                        <>
                            <div className="flex-grow flex flex-col items-center justify-center text-center">
                                {aiOutput.type === 'text' ? (
                                    <Card className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md border-b-4 border-success text-text-dark dark:text-text-light min-h-[150px] flex flex-col justify-between items-center w-full">
                                        <p className="text-lg font-body whitespace-pre-wrap flex-grow">{aiOutput.content}</p>
                                    </Card>
                                ) : (
                                    <Card className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md border-b-4 border-success text-text-dark dark:text-text-light flex flex-col items-center w-full">
                                        <img src={aiOutput.url} alt={aiOutput.alt} className="max-w-full h-auto rounded-md mb-3 border-2 border-primary" />
                                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">{aiOutput.alt}</p>
                                    </Card>
                                )}
                            </div>
                            <Button onClick={handleInsertIntoBook} className="mt-4 bg-success hover:bg-success/90 text-white font-semibold rounded-full w-full">
                                Send to Story! (Mock)
                            </Button>
                        </>
                    ) : (
                        <div className="text-center text-gray-500 dark:text-gray-400">
                            <LightBulbIcon className="h-20 w-20 mx-auto text-accent opacity-50 mb-3" />
                            <p className="font-heading text-xl">Your AI magic results will appear here!</p>
                            <p className="text-sm">First, choose a target story above if you want to link the magic!</p> {/* Updated hint */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}