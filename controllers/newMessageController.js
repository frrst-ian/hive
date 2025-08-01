const db = require("../db/queries");

async function newMessageHandler(req, res) {
    if (!req.user) {
        return res.redirect("/")
    }

    const userId = req.session.userId;
    const user = await db.getUserById(userId);

    const {title,text} = req.body;
    const created_at = new Date();

    await db.addNewMessage(req.user.id, title, text, created_at);
    res.redirect("/");
}

async function renderNewMessageForm(req, res) {
    if (!req.user) {
        return res.redirect("/");
    }
    res.render("new-message-form")
}

module.exports = { renderNewMessageForm, newMessageHandler };