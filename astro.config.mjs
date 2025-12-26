import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import remarkToc from 'remark-toc'
import remarkGFM from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkSmartyPants from 'remark-smartypants'
import rehypeKatex from 'rehype-katex'
import mdx from '@astrojs/mdx'

import sitemap from '@astrojs/sitemap'

export default defineConfig({
    site: 'https://adithyanair.com',
    vite: {
        plugins: [tailwindcss()],
    },
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
        syntaxHighlight: 'prism',
    },
    integrations: [mdx(), sitemap()],
})
