import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'
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
        description: z.string(),
    }),
})

const reviewCollection = defineCollection({
    loader: glob({
        pattern: ['**/*.{md,mdx}', '*.{md,mdx}'],
        base: 'src/content/reviews/',
    }),
    schema: z.object({
        title: z.string(),
        type: z.enum(['movie', 'book', 'show', 'game']),
      date: z.date(),
      year: z.number().gte(1000).lte(9999)
    }),
})

export const collections = {
    blog: postCollection,
    garden: gardenCollection,
    reviews: reviewCollection,
}
