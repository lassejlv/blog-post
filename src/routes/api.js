require("dotenv").config();
const router = require("express").Router();
const Post = require("../database/models/Post");
const User = require("../database/models/User");

router.get("/", (req, res) => {
  res.send("Welcome to the API");
});

router.put("/create", (req, res) => {
  const { title, content, image } = req.body;

  const newPost = new Post({
    title,
    content,
    image,
    author: req.user.name,
  });

  newPost.save();

  res.redirect(`/post/${newPost.id}`);
});

router.get("/delete/:id", (req, res) => {
  Post.findByIdAndDelete(req.params.id, (err, post) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/?msg=deleted");
    }
  });
});

module.exports = router;
