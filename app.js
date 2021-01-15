require("dotenv").config();
require("./dal/database");

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
const hbs = require("hbs");
const mathHelpers = require("handlebars-helpers")({ handlebars: hbs }, [
  "math",
  "number",
  "comparison"
]);
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const flash = require("connect-flash");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/book");
const authRouter = require("./routes/auth");

const app = express();

// view engine setup
hbs.registerPartials(path.join(__dirname, "views", "partials"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

//app.use(logger('dev'));
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

require("./passport/passport");
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,

    store: new MongoStore({ url: process.env.DB_URI, ttl: 60 * 60 }),
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  // res.locals.error = req.flash('error');
  next();
});

//routers
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", booksRouter);
app.use("/", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
