const db = require("../db/queries");

async function newMessageHandler(req, res) {
    if (!req.user) {
       return  res.redirect("/")
    }

    const { title, text } = req.body;
}

async function renderNewMessageForm(req, res) {
     if (!req.user) {
       return  res.redirect("/");
    }
    res.render("new-message-form")
}

module.exports = { renderNewMessageForm, newMessageHandler };