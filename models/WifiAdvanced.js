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
    type: String
  },
  endDate: {
    type: String
  },
  duration: {
    type: Number
  }, visitors: {
    type: [{guest: String, password: String}],
    default: []
  }
},{timestamps: true});

const WifiAdvanced = mongoose.model("WifiAdvanced", WifiAdvancedSchema);

module.exports = WifiAdvanced
