const mongoose = require("mongoose");

///////////////////////////////
// MODELS
////////////////////////////////
const visitorSchema = new mongoose.Schema({
  guest: String,
  password: String
})
const WifiAdvancedSchema = new mongoose.Schema({
  number: {
    type: Number
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
  }, visitors: [visitorSchema]
},{timestamps: true});

const WifiAdvanced = mongoose.model("WifiAdvanced", WifiAdvancedSchema);

module.exports = WifiAdvanced
