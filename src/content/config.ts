import { z, defineCollection } from 'astro:content'
const essayCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
    }),
})

const journalCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
    }),
})

const booksCollection = defineCollection({
    type: 'content',
    scheme: z.object({
        title: z.string(),
        review: z.string(),
        cover: image(),
    }),
})

export const collections = {
    essays: essayCollection,
    journal: journalCollection,
    books: booksCollection,
}
