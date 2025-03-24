import { z, defineCollection } from 'astro:content'

const postCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
        isEssay: z.boolean(),
    }),
})

export const collections = {
    essays: postCollection,
}
