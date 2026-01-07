const mongoose = require("mongoose");

///////////////////////////////
// MODELS
////////////////////////////////

const accountSchema = new mongoose.Schema({
  pastDue: String,
  disconnected: String
})

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Need a username"],
  }, password: {
    type: String  
  }, email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Must be a unique email address"]
  }, role: {
    type: String,
    default: "Member"
  }, phoneNumber: {
    type: String,
    default: "123-867-5309"
  }, account: accountSchema
},{timestamps: true});

const User = mongoose.model("User", UserSchema);

module.exports = User
