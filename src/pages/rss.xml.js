import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import sanitizeHtml from 'sanitize-html'
import MarkdownIt from 'markdown-it'
const parser = new MarkdownIt()

export async function GET(context) {
    var essays = await getCollection('essays')
    essays.push.apply(essays, await getCollection('journal'))
    essays.sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    return rss({
        stylesheet: '/rss/styles.xsl',
        title: "Adithya Nair's Website",
        description: 'A place where I wonder out loud.',
        site: context.site,
        items: essays.map((post) => ({
            title: post.data.title,
            pubDate: post.data.date,
            description: post.data.description,
            link: `/essays/${post.slug}/`,
            content: sanitizeHtml(parser.render(post.body), {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
            }),
        })),
    })
}
