Ajax.get(articleListUrl, function (res) {
    try {
        res = JSON.parse(res)
        addAllName(res, document.getElementById('article_list'), 0, false)
    } catch (err) {
        res = {}
    }
})
