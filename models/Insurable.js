const mongoose = require("mongoose");

///////////////////////////////
// MODELS
////////////////////////////////
const Insurable = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
  },
  notes: {
    type: String,
    default: "Notes go here"
  },
  premium: {
    type: Boolean,
    default: "False"
  }
},{timestamps: true});

const CanBeInsured = mongoose.model("Insurable", Insurable);

module.exports = CanBeInsured