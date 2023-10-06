const mongoose = require("mongoose");

///////////////////////////////
// MODELS
////////////////////////////////
const WifiSchema = new mongoose.Schema({
  number: {
    type: String,
    required: [true, "Need a username"]
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  vendor: {
    type: String,
    required: [true, "The vendor name is required"]
  },
  startDate: {
    type: String,
    required: [true, "The start date is required"]
  },
  endDate: {
    type: String,
    required: [true, "The end date is required"]
  },
  duration: {
    type: Number,
    required: [true, "The duration is required"]
  },
},{timestamps: true});

const Wifi = mongoose.model("Wifi", WifiSchema);

module.exports = Wifi
