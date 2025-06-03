export async function GET() {
    try {
        const apiURL = `http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${import.meta.env.LAST_FM_USERNAME}&period=7day&limit=1&api_key=${import.meta.env.LAST_FM_API_KEY}&format=json`
        const response = await fetch(apiURL)
        if (!response.ok) {
            return new Response(null, {
                status: 404,
                statusText: 'Some Error',
            })
        }
        const data = await response.json()
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
