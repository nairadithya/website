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

export const collections = {
    blog: postCollection,
}
