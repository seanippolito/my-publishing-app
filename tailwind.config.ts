// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: 'var(--color-primary)',
                secondary: 'var(--color-secondary)',
                accent: 'var(--color-accent)',
                'text-light': 'var(--color-text-light)',
                'text-dark': 'var(--color-text-dark)',
                'bg-light': 'var(--color-background-light)',
                'bg-dark': 'var(--color-background-dark)',
            },
            fontFamily: {
                heading: ['var(--font-heading)'],
                body: ['var(--font-body)'],
            },
        },
    },
    plugins: [],
};
export default config;