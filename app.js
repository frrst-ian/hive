
const express = require("express");
const path = require("node:path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const indexRouter = require("./routes/index");
const signUpRouter = require("./routes/signUp");
const PORT = process.env.PORT || 3000;

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "public");

app.use(session({ secret: 'cats', resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(assetsPath))

// Define middleware functions
app.use("/", indexRouter);
app.use("/sign-up", signUpRouter);



app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));