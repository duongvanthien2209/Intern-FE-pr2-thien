const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },

  fullname: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  birthday: {
    type: Date,
    required: true,
  },

  avatar: {
    type: String,
    default: "https://picsum.photos/200",
  },

  gender: {
    type: Boolean,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema, "users");
