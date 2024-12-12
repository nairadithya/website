import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import rehypeMathjax from 'rehype-mathjax';
import remarkMath from 'remark-math';
import mdx from "@astrojs/mdx";

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://adithyanair.com',
  markdown: {
    remarkPlugins: [
      'remark-gfm', 'remark-smartypants',
      'remark-math'
    ],
    rehypePlugins: [
      'rehype-mathjax'
    ]
  }, integrations: [tailwind(), mdx(), sitemap()]
}
)