const mongoose = require("mongoose");

///////////////////////////////
// MODELS
////////////////////////////////

let AppointmentsSchema = new mongoose.Schema({
  patient: {
    type: String,
    default: "Eric Fithian"
  }, resourceType: {
    type: String,
    default: "Appointment"
  }, status: {
    type: String,
    default: "proposed"
  }, appointmentType: {
   type: String,
   default: "Ambulatory"
  }, reason: {
    type: String,
    default: "Back pain"
  },
  start: {type: String, default: "2021-08-22T13:15:00Z"},
  end: {type: String, default: "2021-08-22T13:30:00Z"},
  minutesDuration: {type: Number, default: 15},
  comment: {type: String, default: "Patient instructions are spiffy!\n\nThis will get you to google!\n"},
  doctor: {type: String, default: "Michael Howey"}
},{timestamps: true});

const Appointments = mongoose.model("Appointment", AppointmentsSchema);

module.exports = Appointments
