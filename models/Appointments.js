const mongoose = require("mongoose");

///////////////////////////////
// MODELS
////////////////////////////////

let AppointmentsSchema = new mongoose.Schema({
  resourceType: {
    type: String,
    default: "Appointment"
  }, id: {
    type: String,
    default: "ePjxkyjA8gju08Vwqc.iiAFHBGCmkucuk3O15LOr0KFg3"
  }, identifier: Array, 
  status: {
    type: String,
    default: "proposed"
  }, serviceCategory: {
    coding: Array,
    text: {type: String, default: "appointment"}
  }, serviceType: Array,
  appointmentType: {
    coding: Array
  }, reason: Array,
  start: {type: String, default: "2021-08-22T13:15:00Z"},
  end: {type: String, default: "2021-08-22T13:30:00Z"},
  minutesDuration: {type: Number, default: 15},
  comment: {type: String, default: "Patient instructions are spiffy!\n\nThis will get you to google!\n"},
  participant: Array
},{timestamps: true});

const Appointments = mongoose.model("Appointment", AppointmentsSchema);

module.exports = Appointments
