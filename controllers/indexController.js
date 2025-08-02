const db = require("../db/queries");

async function getIndex(req, res) {
    try {
        const messages = await db.getAllMessages();

        res.render("index", { user: req.user, messages });
    } catch (error) {
        res.status(505).send("No messages exists");
    }
}

module.exports = { getIndex };