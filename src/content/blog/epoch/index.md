---
title: Notes On The Epoch Video
description: A small note on what we did and the inspiration behind it.
date: 2025-12-01
isEssay: true
---

Before you read any further, it's important that you see the [EPOCH video](https://www.instagram.com/p/DRsWaLAko99/) to get the required context.

I've been working on [ATLAS](https://atlasdev.club), the systems programming club I founded with [Nikhil](https://heftymouse.me) in my college and setting up something ambitious.

# The Background

One of the big things we envisioned was a community of people building a difficult project together and sharing their insights on the project. Taking inspiration from a  similar venture, [Tilde](https://hsp-ec.xyz/announcements/tilde-4.0) run by PES HSP, EC Campus. We wanted to build that culture of tackling difficult things and growing together.

A large part of the ATLAS aesthetic is retrofuturism; a worship of the 80s. Amber terminals, behemoth corporations and the sci-fi that came out of that era. Just look at the [NASA worm](https://animalia-life.club/qa/pictures/nasa-space-worm).

So, I knew I didn't want a traditional reel to promote the event. I wanted to do something different, inspired from the principles that inform the entirety of ATLAS' aesthetic while still feeling refreshing. 

The first piece of that puzzle was this [reel](https://www.instagram.com/p/DO-7phDDPB6/) from Nova Club that I stumbled upon in Instagram. It conveniently has the ATLAS orange and looks incredible. What a way to announce yourself.

The second piece of that puzzle was Daft Punk. They wrote the soundtrack that filled the soundstage of the movie Tron: Legacy, which is a movie that's got a cult fanbase of its own. I find the film lacking in plot, but despairingly beautiful. The soundtrack and visuals are made with such love and care. It's a genuine ode to the Tron universe. It's a film with a soundtrack that respects 80s sci-fi just as much as ATLAS is trying to do. 

There's a monologue in the beginning of that film that's used to start the main sonic motif of the entire film. It's in a track called The Grid. In isolation, with no context on what the story is about, it sounds somewhat like a man narrating his curiosity on what goes on inside a computer and finally "getting in". What a wonderful monologue for what systems programming feels like.

We were a bit worried about what we'd do for the ATLAS EPOCH video. I put some Daft Punk discography while I was programming when The Grid played. It's a distinct memory I had where I remember completely stopping and having this strong vision take over me. An orange terminal musing to itself, and at the emotional crescendo of the track, the text "ATLAS PRESENTS" in big letters almost overwhelming the screen.

I called up [Nikhil](https://heftymouse.me) immediately and frantically described the idea to him. The rest was history.

For the span of a week, this video consumed me. I would take my laptop everywhere trying to make this crazy vision a reality.

# The Technical Details

There are two main problems to solve:
1. How do we make this look retro?
2. How do we show text at the right time in a rapidly iterable way?

The retro part was handled completely for us. We used [cool-retro-term](https://github.com/Swordfish90/cool-retro-term) and tweaked the colours and settings until it looked perfect.

The only real problem to solve is syncing up text to music. We used a Golang based TUI framework called [BubbleTea](https://github.com/charmbracelet/bubbletea).

I then factored out all the lyrics data into its own JSON so we could easily control the timing and effects used without having to recompile the Go binary.

Here's an example JSON.

```json
[
  {
    "timestamp_ms": 44980,
    "duration_ms": 1500,
    "type": "lyric",
    "text": "I got in",
    "alignment": "center",
    "effect": "instant_flash"
  },
  {
    "timestamp_ms": 47270,
    "duration_ms": 4700,
    "type": "announcement",
    "text": "ATLAS",
    "subtext": "PRESENTS",
    "effect": "braille_big_text",
    "pulse_on_beat": false
  },
  {
    "timestamp_ms": 51970,
    "duration_ms": 4700,
    "type": "announcement",
    "text": "THE EPOCH PROGRAM",
    "subtext": "v0 // INIT",
    "effect": "braille_big_text",
    "pulse_on_beat": false
  }
]
```

This allowed us to control the speed, alignment and type. Announcements would be "special cases" and we'd pass in our special Braille logos when those showed up in the JSON.

The main challenge we ran into, which you'll also notice is that the font is a tad bit small. This is unfortunately a fundamental limitation of ASCII characters. You can either control the resolution of the terminal, making everything smaller or... show lesser text. Our ATLAS logo was too big to fit in anything other than this smaller font size.

## Kitty Graphics Dead End

One thing I tried was to use the Kitty Graphics Protocol and convert these logos into images that can then be shown on the terminal. Unfortunately, no major TUI framework currently supports that graphics protocol, it would require a lot more work from my end to write my own implementation that plays well with that framework.

(Note: [Nikhil](https://heftymouse.me) pointed out that [ratatui](https://ratatui.rs/) supports the protocol)

## Syncing Up Things

The last and final challenge was syncing up the monologue and the text with the audio track.

There was no getting around the manual work I had to do. I played back the program repeatedly hundreds of time to get the timestamp and duration *just* right.

It's the most boring work ever, but someone's gotta do it. I have practically memorized the timing and duration of every beat in the track now. This took me about an hour or two to do properly.

After that, it's a simple hyprctl command to set the aspect ratio and resolution of the window and then screen record it with OBS.

```sh
hyprctl dispatch resizewindowpixel exact <res1> <res2>,address:$(hyprctl activewindow -j | jq -r '.address')
```

## Poster

When all the work for the video was done, it was just a matter of writing a version of this that rendered all the text that shows up in one single frame instead of over video. Check it out [here](https://www.instagram.com/p/DRsYYOzk5Xz/).

# Closing Notes
A lot of the time spent on making this video is reaching dead ends in the process and trying new ways to get around them.

None of this would've been possible without the support of [Nikhil](https://heftymouse.me), the smartest guy I know. I'm grateful to have someone who believes in the wild ideas I come up with.
