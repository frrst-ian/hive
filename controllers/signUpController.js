const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

const signUpValidation = [
    body("firstName")
        .trim()
        .escape()
        .isLength({ min: 1, max: 50 })
        .withMessage("First name must be 1-50 characters"),

    body("lastName")
        .trim()
        .escape()
        .isLength({ min: 1, max: 50 })
        .withMessage("Last name must be 1-50 characters"),

    body("email")
        .trim()
        .escape()
        .normalizeEmail()
        .isEmail()
        .withMessage("Please enter a valid email")
        .custom(async (email) => {
            const existingUser = await db.getUserByEmail(email);
            if (existingUser) {
                throw new Error("*Email already exists");

            }
        }),

    body("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage("*Password must be at least 6 characters")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage("*Password must contain lowercase, uppercase, and number"),

    body("confirmPassword")
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("*Password do not match");
            }
            return true;
        })
];

async function signUpHandler(req, res, next) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render("sign-up-form", {
                errors: errors.array(),
                formData: req.body
            });
        }

        const email = req.body.email;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await db.signUp(firstName, lastName, email, hashedPassword);

        req.login(newUser, function (err) {
            if (err) { return next(err); }
            return res.redirect("/membership");
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

async function renderSignUpForm(req, res) {
    res.render("sign-up-form", { errors: [] });
}

module.exports = { signUpHandler, renderSignUpForm, signUpValidation };
