const db = require("../db/queries");
const secretPassword = process.env.SECRET_PASSWORD;

async function membershipHandler(req, res, next) {
    try {
        const userId = req.session.userId;
        const password = req.body.password;

        if (password !== secretPassword) {
            return res.render("membership-form",
                { error: "Invalid password" });
        }

        const user = await db.getUserById(userId);

        if (user.membership_status === 'premium') {
            return res.redirect("/");
        }

        await db.updateMembership(userId);
        res.redirect("/");
    } catch (error) {
        next(error);
    }
}

async function renderMembershipForm(req, res) {
    const userId = req.session.userId;
    const user = await db.getUserById(userId);

    if (user.membership_status === 'premium') {
        return res.redirect("/");
    }

    res.render("membership-form");
}

module.exports = { membershipHandler, renderMembershipForm };