import { OGImageRoute } from 'astro-og-canvas'

export const { getStaticPaths, GET } = OGImageRoute({
    param: 'route',

    pages: {
        example: {
            title: 'Example Page',
            description: 'Description of this page shown in smaller text',
        },
    },

    // For each page, this callback will be used to customize the OpenGraph image.
    getImageOptions: (path, page) => ({
        title: page.title,
        description: page.description,
        logo: {
            path: './src/logo.png',
        },
        // There are a bunch more options you can use here!
    }),
})
