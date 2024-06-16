import { z, defineCollection } from 'astro:content'

const blogCollection = defineCollection({
    type: 'content', // v2.5.0 and later
    schema: z.object({
        title: z.string(),
        image: z.string().optional(),
        tags: z.array(z.string()),
        date: z.date(),
    }),
})

const notesCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        date: z.date(),
    }),
})

export const collections = {
    blog: blogCollection,
    notes: notesCollection,
}
