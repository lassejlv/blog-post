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
      res.redirect("/dashboard");
    } else {
      return next();
    }
  },

  ensureAdmin: function (req, res, next) {
    if (req.isAuthenticated() && req.user.site_admin === true) {
      return next();
    } else {
      res.send("Page was not found on the server?");
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
