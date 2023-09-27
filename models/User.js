const mongoose = require("mongoose");

///////////////////////////////
// MODELS
////////////////////////////////
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "That username already exists"]
  },
  password: String,
},{timestamps: true});

const User = mongoose.model("User", UserSchema);

module.exports = User
