const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const messageValidation = [
    body("title")
        .trim()
        .escape()
        .isLength({ min: 1, max: 100 })
        .withMessage("Title must at least be 1-100 characters"),

    body("text")
        .trim()
        .isLength({ min: 1, max: 1000 })
        .withMessage("Message must be at least 1-1000 characters")
]

async function newMessageHandler(req, res) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render("new-message-form", {
                errors: errors.array(),
                formData: req.body
            })
        }

        if (!req.user) {
            return res.redirect("/")
        }

        const { title, text } = req.body;
        const created_at = new Date();

        await db.addNewMessage(title, text, created_at, req.user.id);
        res.redirect("/");
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

async function renderNewMessageForm(req, res) {
    if (!req.user) {
        return res.redirect("/");
    }
    
    res.render("new-message-form")
}

module.exports = { renderNewMessageForm, newMessageHandler, messageValidation };