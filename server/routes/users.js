const express = require("express");

const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/CatchAsync");
const { isLoggedIn } = require("../middleware");
const passport = require("passport");
const User = require("../models/user");

router.get("/api/currentUser", isLoggedIn, (req, res) => {
  return res.json({ user: req.user });
});
router.post(
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
          user: req.user,
        });
      });
    } catch (error) {
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
router.post(
  "/api/login",
  passport.authenticate("local"),
  catchAsync(async (req, res, next) => {
    res.json({
      message: "Successfully logged in!",
      flash: "success",
      user: req.user,
    });
  })
);
router.post(
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

module.exports = router;
