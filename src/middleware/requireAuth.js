module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/auth/google");
    }
  },

  ensureLoggedIn: function (req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect("/?msg=loggedIn");
    } else {
      return next();
    }
  },

  ensureGuest: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      return next();
    }
  },
};
