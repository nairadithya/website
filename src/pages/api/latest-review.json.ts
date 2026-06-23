export async function GET() {
    try {
        const response = await fetch('https://letterboxd.com/nairadithya/rss/')
        if (!response.ok) {
            return new Response(null, {
                status: 404,
                statusText: 'Failed to fetch RSS',
            })
        }

        const xml = await response.text()

        const item = extractTag(xml, 'item')
        if (!item) {
            return new Response(null, {
                status: 404,
                statusText: 'No items in RSS',
            })
        }

        const rawTitle = extractTag(item, 'title') ?? ''
        const link = extractTag(item, 'link') ?? ''
        const filmTitle = extractTag(item, 'letterboxd:filmTitle') ?? ''
        const filmYear = extractTag(item, 'letterboxd:filmYear') ?? ''
        const ratingStr = extractTag(item, 'letterboxd:memberRating') ?? ''
        const description = extractTag(item, 'description') ?? ''

        const rating = ratingStr ? parseFloat(ratingStr) : null
        const stars = rating !== null ? ratingToStars(rating) : null
        const starStates = rating !== null ? ratingToStarStates(rating) : null

        const data = {
            title: rawTitle,
            film: filmTitle,
            year: filmYear ? parseInt(filmYear) : null,
            rating,
            stars,
            starStates,
            link,
            description,
        }

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        })
    } catch {
        return new Response(null, {
            status: 404,
            statusText: 'Some Error',
        })
    }
}

function extractTag(xml: string, tag: string): string | null {
    const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`))
    return match ? match[1].trim() : null
}

function ratingToStars(rating: number): string {
    const full = Math.floor(rating)
    const half = rating % 1 >= 0.25 && rating % 1 < 0.75
    const empty = 5 - full - (half ? 1 : 0)
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty)
}

function ratingToStarStates(rating: number): Array<'full' | 'half' | 'empty'> {
    const full = Math.floor(rating)
    const half = rating % 1 >= 0.25 && rating % 1 < 0.75
    const empty = 5 - full - (half ? 1 : 0)
    return [
        ...Array<'full'>(full).fill('full'),
        ...(half ? (['half'] as const) : []),
        ...Array<'empty'>(empty).fill('empty'),
    ]
}
