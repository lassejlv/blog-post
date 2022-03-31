const router = require("express").Router();
const User = require("../database/models/User");
const Post = require("../database/models/Post");
const moment = require("moment");

const {
  ensureAuth,
  ensureGuest,
  ensureAdmin,
  ensureLoggedIn,
} = require("../middleware/requireAuth");

router.get("/", ensureGuest, async (req, res) => {
  const post = await Post.find().sort({ createdAt: "desc" });

  res.render("index", {
    isLoggedIn: req.isAuthenticated(),
    user: req.user,
    posts: post,
    messageLoggedIn: req.query.msg === "loggedIn",
    messageDeleted: req.query.msg === "deleted",
  });
});

router.get("/post/:id", async (req, res) => {
  Post.findOne({ _id: req.params.id }, (err, post) => {
    if (post === null) {
      res.redirect("/");
    } else {
      res.render("post", {
        post: post
      })
    }
  });
});
module.exports = router;
