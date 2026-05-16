import { defineConfig, fontProviders } from 'astro/config'
import remarkToc from 'remark-toc'
import remarkGFM from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkSmartyPants from 'remark-smartypants'
import rehypeKatex from 'rehype-katex'
import mdx from '@astrojs/mdx'

import sitemap from '@astrojs/sitemap'

export default defineConfig({
    site: 'https://adithyanair.com',
    output: 'static',
    prefetch: {
        prefetchAll: true,
    },
    markdown: {
        remarkPlugins: [
            [
                remarkToc,
                { heading: 'Table Of Contents', maxDepth: 2, ordered: true },
            ],
            remarkMath,
            remarkGFM,
            remarkSmartyPants,
        ],
        rehypePlugins: [rehypeKatex],
        syntaxHighlight: 'shiki',
    },
    fonts: [
        {
            provider: fontProviders.fontsource(),
            name: 'IBM Plex Serif',
            cssVariable: '--font-serif',
        },
        {
            provider: fontProviders.fontsource(),
            name: 'IBM Plex Sans',
            weights: [100, 300, 400, 500, 800],
            cssVariable: '--font-sans',
            formats: ['woff'],
        },
        {
            provider: fontProviders.fontsource(),
            name: 'IBM Plex Mono',
            cssVariable: '--font-mono',
        },
    ],
    integrations: [mdx(), sitemap()],
})
