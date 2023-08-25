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
const LocalStrategy = require("passport-local");
const cors = require("cors");
const { isLoggedIn } = require("./middleware");
const ExpressError = require("./utils/ExpressError");
const catchAsync = require("./utils/CatchAsync");
const User = require("./models/user");
const VotingAgenda = require("./models/votingAgenda");
const VotingResult = require("./models/votingResult");

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
    methods: "GET,POST",
    // preflightContinue: true,
    credentials: true, // Allow credentials (cookies) to be included (for matching session ID from the client and session data from the server), because it use react (with) different port (3000) vs server (3100). in production, it should not be matter.
    // if disabled, req headers ommited (then meybe server cannot identify which user is which)
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
app.get("/api/currentUser", isLoggedIn, (req, res) => {
  return res.json({ user: req.user });
});
app.post(
  "/api/register",
  catchAsync(async (req, res, next) => {
    const { email, username, name, password } = req.body;
    try {
      const newUser = new User({ email, username, name });
      const registeredUser = await User.register(newUser, password);
      await newUser.save();
      req.login(registeredUser, (error) => {
        if (req.isAuthenticated()) {
          console.log("USER IS LOGGED IN");
        }
        if (error) return next(error);
        res.status(200);
        res.json({
          message: "Successfully Registered!",
          flash: "success",
        });
      });
    } catch (error) {
      console.log(error);
      if (error.message.includes("E11000")) {
        res.json({
          message:
            "A user with the given username or email is already registered",
          flash: "error",
        });
      } else {
        res.json({
          message: error.message,
          flash: "error",
        });
      }
    }
  })
);
app.post(
  "/api/login",
  passport.authenticate("local"),
  catchAsync(async (req, res, next) => {
    res.json({
      message: "Successfully logged in!",
      flash: "success",
    });
  })
);
app.post(
  "/api/logout",
  isLoggedIn,
  catchAsync(async (req, res, next) => {
    req.logout(async (error) => {
      if (error) return next(error);
    });
    return res.json({
      message: "Successfully logged out.",
      flash: "success",
    });
  })
);
app.post(
  "/api/createVoting",
  isLoggedIn,
  catchAsync(async (req, res, next) => {
    const { title, notes, dates, monthsWithYear, allowMultipleDateVotes } =
      req.body;
    try {
      const votingAgenda = new VotingAgenda({
        title,
        monthsWithYear,
        dates,
        votersName: [],
        totalVote: 0,
        allowMultipleDateVotes,
        notes,
      });
      for (let month of monthsWithYear) {
        const votingResult = new VotingResult();
        votingResult.monthWithYear = month;
        votingResult.votingAgenda = votingAgenda;
        votingAgenda.votingResults.push(votingResult);
        await votingResult.save();
      }
      await votingAgenda.save();
      return res.json({
        message: "Successfully created",
        flash: "success",
        redirectData: `${votingAgenda._id}`,
      });
    } catch (error) {
      return next(error);
    }
  })
);
app.get(
  "/api/vote/:id",
  catchAsync(async (req, res, next) => {
    try {
      const votingAgenda = await VotingAgenda.findById(req.params.id).populate(
        "votingResults"
      );
      if (!votingAgenda) return next(new ExpressError("Not Found!", 404));
      return res.json({
        votingAgenda,
      });
    } catch (error) {
      return next(error);
    }
  })
);
app.post(
  "/api/vote/:id",
  catchAsync(async (req, res, next) => {
    // reminder :
    // monthsWithYear -> [] (in VotingAgenda)
    // monthWithYear -> "" (in VotingResult)
    console.log(req.body);
    try {
      const { name, dates, monthsWithYear } = req.body;
      const votingAgenda = await VotingAgenda.findById(req.params.id);
      votingAgenda.votersName.push(name);
      votingAgenda.totalVote += 1;
      for (let month of monthsWithYear) {
        const votingResult = await VotingResult.findOne({
          votingAgenda: req.params.id,
          monthWithYear: month,
        });
        for (let date of dates) {
          const day = parseInt(date.split("-")[0]);
          votingResult.result[day].push({ name: name });
        }
        await votingResult.save();
        await votingAgenda.save();
        console.log(votingResult);
        console.log(votingAgenda);
        return res.json({
          message: "Successfully vote!",
          flash: "success",
          redirectData: req.params.id,
        });
      }
    } catch (error) {
      return next(error);
    }
  })
);
app.all("*", (req, res, next) => {
  next(new ExpressError("Not Found!", 404));
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
