const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },

  site_admin: {
    type: Boolean,
    required: true,
    default: false,
  },

  name: {
    type: String,
  },

  avatar: {
    type: String,
    required: true,
  },

  // createdAt: {
  //   type: Date,
  //   required: true,
  // },
});

module.exports = mongoose.model("User", UserSchema);
