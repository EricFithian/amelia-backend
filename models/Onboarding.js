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
  },
  photo: {
    type: String,
    default: "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
  }
},{timestamps: true});

const Onboarding = mongoose.model("Onboarding", OnboardingSchema);

module.exports = Onboarding