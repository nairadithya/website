import fs from 'fs/promises'
import satori from 'satori'
import sharp from 'sharp'
import { getCollection, getEntry } from 'astro:content'
import type { APIRoute, GetStaticPaths } from 'astro'

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = await getCollection('blog')
    return posts.map((post) => ({
        params: { slug: `${post.id}.png` },
    }))
}

export const GET: APIRoute = async ({ params }) => {
    const { slug } = params

    if (!slug) {
        return new Response('Slug is required', { status: 400 })
    }

    const postSlug = slug.replace(/\.png$/, '')

    const post = await getEntry('blog', postSlug)

    if (!post) {
        return new Response('Not found', { status: 404 })
    }

    const robotoSerifData = await fs.readFile(
        './public/fonts/Roboto_Serif/static/RobotoSerif-Black.ttf'
    )

    const svg = await satori(
        {
            type: 'div',
            props: {
                children: [
                    {
                        type: 'h1',
                        props: {
                            children: post.data.title,
                            style: {
                                fontSize: '60px',
                            },
                        },
                    },
                    {
                        type: 'h2',
                        props: {
                            children: 'Adithya Nair',
                        },
                    },
                ],
                style: {
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#c4e6ea',
                    color: '#002327',
                    padding: '40px',
                },
            },
        },
        {
            width: 1200,
            height: 630,
            fonts: [
                {
                    name: 'Roboto',
                    data: robotoSerifData,
                    weight: 400,
                    style: 'normal',
                },
            ],
        }
    )

    const png = await sharp(Buffer.from(svg)).png().toBuffer()

    return new Response(png, {
        headers: {
            'Content-Type': 'image/png',
            'Cache-Control': 'public, max-age=31536000, immutable',
        },
    })
}
