const db = require("../db/queries");
const adminPassword = process.env.ADMIN_PASSWORD;

async function adminHandler(req, res, next) {
    try {
        const userId = req.user.id;
        const password = req.body.password;

        if (password !== adminPassword) {
            return res.render("admin-form", { error: "Invalid Password" })
        }

        const user = await db.getUserById(userId);

        if (user.membership_status === 'admin') {
            res.redirect("/");
        }

        await db.updateToAdmin(userId);
        await db.updateToPremium(userId);

        res.redirect("/")
    } catch (error) {
        next(error);
    }
}

async function renderAdminForm(req, res) {
    try {
        const userId = req.user.id;
        const user = await db.getUserById(userId);
        if (user.membership_status === 'admin') {
            res.redirect("/");
        }
        res.render("admin-form");
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}


module.exports = { renderAdminForm, adminHandler };