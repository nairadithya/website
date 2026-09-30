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
                        color-scheme: light dark;
                        --background: light-dark(
                            oklch(0.9557 0.003 286.35),
                            oklch(0.18 0.006 258)
                        );
                        --foreground: light-dark(
                            oklch(0.2511 0.006 258.36),
                            oklch(0.9187 0.003 264.54)
                        );
                        --accent: light-dark(
                            oklch(0.4736 0.185 259.89),
                            oklch(0.8017 0.091 258.88)
                        );
                        --secondary: light-dark(
                            oklch(0.5883 0.158 145.05),
                            oklch(0.8877 0.096 147.71)
                        );
                        --gray: light-dark(
                            oklch(0.5682 0.004 247.89),
                            oklch(0.7503 0.002 247.85)
                        );
                        --rule: color-mix(
                            in oklch,
                            var(--foreground) 16%,
                            var(--background)
                        );
                        --accent-hover: light-dark(
                            oklch(0.4348 0.17 260.2),
                            oklch(0.8966 0.046 260.67)
                        );
                    }
                    html,
                    body {
                        min-height: 100%;
                        margin: 0;
                    }
                    body {
                        background: var(--background);
                        color: var(--foreground);
                        font-family: 'IBM Plex Mono', ui-monospace, monospace;
                        line-height: 1.6;
                    }
                    .container {
                        display: flex;
                        justify-content: center;
                        padding: 2rem 1rem;
                    }
                    .item {
                        width: 100%;
                        max-width: 76ch;
                    }
                    header {
                        padding-bottom: 1.5rem;
                        border-bottom: 2px solid var(--secondary);
                    }
                    header::before {
                        content: '';
                        display: block;
                        width: min(100%, 16.25rem);
                        height: 2px;
                        margin-bottom: 2px;
                        background: var(--accent);
                    }
                    h1,
                    h2,
                    h3 {
                        font-family: 'IBM Plex Serif', Georgia, serif;
                        line-height: 1.3;
                    }
                    h1 {
                        margin: 0 0 0.5rem;
                        font-size: clamp(2rem, 6vw, 3rem);
                    }
                    h2 {
                        margin: 1rem 0 0.5rem;
                        font-size: clamp(1.5rem, 4vw, 1.875rem);
                    }
                    header h2 {
                        margin-top: 0;
                    }
                    header p {
                        color: var(--gray);
                    }
                    a {
                        color: var(--accent);
                        text-decoration: underline;
                        text-decoration-thickness: 1px;
                        text-underline-offset: 0.18em;
                    }
                    a:hover,
                    a:focus-visible {
                        color: var(--accent-hover);
                    }
                    article {
                        padding: 1rem 0 1.25rem;
                        border-bottom: 1px solid var(--rule);
                    }
                    article h3 {
                        margin: 0;
                        font-size: 1.25rem;
                    }
                    article footer {
                        margin-top: 0.25rem;
                        color: var(--secondary);
                        font-size: 0.85rem;
                    }
                    article p {
                        margin: 0.5rem 0 0;
                        color: var(--gray);
                    }
                    @media (min-width: 30em) {
                        .container {
                            padding: 3rem 2rem;
                        }
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

            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
