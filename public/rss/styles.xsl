<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:atom="http://www.w3.org/2005/Atom"
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
    version="3.0"
>
    <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
    <xsl:template match="/">
        <html xmlns="http://www.w3.org/1999/xhtml" lang="en" dir="ltr">
            <head>
                <title>
                    <xsl:value-of select="/rss/channel/title"/> RSS Feed
                </title>
                <meta charset="UTF-8" />
                <meta http-equiv="x-ua-compatible" content="IE=edge,chrome=1" />
                <meta http-equiv="content-language" content="en_US" />
                <meta
                    name="viewport"
                    content="width=device-width,minimum-scale=1,initial-scale=1,shrink-to-fit=no"
                />
                <meta name="referrer" content="none" />
                <style type="text/css">
                    :root {
                        --hue: 0deg;
                        font-family: 'Roboto Serif', 'sans-serif';
                        background-color: oklch(97% 0.04 var(--hue));
                        color: oklch(30% 0.06 var(--hue));
                    }
                    .container {
                        align-item: center;
                        display: flex;
                        justify-content: center;
                    }
                    h1 {
                        font-size: 2.25rem;
                    }
                    h2 {
                        font-size: 1.875rem;
                    }
                    .item {
                        max-width: 50%;
                    }
                    a {
                        color: oklch(38% 0.12 var(--hue));
                        text-decoration: underline;
                    }
                    footer {
                        color: var(--color-fg);
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="item">
                        <header>
                            <h1>RSS Feed</h1>
                            <h2>
                                <xsl:value-of select="/rss/channel/title" />
                            </h2>
                            <p>
                                <xsl:value-of
                                    select="/rss/channel/description"
                                />
                            </p>
                            <p>
                                <a
                                    href="https://aboutfeeds.com/"
                                    target="_blank"
                                    >What's RSS? →
                                </a>
                            </p>
                            <p>
                                <a hreflang="en" target="_blank"
                                    ><xsl:attribute name="href"
                                        ><xsl:value-of
                                            select="/rss/channel/link"
                                    /></xsl:attribute>
                                    Visit Website →
                                </a>
                            </p>
                        </header>
                        <main>
                            <h2>Recent Posts</h2>
                            <xsl:for-each select="/rss/channel/item">
                                <article>
                                    <h3>
                                        <a hreflang="en" target="_blank">
                                            <xsl:attribute name="href">
                                                <xsl:value-of select="link" />
                                            </xsl:attribute>
                                            <xsl:value-of select="title" />
                                        </a>
                                    </h3>
                                    <footer>
                                        Published:
                                        <time
                                            ><xsl:value-of
                                                select="substring(pubDate,0,17)"
                                        /></time>
                                    </footer>
                                    <p>
                                        <xsl:value-of select="description" />
                                    </p>
                                </article>
                            </xsl:for-each>
                        </main>
                    </div>
                </div>

                <script>
                    function seededRandom(daySeed) {
                        const x = Math.sin(daySeed) * 10000
                        return x - Math.floor(x)
                    }

                    function getDailyHueSeeded() {
                        const now = new Date()
                        const startOfYear = new Date(now.getFullYear(), 0, 1)

                        const dayOfYear = Math.floor(
                            (now.getTime() - startOfYear.getTime()) /
                                (24 * 60 * 60 * 1000)
                        )
                        const randomValue = seededRandom(dayOfYear)

                        return Math.floor(randomValue * 360)
                    }

                    const hueSeeded = getDailyHueSeeded()
                    document.documentElement.style.setProperty(
                        '--hue',
                        `${hueSeeded}deg`
                    )
                </script>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
