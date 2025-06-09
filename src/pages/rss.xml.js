import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import sanitizeHtml from 'sanitize-html'
import MarkdownIt from 'markdown-it'
const parser = new MarkdownIt()

export async function GET(context) {
    let posts = await getCollection('blog')
    posts = posts
        .filter((post) => !post.data.isDraft)
        .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    return rss({
        stylesheet: '/rss/styles.xsl',
        title: "Adithya Nair's Website",
        description: 'A place where I wonder out loud.',
        site: context.site,
        items: posts.map((post) => ({
            title: post.data.title,
            pubDate: post.data.date,
            description: post.data.description,
            link: `/blog/${post.id}`,
            content: sanitizeHtml(parser.render(post.body), {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
            }),
        })),
    })
}
