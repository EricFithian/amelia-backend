const mongoose = require("mongoose");

///////////////////////////////
// MODELS
////////////////////////////////

let AnnualAppointmentsSchema = new mongoose.Schema({
  patientFirstName: String,
  patientLastName: String,
  patientDOB: String,
  phoneNumber: String,
  examType: String,
  doctor: String,
  lastExamDate: String,
  nextExamDue: String,
  date1: String,
  time1: String,
  date2: String,
  time2: String,
  date3: String,
  time3: String
},{timestamps: true});

const AnnualAppointments = mongoose.model("AnnualAppointments", AnnualAppointmentsSchema);

module.exports = AnnualAppointments
