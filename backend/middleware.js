module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.json({
      message: "You're not logged in",
      status: "error",
    });
  }
  return next();
};
