import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@astrojs/mdx'
import cloudflare from '@astrojs/cloudflare'

import sitemap from '@astrojs/sitemap'

export default defineConfig({
    site: 'https://adithyanair.com',
    vite: {
        plugins: [tailwindcss()],
    },
    markdown: {
        remarkPlugins: ['remark-gfm', 'remark-smartypants'],
    },
    integrations: [mdx(), sitemap()],
    adapter: cloudflare(),
})
