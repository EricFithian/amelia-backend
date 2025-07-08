const mongoose = require("mongoose");

///////////////////////////////
// MODELS
////////////////////////////////
const visitorSchema = new mongoose.Schema({
  guest: String,
  password: String
})
const WifiAdvancedSchema = new mongoose.Schema({
  number: Number,
  vendor: String,
  startDate: String,
  endDate: String,
  duration: Number, 
  visitors: [visitorSchema]
},{timestamps: true});

const WifiAdvanced = mongoose.model("WifiAdvanced", WifiAdvancedSchema);

module.exports = WifiAdvanced
