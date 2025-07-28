// src/app/(dashboard)/settings/page.tsx
'use client';

import React, { useState } from 'react';
import {
    UserCircleIcon, BellAlertIcon, PhotoIcon, XCircleIcon,
    ChatBubbleOvalLeftEllipsisIcon, TrophyIcon, MegaphoneIcon, SparklesIcon,
    ShieldCheckIcon, LinkIcon, LifebuoyIcon, BookOpenIcon, PlayCircleIcon, UsersIcon, EnvelopeIcon, ShareIcon
} from '@heroicons/react/24/outline'; // Updated icons
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Toggle } from '@/components/ui/toggle';
import { toast } from 'react-hot-toast';
import {SaveIcon} from "lucide-react";

// Mock User Profile Data
interface UserSettings {
    id: string;
    creatorName: string;
    avatarUrl: string;
    bio: string;
    profileVisibility: 'public' | 'friends' | 'private';
    notifications: {
        friendComments: boolean;
        newBadge: boolean;
        questCompleted: boolean;
        creathorUpdates: boolean;
    };
    privacy: { // NEW: Privacy settings
        allowFriendRequests: 'everyone' | 'friendsOfFriends' | 'noOne';
        allowComments: 'all' | 'friendsOnly' | 'noOne';
    };
}

const mockUserSettings: UserSettings = {
    id: 'user1',
    creatorName: 'Super Creator You',
    avatarUrl: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=your_seed',
    bio: 'Loves writing tales of brave knights and friendly dragons!',
    profileVisibility: 'public',
    notifications: {
        friendComments: true,
        newBadge: true,
        questCompleted: false,
        creathorUpdates: true,
    },
    privacy: {
        allowFriendRequests: 'everyone',
        allowComments: 'all',
    },
};

