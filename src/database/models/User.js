const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },

  name: {
    type: String,
  },

  posts: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("User", UserSchema);
