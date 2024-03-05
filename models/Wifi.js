const mongoose = require("mongoose");

///////////////////////////////
// MODELS
////////////////////////////////
const WifiSchema = new mongoose.Schema({
  number: {
    type: String
  },
  password: {
    type: String
  },
  vendor: {
    type: String
  },
  startDate: {
    type: String
  },
  endDate: {
    type: String
  },
  duration: {
    type: Number
  },
},{timestamps: true});

const Wifi = mongoose.model("Wifi", WifiSchema);

module.exports = Wifi
