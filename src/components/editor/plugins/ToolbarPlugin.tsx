// src/components/editor/plugins/ToolbarPlugin.tsx
'use client';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
    // Core Lexical commands and functions
    REDO_COMMAND,
    UNDO_COMMAND,
    CAN_REDO_COMMAND,
    CAN_UNDO_COMMAND,
    SELECTION_CHANGE_COMMAND,
    FORMAT_TEXT_COMMAND,
    INSERT_PARAGRAPH_COMMAND,
    $getSelection, // Ensure this is imported from 'lexical'
    $isRangeSelection, // Ensure this is imported from 'lexical'
    LexicalEditor, // Import LexicalEditor type
} from 'lexical';

// Node-related utilities and types from selection
import { $wrapNodes } from '@lexical/selection';

// List-specific commands and nodes
import { INSERT_UNORDERED_LIST_COMMAND, INSERT_ORDERED_LIST_COMMAND, ListItemNode, ListNode } from '@lexical/list';

// Link-specific commands and nodes
import { TOGGLE_LINK_COMMAND, $isLinkNode, LinkNode } from '@lexical/link'; // Also import LinkNode for explicit type check

// Rich text-specific commands and nodes
import { $createHeadingNode, $createQuoteNode, HeadingNode, QuoteNode } from '@lexical/rich-text';

// Utility for registering listeners
import { mergeRegister } from '@lexical/utils';

// React hooks
import { useCallback, useEffect, useState } from 'react';

// Icons from lucide-react
import {
    BoldIcon,
    ItalicIcon,
    UnderlineIcon,
    StrikethroughIcon,
    QuoteIcon,
    ListIcon,
    ListOrderedIcon,
    LinkIcon,
    UndoIcon,
    RedoIcon,
    ChevronDownIcon,
    Heading1Icon,
    Heading2Icon,
} from 'lucide-react';

// UI components
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const LowPriority = 1;

