// Stolen from https://supergeekery.com/blog/create-mathematically-generated-css-color-schemes-with-oklch

function seededRandom(daySeed) {
    const x = Math.sin(daySeed) * 10000
    return x - Math.floor(x)
}

function getDailyHueSeeded() {
    const now = new Date()
    const startOfYear = new Date(now.getFullYear(), 0, 1)

    const dayOfYear = Math.floor(
        (now.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)
    )
    const randomValue = seededRandom(dayOfYear)

    return Math.floor(randomValue * 360)
}

const hueSeeded = getDailyHueSeeded()
document.documentElement.style.setProperty('--hue', `${hueSeeded}deg`)
/**
 * Creates a pseudo-random float in the range [0, 1) using Math.sin
 * of a seed, ensuring a stable output for each unique integer seed.
 */
document.addEventListener('astro:page-load', () => {
    const hueSeeded = getDailyHueSeeded()
    document.documentElement.style.setProperty('--hue', `${hueSeeded}deg`)
})
