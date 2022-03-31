const mongoose = require("mongoose");
const dompurify = require("dompurify");
const marked = require("marked");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  content_mardown: {
    type: String,
    required: true,
  },

  author: {
    type: [String],
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

PostSchema.pre("validate", function (next) {
  if (this.content) {
    this.content_mardown = marked(this.content);
  }

  next();
});

module.exports = mongoose.model("Post", PostSchema);
