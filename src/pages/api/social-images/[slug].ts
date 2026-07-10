import fs from 'node:fs/promises'
import satori from 'satori'
import sharp from 'sharp'
import { getCollection, getEntry } from 'astro:content'
import type { APIRoute, GetStaticPaths } from 'astro'

// Dark theme colors (matching oklch values from global.css)
const BG = '#0a0404' // oklch(12% 0.015 20)
const FG = '#eeedea' // oklch(93% 0 0)
const ACCENT = '#bc44cc' // oklch(55% 0.13 300)
const GRAY = '#b3b3b3' // oklch(75% 0 0)

const FONT_SERIF = 'IBM Plex Serif'
const FONT_MONO = 'IBM Plex Mono'

// Default site OG card
const DEFAULT_TITLE = 'Adithya Nair'
const DEFAULT_BYLINE = 'Student, Programmer & Writer'

export const getStaticPaths: GetStaticPaths = async () => {
    const [posts, garden] = await Promise.all([
        getCollection('blog'),
        getCollection('garden'),
    ])
    return [
        ...posts.map((post) => ({ params: { slug: `${post.id}.png` } })),
        ...garden.map((entry) => ({ params: { slug: `${entry.id}.png` } })),
        { params: { slug: 'default.png' } },
    ]
}

export const GET: APIRoute = async ({ params }) => {
    const { slug } = params

    if (!slug) return new Response('Slug is required', { status: 400 })

    const id = slug.replace(/\.png$/, '')

    let title: string
    let byline: string

    if (id === 'default') {
        title = DEFAULT_TITLE
        byline = DEFAULT_BYLINE
    } else {
        const post = await getEntry('blog', id)
        if (post) {
            title = post.data.title
        } else {
            const gardenEntry = await getEntry('garden', id)
            if (gardenEntry) {
                title = gardenEntry.data.title
            } else {
                return new Response('Not found', { status: 404 })
            }
        }
        byline = 'Adithya Nair'
    }

    const [serifFont, monoFont] = await Promise.all([
        fs.readFile('./public/fonts/IBMPlexSerif-Regular.ttf'),
        fs.readFile('./public/fonts/IBMPlexMono-Regular.ttf'),
    ])

    const isLongTitle = title.length > 60
    const titleSize = isLongTitle ? '48px' : '60px'

    const svg = await satori(
        {
            type: 'div',
            props: {
                children: [
                    {
                        type: 'div',
                        props: {
                            children: title,
                            style: {
                                fontFamily: FONT_SERIF,
                                fontSize: titleSize,
                                fontWeight: 600,
                                color: FG,
                                lineHeight: 1.25,
                                marginBottom: '20px',
                            },
                        },
                    },
                    // Double accent rule (matches site's 4px double border motif)
                    {
                        type: 'div',
                        props: {
                            style: {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '2px',
                                marginBottom: '28px',
                            },
                            children: [
                                {
                                    type: 'div',
                                    props: {
                                        style: {
                                            height: '2px',
                                            width: '260px',
                                            background: ACCENT,
                                        },
                                    },
                                },
                                {
                                    type: 'div',
                                    props: {
                                        style: {
                                            height: '2px',
                                            width: '260px',
                                            background: ACCENT,
                                        },
                                    },
                                },
                            ],
                        },
                    },
                    {
                        type: 'div',
                        props: {
                            children: byline,
                            style: {
                                fontFamily: FONT_MONO,
                                fontSize: '22px',
                                color: GRAY,
                            },
                        },
                    },
                    {
                        type: 'div',
                        props: {
                            children: 'adithyanair.com',
                            style: {
                                fontFamily: FONT_MONO,
                                fontSize: '18px',
                                color: GRAY,
                                opacity: 0.5,
                                marginTop: '6px',
                            },
                        },
                    },
                ],
                style: {
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    backgroundColor: BG,
                    padding: '80px 72px',
                },
            },
        },
        {
            width: 1200,
            height: 630,
            fonts: [
                {
                    name: FONT_SERIF,
                    data: serifFont,
                    weight: 600,
                    style: 'normal',
                },
                {
                    name: FONT_MONO,
                    data: monoFont,
                    weight: 400,
                    style: 'normal',
                },
            ],
        }
    )

    const png = new Uint8Array(
        await sharp(Buffer.from(svg)).png().toBuffer()
    )

    return new Response(png, {
        headers: {
            'Content-Type': 'image/png',
            'Cache-Control': 'public, max-age=31536000, immutable',
        },
    })
}