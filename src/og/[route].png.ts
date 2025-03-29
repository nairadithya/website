import { getCollection } from 'astro:content'
import { OGImageRoute } from 'astro-og-canvas'

const collectionEntries = await getCollection('blog')

const pages = Object.fromEntries(
    collectionEntries.map(({ slug, data }) => [slug, data])
)
export const { getStaticPaths, GET } = OGImageRoute({
    param: 'route',

    pages: pages,

    getImageOptions: (path, page) => ({
        title: page.title,
        description: page.description,
    }),
})