export default function SettingsPage() {
    const [settings, setSettings] = useState<UserSettings>(mockUserSettings);
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (field: string, value: any, category?: 'notifications' | 'privacy') => {
        if (category === 'notifications') {
            setSettings(prev => ({
                ...prev,
                notifications: { ...prev.notifications, [field]: value }
            }));
        } else if (category === 'privacy') {
            setSettings(prev => ({
                ...prev,
                privacy: { ...prev.privacy, [field]: value }
            }));
        }
        else {
            setSettings(prev => ({ ...prev, [field]: value }));
        }
    };

    const handleSaveSettings = async () => {
        setIsSaving(true);
        toast.loading('Saving your Creator Settings...', { id: 'saveSettingsToast' });

        try {
            // Mock API call to save settings
            // In a real app, this would be a fetch to your backend API route
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log('Settings saved:', settings);

            toast.success('Your Creator Settings are updated!', { id: 'saveSettingsToast' });
        } catch (error) {
            console.error('Failed to save settings:', error);
            toast.error('Oh no! Could not save settings.', { id: 'saveSettingsToast' });
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancelChanges = () => {
        setSettings(mockUserSettings); // Reset to initial mock settings
        toast('Changes discarded!', { id: 'discardToast' });
    };

    const handleParentalPortal = () => {
        toast('Opening Parental Portal... (Conceptual Link)', { id: 'parentalPortalToast' });
        // In a real app: Redirect to a secure parental dashboard
    };

    const handleContactSupport = () => {
        toast('Sending message to Creathor Care Team... (Conceptual)', { id: 'contactSupportToast' });
        // In a real app: Open a contact form or support chat
    };

    const handleOpenLink = (link: string, message: string) => {
        toast(message, { id: 'linkToast' });
        // window.open(link, '_blank'); // Uncomment for actual new tab
        console.log(`Opening link: ${link}`);
    };


    return (
        <div className="p-6 bg-background-light dark:bg-background-dark rounded-xl shadow-xl min-h-[calc(100vh-160px)]">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-8 text-primary dark:text-accent text-center">
                My Settings Pad
            </h1>

            <div className="space-y-8 max-w-4xl mx-auto">
                {/* Section 1: My Creator Profile */}
                <Card className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-b-4 border-accent">
                    <h2 className="text-3xl font-heading font-bold mb-6 text-primary dark:text-accent flex items-center gap-3">
                        <UserCircleIcon className="h-9 w-9" /> My Creator Profile
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        {/* Avatar Display & Customization */}
                        <div className="flex flex-col items-center gap-4 p-4 rounded-lg bg-background-offset-light dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                            <img
                                src={settings.avatarUrl}
                                alt={`${settings.creatorName}'s avatar`}
                                className="h-28 w-28 rounded-full border-4 border-primary shadow-md"
                            />
                            <Button className="bg-secondary hover:bg-secondary/90 text-white font-semibold rounded-full flex items-center gap-2">
                                <PhotoIcon className="h-5 w-5" /> Change Avatar (Coming Soon!)
                            </Button>
                        </div>

                        {/* Profile Details */}
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="creatorName" className="block text-sm font-semibold mb-2 text-text-dark dark:text-text-light">Creator Name:</label>
                                <Input
                                    id="creatorName"
                                    type="text"
                                    value={settings.creatorName}
                                    onChange={(e) => handleChange('creatorName', e.target.value)}
                                    className="w-full rounded-full border-2 border-primary focus:border-accent text-lg px-4 py-2"
                                />
                            </div>
                            <div>
                                <label htmlFor="bio" className="block text-sm font-semibold mb-2 text-text-dark dark:text-text-light">About My Adventures:</label>
                                <Textarea
                                    id="bio"
                                    value={settings.bio}
                                    onChange={(e) => handleChange('bio', e.target.value)}
                                    rows={3}
                                    className="w-full rounded-lg border-2 border-primary focus:border-accent text-lg px-4 py-2 resize-y"
                                    placeholder="Tell others about your amazing stories!"
                                />
                            </div>
                            <div>
                                <label htmlFor="profileVisibility" className="block text-sm font-semibold mb-2 text-text-dark dark:text-text-light">Who can see my profile?</label>
                                <Select onValueChange={(val) => handleChange('profileVisibility', val)} value={settings.profileVisibility}>
                                    <SelectTrigger className="w-full rounded-full border-2 border-primary px-4 py-2">
                                        <SelectValue placeholder="Select visibility" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="public">Everyone (Public Explorer)</SelectItem>
                                        <SelectItem value="friends">My Adventure Squad (Friends Only)</SelectItem>
                                        <SelectItem value="private">Just Me (Secret Agent)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Section 2: Notification & Activity Alerts */}
                <Card className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-b-4 border-primary">
                    <h2 className="text-3xl font-heading font-bold mb-6 text-primary dark:text-accent flex items-center gap-3">
                        <BellAlertIcon className="h-9 w-9" /> Magic Alerts & Beeps
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-background-offset-light dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                            <label htmlFor="commentsToggle" className="flex items-center gap-2 text-lg font-semibold text-text-dark dark:text-text-light cursor-pointer">
                                <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-secondary" /> Friend comments
                            </label>
                            <Toggle
                                id="commentsToggle"
                                checked={settings.notifications.friendComments}
                                onCheckedChange={(val) => handleChange('friendComments', val, 'notifications')}
                            />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-background-offset-light dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                            <label htmlFor="badgeToggle" className="flex items-center gap-2 text-lg font-semibold text-text-dark dark:text-text-light cursor-pointer">
                                <TrophyIcon className="h-6 w-6 text-accent" /> New badge earned
                            </label>
                            <Toggle
                                id="badgeToggle"
                                checked={settings.notifications.newBadge}
                                onCheckedChange={(val) => handleChange('newBadge', val, 'notifications')}
                            />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-background-offset-light dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                            <label htmlFor="questToggle" className="flex items-center gap-2 text-lg font-semibold text-text-dark dark:text-text-light cursor-pointer">
                                <MegaphoneIcon className="h-6 w-6 text-primary" /> Quest completed
                            </label>
                            <Toggle
                                id="questToggle"
                                checked={settings.notifications.questCompleted}
                                onCheckedChange={(val) => handleChange('questCompleted', val, 'notifications')}
                            />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-background-offset-light dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                            <label htmlFor="updatesToggle" className="flex items-center gap-2 text-lg font-semibold text-text-dark dark:text-text-light cursor-pointer">
                                <SparklesIcon className="h-6 w-6 text-warning" /> Creathor updates
                            </label>
                            <Toggle
                                id="updatesToggle"
                                checked={settings.notifications.creathorUpdates}
                                onCheckedChange={(val) => handleChange('creathorUpdates', val, 'notifications')}
                            />
                        </div>
                    </div>
                </Card>

                {/* Section 3: Privacy & Safety Zone */}
                <Card className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-b-4 border-accent">
                    <h2 className="text-3xl font-heading font-bold mb-6 text-primary dark:text-accent flex items-center gap-3">
                        <ShieldCheckIcon className="h-9 w-9" /> Privacy & Safety Zone
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="friendRequests" className="block text-sm font-semibold mb-2 text-text-dark dark:text-text-light">Who can send me friend requests?</label>
                            <Select onValueChange={(val) => handleChange('allowFriendRequests', val, 'privacy')} value={settings.privacy.allowFriendRequests}>
                                <SelectTrigger className="w-full rounded-full border-2 border-primary px-4 py-2">
                                    <SelectValue placeholder="Select who can send requests" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="everyone">Everyone (Open Gate)</SelectItem>
                                    <SelectItem value="friendsOfFriends">Friends of Friends (Trusted Circle)</SelectItem>
                                    <SelectItem value="noOne">No One (Secret Hideout)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label htmlFor="commentPermissions" className="block text-sm font-semibold mb-2 text-text-dark dark:text-text-light">Who can comment on my stories?</label>
                            <Select onValueChange={(val) => handleChange('allowComments', val, 'privacy')} value={settings.privacy.allowComments}>
                                <SelectTrigger className="w-full rounded-full border-2 border-primary px-4 py-2">
                                    <SelectValue placeholder="Select comment permissions" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Everyone (All Ears)</SelectItem>
                                    <SelectItem value="friendsOnly">My Adventure Squad (Friends Only)</SelectItem>
                                    <SelectItem value="noOne">No One (Quiet Time)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="pt-4 text-center">
                            <Button onClick={handleParentalPortal} className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-full px-6 py-3 shadow-md">
                                <UsersIcon className="h-5 w-5 mr-2" /> Grown-Up Portal (Parental Controls)
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Section 4: Linked Accounts & Integrations */}
                <Card className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-b-4 border-primary">
                    <h2 className="text-3xl font-heading font-bold mb-6 text-primary dark:text-accent flex items-center gap-3">
                        <LinkIcon className="h-9 w-9" /> Connected Worlds
                    </h2>
                    <div className="space-y-4 text-center">
                        <p className="text-gray-600 dark:text-gray-300">Connect Creathor to other awesome places! (Coming Soon!)</p>
                        <Button className="bg-secondary/20 hover:bg-secondary/40 text-secondary border-secondary border-2 font-semibold rounded-full px-6 py-3 flex items-center justify-center gap-2 mx-auto" disabled>
                            <SparklesIcon className="h-5 w-5" /> Link to School Account
                        </Button>
                        <Button className="bg-secondary/20 hover:bg-secondary/40 text-secondary border-secondary border-2 font-semibold rounded-full px-6 py-3 flex items-center justify-center gap-2 mx-auto" disabled>
                            <ShareIcon className="h-5 w-5" /> Share to FunZone (Conceptual)
                        </Button>
                    </div>
                </Card>

                {/* Section 5: Help & Support ("Creathor Care Team") */}
                <Card className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-b-4 border-accent">
                    <h2 className="text-3xl font-heading font-bold mb-6 text-primary dark:text-accent flex items-center gap-3">
                        <LifebuoyIcon className="h-9 w-9" /> Creathor Care Team
                    </h2>
                    <div className="space-y-4">
                        <Button onClick={() => handleOpenLink('https://creathor.com/super-user-guide', 'Opening Super User Guide...')} className="w-full bg-primary hover:bg-primary/90 text-white font-semibold rounded-full px-6 py-3 flex items-center justify-center gap-2">
                            <BookOpenIcon className="h-6 w-6" /> Read Super User Guide (FAQ)
                        </Button>
                        <Button onClick={() => handleOpenLink('https://creathor.com/magic-tutorials', 'Opening Magic Tutorials...')} className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold rounded-full px-6 py-3 flex items-center justify-center gap-2">
                            <PlayCircleIcon className="h-6 w-6" /> Watch Magic Tutorials
                        </Button>
                        <Button onClick={handleContactSupport} className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold rounded-full px-6 py-3 flex items-center justify-center gap-2">
                            <EnvelopeIcon className="h-6 w-6" /> Ask the Care Team (Contact Us)
                        </Button>
                    </div>
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 mt-8">
                    <Button
                        onClick={handleCancelChanges}
                        variant="outline"
                        className="px-6 py-3 text-lg font-semibold rounded-full border-2 border-error text-error hover:bg-error/10 flex items-center gap-2"
                        disabled={isSaving}
                    >
                        <XCircleIcon className="h-6 w-6" /> Discard Changes
                    </Button>
                    <Button
                        onClick={handleSaveSettings}
                        className="px-6 py-3 text-lg font-semibold rounded-full bg-success hover:bg-success/90 text-white flex items-center gap-2"
                        disabled={isSaving}
                    >
                        {isSaving ? (
                            <>
                                <span className="animate-spin mr-2">🌀</span> Saving...
                            </>
                        ) : (
                            <>
                                <SaveIcon className="h-6 w-6" /> Save Magic!
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}