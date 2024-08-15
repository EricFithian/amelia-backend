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
    type: String
  }, image: {
    type: String,
    default: "https://cdn.vectorstock.com/i/500p/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"
  }
},{timestamps: true});

const Wifi = mongoose.model("Wifi", WifiSchema);

module.exports = Wifi
