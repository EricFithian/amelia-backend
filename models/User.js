const mongoose = require("mongoose");

///////////////////////////////
// MODELS
////////////////////////////////
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Need a username"]
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
},{timestamps: true});

const User = mongoose.model("User", UserSchema);

module.exports = User
