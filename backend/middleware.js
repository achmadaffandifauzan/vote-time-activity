const ExpressError = require("./utils/ExpressError");
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next(new ExpressError("You're not logged in", 401));
  }
  return next();
};
