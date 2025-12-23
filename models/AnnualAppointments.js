const mongoose = require("mongoose");

///////////////////////////////
// MODELS
////////////////////////////////

let AnnualAppointmentsSchema = new mongoose.Schema({
  patientFirstName: {type: String, default: ""},
  patientLastName: {type: String, default: ""},
  patientDOB: {type: String, default: ""},
  phoneNumber: {type: String, default: ""},
  examType: {type: String, default: ""},
  doctor: {type: String, default: ""},
  lastExamDate: {type: String, default: ""},
  nextExamDue: {type: String, default: ""},
  date1: {type: String, default: ""},
  time1: {type: String, default: ""},
  date2: {type: String, default: ""},
  time2: {type: String, default: ""},
  date3: {type: String, default: ""},
  time3: {type: String, default: ""}
},{timestamps: true});

const AnnualAppointments = mongoose.model("AnnualAppointments", AnnualAppointmentsSchema);

module.exports = AnnualAppointments
