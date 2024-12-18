<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
    <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
    <xsl:template match="/">
        <html xmlns="http://www.w3.org/1999/xhtml" lang="en" dir="ltr">
            <head>
                <title><xsl:value-of select="/rss/channel/title"/> RSS Feed</title>
                <meta charset="UTF-8" />
                <meta http-equiv="x-ua-compatible" content="IE=edge,chrome=1" />
                <meta http-equiv="content-language" content="en_US" />
                <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1,shrink-to-fit=no" />
                <meta name="referrer" content="none" />
                <!-- FAVICONS CAN GO HERE -->
                <style type="text/css">
                    body {
                    background-color: #1e1e2e;
                    color: #cdd6f4;
                    font-family: "Segoe UI", apple-system, BlinkMacSystemFont, Futura, Roboto, Arial, system-ui, sans-serif;
                    }
                    .container {
                        align-item: center;
                        display: flex;
                        justify-content: center;
                    }
                    .item {
                        max-width: 768px;
                    }
                    a {
                    color: #cba6f7;
                    text-decoration: none;
                    }
                    h3 {
                    }
                    footer {
                    color: #bac2de;
                    }
                    a:visited {
                        color: #89b4fa;
                    }
                    a:hover {
                        text-decoration: underline;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="item">
                        <header>
                            <h1>RSS Feed</h1>
                            <h2>
                                <xsl:value-of select="/rss/channel/title"/>
                            </h2>
                            <p>
                                <xsl:value-of select="/rss/channel/description"/>
                            </p>
                            <a hreflang="en" target="_blank">
                                <xsl:attribute name="href">
                                    <xsl:value-of select="/rss/channel/link"/>
                                </xsl:attribute>
                                Visit Website &#x2192;
                            </a>
                            <p>
                            If you're unfamiliar with what an RSS feed is, it's a great way to subscribe to blogs, and YouTube channels. There are many great RSS readers out there. You just take this link and paste it into your RSS reader to get notified about any posts I put out. Heck, you could do it by just pasting in <a href="https://adithyanair.com">https://adithyanair.com</a>
                            </p>
                        </header>
                        <main>
                            <h2>Recent Posts</h2>
                            <xsl:for-each select="/rss/channel/item">
                                <article>
                                    <h3>
                                        <a hreflang="en" target="_blank">
                                            <xsl:attribute name="href">
                                                <xsl:value-of select="link"/>
                                            </xsl:attribute>
                                            <xsl:value-of select="title"/>
                                        </a>
                                    </h3>
                                    <footer>
                                        Published:
                                        <time>
                                            <xsl:value-of select="substring(pubDate,0,17)"/>
                                        </time>
                                    </footer>
                                    <p>
                                    <xsl:value-of select="description"/>
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
