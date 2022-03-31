const router = require("express").Router();
const User = require("../database/models/User");
const Post = require("../database/models/Post");
const moment = require("moment");

const {
  ensureAuth,
  ensureGuest,
  ensureAdmin,
  ensureLoggedIn,
  ensurePostAuhor,
} = require("../middleware/requireAuth");

router.get("/", ensureGuest, async (req, res) => {
  const post = await Post.find().sort({ createdAt: "desc" });

  res.render("index", {
    isLoggedIn: req.isAuthenticated(),
    user: req.user,
    posts: post,
    messageLoggedIn: req.query.msg === "loggedIn",
    messageDeleted: req.query.msg === "deleted",
    messagePageNotFound: req.query.msg === "pageNotFound",
  });
});

router.get("/posts", ensureAuth, async (req, res) => {
  const post = await Post.find().sort({ createdAt: "desc" });

  res.render("posts", {
    isLoggedIn: req.isAuthenticated(),
    user: req.user,
    posts: post,
  });
});

router.get("/post/:id", async (req, res) => {
  Post.findOne({ _id: req.params.id }, (err, post) => {
    if (post === null) {
      res.redirect("/");
    } else {
      res.render("post", {
        post: post,
      });
    }
  });
});

router.get("/post/:id/edit", ensurePostAuhor, async (req, res) => {
  Post.findOne({ _id: req.params.id }, (err, post) => {
    if (post === null) {
      res.redirect("/");
    } else {
      res.render("edit", {
        post: post,
      });
    }
  });
});

router.get("*", (req, res) => {
  res.redirect("/?msg=pageNotFound");
});

module.exports = router;
