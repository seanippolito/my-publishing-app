// src/components/editor/rich-text-editor.tsx
'use client';

import React, { useState } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'; // To capture editor state

// Node imports from their respective packages
import { HeadingNode, QuoteNode } from '@lexical/rich-text'; // Corrected: removed LexicalNode
import { ListNode, ListItemNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { TableNode, TableCellNode, TableRowNode } from '@lexical/table';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import type { LexicalNode } from 'lexical'; // Corrected: LexicalNode type import from 'lexical'

import theme from '@/styles/lexical-editor-theme'; // Our custom theme
import ToolbarPlugin from './plugins/ToolbarPlugin';
import AutoLinkPlugin from './plugins/AutoLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin'; // Ensure explicit named import if needed
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import {ErrorBoundary} from "next/dist/client/components/error-boundary";
import {LexicalErrorBoundary} from "@lexical/react/LexicalErrorBoundary"; // Ensure explicit named import if needed


// Define the nodes that our editor will support
const editorNodes: Array<any> = [
    HeadingNode,
    QuoteNode,
    ListNode,
    ListItemNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    // TableCellNode,
    // TableRowNode,
    AutoLinkNode,
    LinkNode,
];

interface RichTextEditorProps {
    initialContent?: string; // Optional JSON string or raw text content
    onContentChange: (content: string) => void; // Callback to save content
}

export default function RichTextEditor({ initialContent, onContentChange }: RichTextEditorProps) {
    // Lexical configuration
    const editorConfig = {
        editorState: initialContent || undefined,
        namespace: 'InkGeniusEditor',
        theme,
        nodes: editorNodes,
        onError(error: Error) {
            console.error('Lexical Editor Error:', error);
            // Log the error to your logging service
        },
    };

    const handleEditorChange = (editorState: any) => {
        editorState.read(() => {
            const jsonString = JSON.stringify(editorState.toJSON());
            onContentChange(jsonString);
        });
    };

    return (
        <LexicalComposer initialConfig={editorConfig}>
            <div className="editor-container relative flex flex-col h-full">
                {/* Toolbar */}
                <ToolbarPlugin />

            {/*     Content Area wrapped with LexicalErrorBoundary*/}
                    <div className="editor-inner flex-grow overflow-auto p-2">
                        <RichTextPlugin
                            ErrorBoundary={LexicalErrorBoundary}
                            contentEditable={<ContentEditable className="LexicalContentEditable"/>}
                            placeholder={
                                <div className="editor-placeholder">
                                    Start writing your amazing story here...
                                </div>
                            }

                        />
                    </div>

                {/* Plugins */}
                <HistoryPlugin />
                <AutoFocusPlugin />
                <ListPlugin /> {/* Now used as a component */}
                <LinkPlugin /> {/* Now used as a component */}
                <AutoLinkPlugin />
                <OnChangePlugin onChange={handleEditorChange} />
            </div>
        </LexicalComposer>
    );
}