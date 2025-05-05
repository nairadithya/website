export function getSubPage(link: URL) {
    let path = link.pathname
    if (path == '/') {
        return 'home'
    }
    let subPageString = path.match(/\/(\w+).*/)[1]
    return subPageString
}
