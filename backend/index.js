if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoSanitize = require("express-mongo-sanitize");
const ExpressError = require("./utils/ExpressError");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const catchAsync = require("./utils/CatchAsync");
const cors = require("cors");

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

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
if (process.env.NODE_ENV !== "production") {
  app.use(express.static(path.join(__dirname, "frontend/public")));
} else {
  app.use(express.static(path.join(__dirname, "build")));
}

app.use(express.static(path.join(__dirname, "public")));
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
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 2,
    maxAge: 1000 * 60 * 60 * 24,
  },
};
app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  console.log("ASD");
  res.locals.currentUser = req.user;
  console.log("ASD");
  next();
});

app.post(
  "/api/register",
  catchAsync(async (req, res, next) => {
    const { email, name, password } = req.body;
    try {
      const newUser = new User({ email, name });
      const registeredUser = await User.register(newUser, password);
      await newUser.save();
      req.login(registeredUser, (error) => {
        if (error) return next(error);
        console.log(newUser);
        res.status(200);
        res.json({
          message: "Successfully Register!",
        });
      });
    } catch (error) {
      res.json({
        error: error,
      });
    }
  })
);

app.all("*", (req, res, next) => {
  next(new ExpressError("Not Found!", 404));
});
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something Went Wrong!";
  res.status(statusCode);
  res.json({
    message: err.message,
    error: err,
  });
});
const PORT = process.env.PORT || 3100;

//Connect to the database before listening
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} ~express`);
});
