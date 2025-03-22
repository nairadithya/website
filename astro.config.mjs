import { defineConfig } from 'astro/config'
import rehypeMathjax from 'rehype-mathjax'
import remarkMath from 'remark-math'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@astrojs/mdx'

import sitemap from '@astrojs/sitemap'

export default defineConfig({
    site: 'https://adithyanair.com',
    vite: {
        plugins: [tailwindcss()],
    },
    markdown: {
        remarkPlugins: ['remark-gfm', 'remark-smartypants', 'remark-math'],
        rehypePlugins: ['rehype-mathjax'],
    },
    integrations: [mdx(), sitemap()],
    experimental: {
        svg: true,
    },
})
