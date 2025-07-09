const mongoose = require("mongoose");

///////////////////////////////
// MODELS
////////////////////////////////

const WifiAdvancedSchema = new mongoose.Schema({
  number: Number,
  vendor: String,
  startDate: String,
  endDate: String,
  duration: Number, 
  visitors: new mongoose.Schema({
    guests: [String],
    passwords: [String]
  })
},{timestamps: true});

const WifiAdvanced = mongoose.model("WifiAdvanced", WifiAdvancedSchema);

module.exports = WifiAdvanced
