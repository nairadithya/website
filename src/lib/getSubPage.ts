function getSubPage(link: URL) {
    let path: String = link.pathname
    let subPage: String = path.match(/(\w+)/)[1]
    return subPage
}
