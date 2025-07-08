const mongoose = require("mongoose");

///////////////////////////////
// MODELS
////////////////////////////////
const WifiAdvancedSchema = new mongoose.Schema({
  number: {
    type: Number
  },
  vendor: {
    type: String
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  duration: {
    type: Number
  }, visitors: {
    type: Array,
    default: []
  }
},{timestamps: true});

const WifiAdvanced = mongoose.model("WifiAdvanced", WifiAdvancedSchema);

module.exports = WifiAdvanced
