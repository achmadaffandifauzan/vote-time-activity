if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoSanitize = require("express-mongo-sanitize");
const passport = require("passport");
const cors = require("cors");
const ExpressError = require("./utils/ExpressError");
const User = require("./models/user");
const userRoutes = require("./routes/users");
const voteRoutes = require("./routes/votes");

const dbUrl = process.env.DB_URL;
mongoose.set("strictQuery", true);
mongoose.connect(dbUrl);

mongoose.connection.on(
  "error",
  console.error.bind(console, "connection error:")
);
mongoose.connection.once("open", () => {
  console.log("Database Connected ~mongoose");
});
const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:3000",
      methods: "GET,POST",
      // preflightContinue: true,
      credentials: true, // Allow credentials (cookies) to be included (for matching session ID from the client and session data from the server), because it use react (with) different port (3000) vs server (3100). in production, it should not be matter.
      // if disabled, req headers ommited (then meybe server cannot identify which user is which)
    })
  );
  // console.log(path.join(__dirname.replace("\\server", ""), "client/public"));
  app.use(
    express.static(
      path.join(__dirname.replace("\\server", ""), "client/public")
    )
  );
} else {
  app.use(express.static(path.join(__dirname, "build")));
}

// app.use(express.static(path.join(__dirname, "public")));
// app.use(express.urlencoded({ extended: true })); // its for html post form, also application/x-www-form-urlencoded, but post from react, use express.json() middleware
app.use(express.json());
mongoSanitize.sanitize({
  allowDots: true,
  replaceWith: "_",
});

const secret = process.env.SECRET;
const store = MongoStore.create({
  mongoUrl: dbUrl,
  secret,
  touchAfter: 24 * 60 * 60, // time period in seconds
});
store.on("error", function (e) {
  console.log("SESSION STORE ERROR : ", e);
});
const sessionConfig = {
  store,
  name: "session",
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: false,
    expires: Date.now() + 1000 * 60 * 60 * 4,
    maxAge: 1000 * 60 * 60 * 2,
  },
};
app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});
app.use("/", userRoutes);
app.use("/", voteRoutes);

app.all("*", (req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    next(new ExpressError("Not Found!", 404));
  } else {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  }
});

// accepting error from express error, middleware (next(error)), or anywhere else
// then pass it to client as error object with message (in json)
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something Went Wrong!";
  res.status(statusCode);
  res.json({
    message: err.message,
    flash: "error",
  });
});
const PORT = process.env.PORT || 3100;

//Connect to the database before listening
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} ~express`);
});
