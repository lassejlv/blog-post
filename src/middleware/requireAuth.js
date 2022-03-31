const Post = require("../database/models/Post");

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

  ensurePostAuhor: function (req, res, next) {
    Post.findById(req.params.id, (err, post) => {
      if (post.author[0] === req.user.id) {
        return next();
      } else {
        res.redirect("/");
      }
    });
  },

  ensureGuest: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      return next();
    }
  },
};
