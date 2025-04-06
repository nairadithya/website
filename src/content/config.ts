import { z, defineCollection } from 'astro:content'
import { glob, file } from 'astro/loaders'

const postCollection = defineCollection({
    loader: glob({ pattern: ['**/*.md', '*.md'], base: './src/content/blog' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
        isEssay: z.boolean(),
        isDraft: z.boolean().optional(),
    }),
})

const quotesCollection = defineCollection({
    loader: file('src/content/notes.json'),
    schema: z.object({
        id: z.int(),
        title: z.string(),
        quote: z.string(),
        author: z.string(),
        category: z.string(),
    }),
})

export const collections = {
    blog: postCollection,
    quotes: quotesCollection,
}
