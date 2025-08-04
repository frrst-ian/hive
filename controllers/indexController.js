const db = require("../db/queries");

async function getAllMessages(req, res) {
    try {
        const messages = await db.getAllMessages();
        res.render("index", { user: req.user, messages, author: "Say my name", errors: req.flash() });
    } catch (error) {
        res.status(500).send("Server Error");
    }
}

// Function to delete a message (admin only)
async function deleteMessageHandler(req, res, next) {
    try {
        const messageId = req.body.messageId;
        await db.deleteMessage(messageId);

        res.redirect("/")
    } catch (error) {
        next(error)
    }
}

module.exports = { getAllMessages, deleteMessageHandler };