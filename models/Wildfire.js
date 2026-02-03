const mongoose = require("mongoose");

///////////////////////////////
// MODELS
////////////////////////////////
const WildfireSchema = new mongoose.Schema({
  contacts: {
    type: String
  },
  policyNumber: {
    type: String
  },
  address: {
    type: String
  },
  policyDate: {
    type: String
  }
},{timestamps: true});

const Wildfire = mongoose.model("Wildfire", WildfireSchema);

module.exports = Wildfire
