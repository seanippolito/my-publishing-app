// src/app/layout.tsx
import type { Metadata } from 'next';
// NEW FONTS: Bubblegum Sans for headings, Nunito for body
import { Bubblegum_Sans, Nunito } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { dark, neobrutalism, shadesOfPurple } from '@clerk/themes'
import AIChatBubble from "@/components/ai/ai-chat-bubble";

// Configure fonts with variables
const bubblegumSans = Bubblegum_Sans({
    weight: '400', // Bubblegum Sans is usually only 400
    subsets: ['latin'],
    variable: '--font-heading',
    display: 'swap',
});

const nunito = Nunito({
    weight: ['400', '600', '700', '800'], // Multiple weights for body text
    subsets: ['latin'],
    variable: '--font-body',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Creathor - Unleash Your Imagination!', // Updated title for fun tone
    description: 'The super fun platform where kids create, imagine, and publish amazing stories with AI magic!', // Kid-friendly description
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider
            appearance={{
                baseTheme: [neobrutalism],
                variables: { colorPrimary: 'red' },
                signIn: {
                    baseTheme: [neobrutalism],
                    variables: { colorPrimary: 'green' },
                },
            }}
        >
            <html lang="en" className={`${bubblegumSans.variable} ${nunito.variable}`}>
                <body>
                    {children}
                    <Toaster position="bottom-right" reverseOrder={false} />
                </body>
            </html>
        </ClerkProvider>
    );
}

// // src/app/layout.tsx
// import type { Metadata } from 'next';
// import { Inter, Roboto } from 'next/font/google'; // Example: importing fonts
// import {ClerkProvider} from '@clerk/nextjs';
// import './globals.css';
// import { Toaster } from 'react-hot-toast'; // Add this import
// import { dark, neobrutalism, shadesOfPurple } from '@clerk/themes'
//
// // Configure fonts (Next.js font optimization)
// const inter = Inter({
//     subsets: ['latin'],
//     variable: '--font-heading',
//     display: 'swap',
// });
//
// const roboto = Roboto({
//     weight: ['400', '700'],
//     subsets: ['latin'],
//     variable: '--font-body',
//     display: 'swap',
// });
//
// export const metadata: Metadata = {
//     title: 'Creathor - The Future of Self-Publishing',
//     description: 'Empowering creators with AI-enhanced self-publishing tools and a vibrant community.',
// };
//
// export default function RootLayout({
//                                        children,
//                                    }: Readonly<{
//     children: React.ReactNode;
// }>) {
//     return (
//         <ClerkProvider
//             appearance={{
//                 baseTheme: [neobrutalism],
//                 variables: { colorPrimary: 'red' },
//                 signIn: {
//                     baseTheme: [neobrutalism],
//                     variables: { colorPrimary: 'green' },
//                 },
//             }}
//         >
//             <html lang="en" className={`${inter.variable} ${roboto.variable}`}>
//             <body>
//             {children}
//             <Toaster position="bottom-right" reverseOrder={false} /> {/* Add this */}
//             </body>
//             </html>
//         </ClerkProvider>
//
//     );
// }