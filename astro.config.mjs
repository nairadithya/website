import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import mdx from "@astrojs/mdx";
{
  shikiConfig: {
    theme: "catppuccin-mocha"
  }
}
// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx()]
});
