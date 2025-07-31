async function getIndex(req, res) {
    res.render("index", { message: "hello world" })
}

module.exports = { getIndex };