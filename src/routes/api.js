require("dotenv").config();
const router = require("express").Router();
const Post = require("../database/models/Post");
const User = require("../database/models/User");
const marked = require("marked");
const dompurify = require("dompurify");
const moment = require("moment");

router.get("/", (req, res) => {
  res.redirect("/");
});

router.put("/create", (req, res) => {
  const { title, content, image, description } = req.body;

  const newPost = new Post({
    title,
    content,
    image,
    description,
    author: [req.user._id, req.user.name],
  });

  newPost.save();

  const updateUser = User.findOneAndUpdate(
    { userId: req.user.userId },
    { $push: { posts: newPost.id } },
    { new: true }
  );

  Promise.all([newPost, updateUser]).then(([newPost, updateUser]) => {
    res.redirect(`/post/${newPost.id}`);
  });
});

router.put("/updatePost/:id", (req, res) => {
  Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        description: req.body.description,
      },
    },
    { new: true }
  ).then((post) => {
    res.redirect(`/posts`);
  });
});

router.get("/delete/:id", (req, res) => {
  Post.findByIdAndDelete(req.params.id, (err, post) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/?msg=deleted");
    }
  });

  User.findOneAndUpdate(
    { userId: req.user.userId },
    { $pull: { posts: req.params.id } },
    { new: true }
  );
});

// Data routes

router.get("/posts", (req,res) => {
  Post.find({}, (err, posts) => {
    const filterPost = posts.map((post) => {
      return {
        title: post.title,
        description: post.description,
        content: post.content,
        createdAt: post.createdAt,
        image: post.image,
        author: post.author[0]
      }

      res.send(filterPost)
    })
  })
})

router.get("/users", (req, res) => {
  User.find({}, (err, users) => {
      const filteredUsers = users.map((user) => {
          return {
              name: user.name,
              posts: user.posts
          };
      });
      res.send(filteredUsers);
  });
});


module.exports = router;
