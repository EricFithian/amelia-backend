const mongoose = require("mongoose");

///////////////////////////////
// MODELS
////////////////////////////////
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "That username already exists"],
    required: [true, "Need a username"]
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
},{timestamps: true});

const User = mongoose.model("User", UserSchema);

module.exports = User