export default function ToolbarPlugin() {
    const [editor] = useLexicalComposerContext();
    const [activeEditor, setActiveEditor] = useState<LexicalEditor>(editor); // Explicitly type activeEditor
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrikethrough, setIsStrikethrough] = useState(false);
    const [isLink, setIsLink] = useState(false);
    const [canUndo, setCanUndo] = useState(false);
    const [canRedo, setCanRedo] = useState(false);
    const [blockType, setBlockType] = useState('paragraph');

    const updateToolbar = useCallback(() => {
        // Perform Lexical operations within editor.get = read
        activeEditor.getEditorState().read(() => { // Use activeEditor and getEditorState().read()
            const selection = $getSelection();
            if (!$isRangeSelection(selection)) { // Ensure it's a RangeSelection
                // If not a range selection (e.g., node selection), clear formats and exit
                setIsBold(false);
                setIsItalic(false);
                setIsUnderline(false);
                setIsStrikethrough(false);
                setIsLink(false);
                setBlockType('paragraph');
                return;
            }

            const anchorNode = selection.anchor.getNode();
            const element =
                anchorNode.getKey() === 'root'
                    ? anchorNode
                    : anchorNode.getTopLevelElementOrThrow();

            // Update text format state
            setIsBold(selection.hasFormat('bold'));
            setIsItalic(selection.hasFormat('italic'));
            setIsUnderline(selection.hasFormat('underline'));
            setIsStrikethrough(selection.hasFormat('strikethrough'));

            // Update block type
            if (element.getType() === 'heading') {
                setBlockType((element as HeadingNode).getTag());
            } else if (element.getType() === 'quote') {
                setBlockType('quote');
            } else if (element.getType() === 'list') {
                setBlockType((element as ListNode).getListType());
            } else {
                setBlockType('paragraph');
            }

            // Check if selected text is part of a link
            const nodes = selection.getNodes();
            setIsLink(nodes.some((node) => {
                const parent = node.getParent();
                return $isLinkNode(node) || (parent && $isLinkNode(parent));
            }));
        });
    }, [activeEditor]); // Depend on activeEditor

    useEffect(() => {
        // Register update listener and commands only once per editor instance
        return mergeRegister(
            activeEditor.registerUpdateListener(({ editorState }) => {
                // editorState.read(() => { // Redundant as updateToolbar already calls read
                updateToolbar();
                // });
            }),
            activeEditor.registerCommand(
                SELECTION_CHANGE_COMMAND,
                (_payload, newEditor) => {
                    updateToolbar();
                    setActiveEditor(newEditor); // Update activeEditor if it changes (e.g., multiple editors)
                    return false;
                },
                LowPriority,
            ),
            activeEditor.registerCommand(
                CAN_UNDO_COMMAND,
                (payload) => {
                    setCanUndo(payload);
                    return false;
                },
                LowPriority,
            ),
            activeEditor.registerCommand(
                CAN_REDO_COMMAND,
                (payload) => {
                    setCanRedo(payload);
                    return false;
                },
                LowPriority,
            ),
        );
    }, [activeEditor, updateToolbar]); // Depend on activeEditor, updateToolbar

    const formatText = useCallback(
        (format: 'bold' | 'italic' | 'underline' | 'strikethrough') => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
        },
        [activeEditor],
    );

    const formatBlock = useCallback(
        (type: 'paragraph' | 'h1' | 'h2' | 'quote' | 'ul' | 'ol') => {
            activeEditor.update(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                    if (type === 'paragraph') {
                        activeEditor.dispatchCommand(INSERT_PARAGRAPH_COMMAND, undefined);
                    } else if (type === 'h1' || type === 'h2') {
                        $wrapNodes(selection, () => $createHeadingNode(type));
                    } else if (type === 'quote') {
                        $wrapNodes(selection, () => $createQuoteNode());
                    } else if (type === 'ul') {
                        activeEditor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
                    } else if (type === 'ol') {
                        activeEditor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
                    }
                }
            });
        },
        [activeEditor],
    );

    const insertLink = useCallback(() => {
        activeEditor.update(() => { // Wrap command in update for safety
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                if (!isLink) {
                    const url = prompt('Enter the URL:', 'https://');
                    if (url) {
                        activeEditor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
                    }
                } else {
                    activeEditor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
                }
            }
        });
    }, [activeEditor, isLink]);

    return (
        <div className="flex flex-wrap items-center gap-2 p-3 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 rounded-t-lg">
            <Button
                onClick={() => activeEditor.dispatchCommand(UNDO_COMMAND, undefined)}
                disabled={!canUndo}
                variant="ghost"
                size="icon"
            >
                <UndoIcon className="h-5 w-5" />
            </Button>
            <Button
                onClick={() => activeEditor.dispatchCommand(REDO_COMMAND, undefined)}
                disabled={!canRedo}
                variant="ghost"
                size="icon"
            >
                <RedoIcon className="h-5 w-5" />
            </Button>

            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-2" />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                        <span>{blockType.charAt(0).toUpperCase() + blockType.slice(1)}</span>
                        <ChevronDownIcon className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700">
                    <DropdownMenuItem onSelect={() => formatBlock('paragraph')}>Paragraph</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => formatBlock('h1')}>Heading 1</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => formatBlock('h2')}>Heading 2</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => formatBlock('quote')}>Quote</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => formatBlock('ul')}>Bullet List</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => formatBlock('ol')}>Numbered List</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-2" />

            <Button
                onClick={() => formatText('bold')}
                variant={isBold ? 'secondary' : 'ghost'}
                size="icon"
            >
                <BoldIcon className="h-5 w-5" />
            </Button>
            <Button
                onClick={() => formatText('italic')}
                variant={isItalic ? 'secondary' : 'ghost'}
                size="icon"
            >
                <ItalicIcon className="h-5 w-5" />
            </Button>
            <Button
                onClick={() => formatText('underline')}
                variant={isUnderline ? 'secondary' : 'ghost'}
                size="icon"
            >
                <UnderlineIcon className="h-5 w-5" />
            </Button>
            <Button
                onClick={() => formatText('strikethrough')}
                variant={isStrikethrough ? 'secondary' : 'ghost'}
                size="icon"
            >
                <StrikethroughIcon className="h-5 w-5" />
            </Button>
            <Button
                onClick={() => formatBlock('quote')}
                variant={blockType === 'quote' ? 'secondary' : 'ghost'}
                size="icon"
            >
                <QuoteIcon className="h-5 w-5" />
            </Button>
            <Button
                onClick={() => formatBlock('ul')}
                variant={blockType === 'ul' ? 'secondary' : 'ghost'}
                size="icon"
            >
                <ListIcon className="h-5 w-5" />
            </Button>
            <Button
                onClick={() => formatBlock('ol')}
                variant={blockType === 'ol' ? 'secondary' : 'ghost'}
                size="icon"
            >
                <ListOrderedIcon className="h-5 w-5" />
            </Button>
            <Button
                onClick={insertLink}
                variant={isLink ? 'secondary' : 'ghost'}
                size="icon"
            >
                <LinkIcon className="h-5 w-5" />
            </Button>
        </div>
    );
}