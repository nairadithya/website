import { z, defineCollection } from 'astro:content'
const essayCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        image: z.string(),
    imageAlt: z.string(),
        date: z.date(),
    }),
})

export const collections = {
    essays: essayCollection,
}
