const mongoose = require("mongoose");

///////////////////////////////
// MODELS
////////////////////////////////
const BeneficiarySchema = new mongoose.Schema({
  nameOfBeneficiary: {
    type: String,
    default: "None"
  },
  emailOfPolicyHolder: {
    type: String,
  }, emailOfBeneficiary: {
    type: String,
    default: "None"
  }, addressOfBeneficiary: {
    type: String,
    default: "None"
  }, phoneNumberOfBeneficiary: {
    type: String,
    default: "None"
  }
},{timestamps: true});

const Beneficiary = mongoose.model("Beneficiary", BeneficiarySchema);

module.exports = Beneficiary