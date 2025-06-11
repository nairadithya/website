import { z, defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'

const blogSchema = z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    isEssay: z.boolean().optional(),
    isDraft: z.boolean().optional(),
})

const postCollection = defineCollection({
    loader: glob({
        pattern: ['**/*.{md,mdx}', '*.{md,mdx}'],
        base: 'src/content/blog',
    }),
    schema: blogSchema,
})

const gardenCollection = defineCollection({
    loader: glob({
        pattern: ['**/*.{md,mdx}', '*.{md,mdx}'],
        base: 'src/content/garden/',
    }),
    schema: z.object({
        title: z.string(),
        author: z.string(),
        source: z.string().optional(),
        category: z.string(),
        type: z.enum(['article', 'book', 'movie', 'show', 'note']),
    }),
})

export const collections = {
    blog: postCollection,
    garden: gardenCollection,
}
