const mongoose = require("mongoose");

///////////////////////////////
// MODELS
////////////////////////////////
const AppointmentSchema = new mongoose.Schema({
  dateAndTime: {
    type: String,
    required: [true, "A time is required"],
  }, patientName: {
    type: String,
    required: [true, "Patient name is required"]
  }, new: {
    type: Boolean,
    required: [true, "If new patient or not is required"],
  }, insuranceInfo: {
    type: String,
    default: "Member"
  }, phoneNumber: {
    type: String,
    default: "123-867-5309"
  }
},{timestamps: true});

const Appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = Appointment
