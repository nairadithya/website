export function getSubPage(link: URL) {
    let path: String | null = link.pathname
    if (path == '/') {
        return 'home'
    }
    let subPageString: String | null = path.match(/\/(.+)/)[1]
    return subPageString
}
