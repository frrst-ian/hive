const db = require("../db/queries");

async function getIndex(req, res) {
    try {
        const messages = await db.getAllMessages();
        res.render("index", { user: req.user, messages });
    } catch (error) {
        res.status(500).send("Server Error");
    }
}

module.exports = { getIndex };