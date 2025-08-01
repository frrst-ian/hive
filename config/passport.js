const db = require("../db/queries")
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcryptjs');


passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            console.log('Strategy called with:', email);
            const user = await db.getUserByEmail(email)
            console.log('User found:', user);

            if (!user) {
                return done(null, false, { message: "Incorrect email" });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: "Incorrect password" });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        console.log('Deserializing user:', id);
        const user = await db.getUserById(id);
        console.log('Found user:', user);
        done(null, user);
    } catch (err) {
        console.error(err);
        done(err);
    }
});


module.exports = passport;