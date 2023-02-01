/** @format */

const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add Name"],
    },
    email: {
      type: String,
      required: [true, "Please add Email"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
  },
  {
    timestamp: true,
  }
);

module.exports= mongoose.model('User', userSchema)