import { z, defineCollection } from 'astro:content'
const essayCollection = defineCollection({
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string(),
            image: image().refine((img) => img.width >= 0, {
                message: 'Cover image must be at least 480 pixels wide!',
            }),
            imageAlt: z.string(),
            date: z.date(),
        }),
})

export const collections = {
    essays: essayCollection,
}
