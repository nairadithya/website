import { z, defineCollection } from 'astro:content'
import { glob, file } from 'astro/loaders'

const blogSchema = z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    isEssay: z.boolean().optional(),
    isDraft: z.boolean().optional(),
})

const postCollection = defineCollection({
    loader: glob({ pattern: ['**/*.md', '*.md'], base: 'src/content/blog' }),
    schema: blogSchema,
})

const journeyCollection = defineCollection({
    loader: glob({ pattern: '*.md', base: 'src/content/journeys' }),
    schema: blogSchema,
})

const quotesCollection = defineCollection({
    loader: glob({ pattern: '*.md', base: 'src/content/quotes/' }),
    schema: z.object({
        title: z.string(),
        author: z.string(),
        source: z.string(),
        category: z.string(),
    }),
})

export const collections = {
    blog: postCollection,
    journeys: journeyCollection,
    quotes: quotesCollection,
}
