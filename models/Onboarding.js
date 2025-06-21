const mongoose = require("mongoose");

///////////////////////////////
// MODELS
////////////////////////////////
const OnboardingSchema = new mongoose.Schema({
  employeeName: {
    type: String
  },
  ssn: {
    type: String
  },
  dob: {
    type: String
  },
  typeOfEmployee: {
    type: String
  }
},{timestamps: true});

const Onboarding = mongoose.model("Onboarding", OnboardingSchema);

module.exports = Onboarding