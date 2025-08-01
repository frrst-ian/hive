require('dotenv').config();
const express = require("express");
const path = require("node:path");
const session = require("express-session");
const passport = require('./config/passport');
const PORT = process.env.PORT || 3000;

const indexRouter = require("./routes/index");
const signUpRouter = require("./routes/signUp");
const membershipRouter = require("./routes/membership");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "public");

app.use(session({ secret: 'cats', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(assetsPath))

// Define middleware functions
app.use("/", indexRouter);
app.use("/sign-up", signUpRouter);
app.use("/membership", membershipRouter);

app.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
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