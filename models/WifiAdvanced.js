const mongoose = require("mongoose");

///////////////////////////////
// MODELS
////////////////////////////////
const WifiAdvancedSchema = new mongoose.Schema({
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
  }, visitors: {
    type: Array,
    default: []
  }
},{timestamps: true});

const WifiAdvanced = mongoose.model("WifiAdvanced", WifiAdvancedSchema);

module.exports = WifiAdvanced
