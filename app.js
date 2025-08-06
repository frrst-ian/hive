require('dotenv').config();
const express = require("express");
const path = require("node:path");
const flash = require('connect-flash');
const session = require("express-session");
const pgSession = require('connect-pg-simple')(session);
const passport = require('./config/passport');
const PORT = process.env.PORT || 3000;

// Define routers
const indexRouter = require("./routes/index");
const signUpRouter = require("./routes/signUp");
const membershipRouter = require("./routes/membership");
const newMessageRouter = require("./routes/newMessage");
const adminRouter = require("./routes/admin");

const app = express();
const assetsPath = path.join(__dirname, "public");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({
  secret: 'cats',
  resave: false,
  saveUninitialized: false,
  store: new pgSession({
    conString: process.env.DB_URL,
    createTableIfMissing: true,
    ssl: { rejectUnauthorized: false }
  })
}));
app.use(passport.session());
app.use(flash());

app.use(express.urlencoded({ extended: false }));
app.use(express.static(assetsPath));

// Define middleware functions
app.use("/", indexRouter);
app.use("/sign-up", signUpRouter);
app.use("/membership", membershipRouter);
app.use("/new-message", newMessageRouter);
app.use("/admin", adminRouter);

app.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureFlash: "Wrong email or password!"
  })
);

app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));