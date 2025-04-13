const mongoose = require("mongoose");

///////////////////////////////
// MODELS
////////////////////////////////
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Need a username"],
  }, password: {
    type: String,
    required: [true, "Password is required"]
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
  }, securityQuestionsAnswers: {
    type: Array,
    default: [["What are the last four digits of your ssn number?", 1234], ["What is your pin number?", 9876]]
  }
},{timestamps: true});

const User = mongoose.model("User", UserSchema);

module.exports = User
