// src/components/editor/plugins/AutoLinkPlugin.tsx
'use client';

import { AutoLinkPlugin as LexicalAutoLinkPlugin, LinkMatcher } from '@lexical/react/LexicalAutoLinkPlugin';

const URL_REGEX =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/[a-zA-Z0-9]+\.[^\s]{2,}|[a-zA-Z0-9]+\.[^\s]{2,})/;

const EMAIL_REGEX =
    /(([^<>()[\]\\.,;:\s@"]+(?:\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

const MATCHERS: Array<LinkMatcher> = [
    (text) => {
        const match = URL_REGEX.exec(text);
        if (match === null) {
            return null;
        }
        return {
            index: match.index,
            length: match[0].length,
            text: match[0],
            url: match[0].startsWith('http') ? match[0] : `https://${match[0]}`,
            // Add other data we want to store for the link node
        };
    },
    (text) => {
        const match = EMAIL_REGEX.exec(text);
        if (match === null) {
            return null;
        }
        return {
            index: match.index,
            length: match[0].length,
            text: match[0],
            url: `mailto:${match[0]}`,
        };
    },
];

export default function AutoLinkPlugin() {
    return <LexicalAutoLinkPlugin matchers={MATCHERS} />;
}