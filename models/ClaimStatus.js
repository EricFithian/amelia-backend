const mongoose = require("mongoose");

///////////////////////////////
// MODELS
////////////////////////////////
const ClaimStatusSchema = new mongoose.Schema({
  nameOfPetitioner: {
    type: String
  },
  petitionerEmail: {
    type: String,
  },
  typeOfClaim: {
    type: String,
  },
  status: {
    type: String,
    default: "In process"
  },
  notes: {
    type: String
  }
},{timestamps: true});

const ClaimStatus = mongoose.model("ClaimStatus", ClaimStatusSchema);

module.exports = ClaimStatus