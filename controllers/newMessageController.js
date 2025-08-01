const db = require("../db/queries");

async function newMessageHandler(req, res) {
    if (!req.user) {
        return res.redirect("/")
    }

    const userId = req.session.userId;

    const { title, text } = req.body;
    const created_at = new Date();

    await db.addNewMessage(title, text, created_at, req.user.id);
    res.redirect("/");
}

async function renderNewMessageForm(req, res) {
    if (!req.user) {
        return res.redirect("/");
    }
    res.render("new-message-form")
}

module.exports = { renderNewMessageForm, newMessageHandler };