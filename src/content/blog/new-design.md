---
title: New Design
date: 2025-06-04
description: The new design of my website, and the motivation behind it.
isEssay: true
isDraft: false
---

# Table Of Contents

# Why?

Funnily enough, this started as a bit. [Nikhil](https://heftymouse.me) is a devout worshipper of Microsoft's Fluent Design system. [Praanesh](https://compileartisan.pages.dev/) is a huge fan of Apple's design system. I felt that Google wasn't getting enough love, so I decided to change that. My website had some rough edges, and I thought this was a good time to see how much I've improved from my first attempt.

This design is pretty closely aligned in spirit with [Material 3](https://m3.material.io),

# Lessons Learned 

This redesign really makes as much use of Astro as much as possible. Everything is abstracted away into components, and code is written as concisely as possible. This makes no difference to the final website, but it makes things much more pleasant for me, who's writing it.

It's quite a rush to feel competent at something, and this was my opportunity to do just that. This was a stack I am now familiar with, and now I get to really see the payoffs of that.

I also faced firsthand the ["Second System Effect"](https://en.wikipedia.org/wiki/Second-system_effect). This being my second proper website, I spent way too much time trying to implement features that I didn't really need, this led to a lot of stagnant time when this redesign wasn't really worked on. I like to think this final website is clean while still being unique enough to stand out. It's got all the due diligences of a personal website (dark mode, RSS, a blog and an about).

# New Features

## Table Of Contents

I now can add a table of contents to certain blog posts, such as this one by just adding a top-level heading called "Table Of Contents". It's neat to navigate around. Doing this was as straightforward as adding the `remark-toc` plugin to my `astro.config.mjs`

## Dark Mode Switch

My first website did not have a dark mode switch, I just blatantly copied the [catppuccin](https://catppuccin.com/) theme and called it a day. I was too intimidated by JavaScript to even touch the language at the time.

Exposure therapy worked wonders, and now I am comfortable in doing what I want with the language. There's a working dark mode switch, which defaults to your preference at first, which I'm very happy about.

## Colour Changing By Day

Material 3 creates the colour scheme out of your wallpaper. I couldn't really pull that off, so what I opted for instead was a colour scheme that changes every day. I was initially going to just have it rotate through a predefined set of colour schemes, but I read this [blog post](https://supergeekery.com/blog/create-mathematically-generated-css-color-schemes-with-oklch) by John F Morton, and it was exactly what I wanted.

Matt Webb over at [Interconnected](https://interconnected.org/) allows people to see the cursors of other people while reading his blog. I like to think that having a unique colour scheme every day provides a touch of that same feeling. Anyone who visits my site on a particular day will get the same colour scheme.

### A Detour About Oklch

OKLCH is a colour space, which uses lightness, chroma and hue as parameters. What this means is, making a monochrome colour scheme is dead simple. I can fix the hue and adjust along the lightness and chroma axis.

Here's the entire colour scheme:
```css
@theme {
    --color-material-100: oklch(97% 0.04 var(--hue));
    --color-material-200: oklch(18% 0.59 var(--hue));
    --color-material-300: oklch(89% 0.05 var(--hue));
    --color-material-400: oklch(80% 0.12 var(--hue));
    --color-material-500: oklch(71% 0.19 var(--hue));
    --color-material-600: oklch(60% 0.27 var(--hue));
    --color-material-700: oklch(38% 0.12 var(--hue));
    --color-material-800: oklch(25% 0.04 var(--hue));
    --color-material-900: oklch(12% 0.03 var(--hue));
}
```

The individual values are just me tweaking around with what seemed to work for me.

I really like thinking about colour in this way, fixing a hue, and then adjusting the lightness and chroma parameters gave me exactly what I wanted.

The way the colourscheme changer works is by using the current date as the seed for a random number generator, run through a sine function to really shake things up, and finally squeezed into the range 0-360. 

This number is then set as a CSS variable, and every other CSS variable uses this as the base hue.

### Syntax Highlighting

I used a custom [Prism](https://prismjs.com/) stylesheet that renders code with the computed colours. I took notes mainly from the [DuoTone](https://simurai.com/projects/2016/01/01/duotone-themes) themes by simurai.

I wanted to make a dark theme, but the way the light theme against the dark mode *really* stood out for me. I'm not sure but I might not actually make a dark mode variant.

```python
a = 5
# THIS IS A COMMENT
def a():
    print("Hello World")
    print(a)
```

### RSS Feed

If you view my [rss.xml](/rss.xml), you'll notice that it is:
1. Styled and readable on browser, which isn't usually the case with XML.
2. Following the same color scheme as the rest of my website.

This is done with XSLT, which converts XML to readable HTML, this also means that the browser will treat the document it receives from the XML as a normal document. From there, it's as simple as adding a `<style>` and a `<script>` tag. Surprisingly, I didn't have to prefetch the script to execute it before the content loads. To test this properly, I made the script execute at the end, and there's no flashes of colour.

My hypothesis is, the browser parses the newly created HTML, runs all scripts and CSS before even rendering? This would also explain why `DOMContentLoaded` wasn't firing off at first. This doesn't sound right, but it's my best working theory.

## Math

I have support for Math now, with [$\KaTeX$](https://katex.org/). This was simple to do as well, I just added the `remark-math` and `rehype-katex` plugins, added the KaTeX script to the HTML head and I was done.

Here's an equation:
$$
L = \frac{1}{2} \rho v^2 S C_L
$$

Here's some inline math, $x + y$.

I'm just waiting for the day when I can just use Typst syntax for this stuff, it's way better.

I chose $\KaTeX$ over MathJaX because I prefer performance over completeness as of right now.
## The Garden

The garden is something I've always wanted to ever since my first version of the website. I love taking quotes from books and other places. The original version of this was a [Quartz](https://quartz.jzhao.xyz/) website, and I realized I couldn't really fit things properly. It's more of an Obsidian Publish alternative than an actual way to showcase things.

I ended up just doing things myself, and that's what you can see [here](/garden).

I'm now using [Raindrop](https://raindrop.io/) to fetch bookmarks tagged a specific way and then rendering them.

# The Music Widget

I stole this idea from [Cory Dransfeldt](https://coryd.dev), he has a Now Playing widget at the top of his home page.

On the home page, I have a widget showing my top song of the last week. This is a simple Astro endpoint that queries [last.fm](https://last.fm). It's straightforward to implement, but it had issues with blocking rendering which I resolved by just moving critical scripts to execute before the fetching happens.

Earlier the screen would flash light before moving to dark mode, since I wrapped the dark mode code inside of the theme switcher component, which doesn't get rendered yet. Now that's mitigated by simply moving the theme setting code to the head before rendering.

# The Blog

The blog is going to stay the same, hopefully with more posts down the line. I'm going to start swaying a bit more technical, but I've decided to remove the dichotomy behind essays and blogs. The home page will show the last few *essays* as a good first look, but other than that, I make no distinction.

# Changes From The Old Design

## New Home Page

The new layout is a more dense one, compared to the old one. It has 3 of my most recent posts and the music widget.

## Bookmarks

I have removed the old bookmarks page in favour of The Garden. This is for two main reasons:

1. The bookmarks were stored in a `.json` file, and was very tedious to maintain.
2. Many of the bookmarks did not stay evergreen, meaning none of them needed to persist in a permanent way on my website.

This led to me having a higher amount of friction in even adding a bookmark to the list. Most of that has been moved over to [Essential Links](/garden/bookmarks).

# Conclusion

I found this experience instructive. I learned quite a lot while trying to build this.

I am my own target audience for this website, and whatever I say goes. That's a very unique place for a project to have, and I'm satisfied with the way this looks. I'm going to miss having this redesign to procrastinate on when I'm supposed to be focusing on my coursework or my end-semester projects.
