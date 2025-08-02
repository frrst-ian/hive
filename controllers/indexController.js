const db = require("../db/queries");

async function getIndex(req, res) {
    res.render("index", { user: req.user })
}

async function getAllMessagesHandler(req, res) {
    try {
        const messages = await db.getAllMessages();

        if (!messages) {
            res.render("index", { messages, edgeCase: "No messages exists." });
        }

        res.render("index");
    } catch (error) {
        res.status(505).send("No messages exists");
    }
}

module.exports = { getIndex, getAllMessagesHandler };