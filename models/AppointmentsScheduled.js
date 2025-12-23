const mongoose = require("mongoose");

///////////////////////////////
// MODELS
////////////////////////////////

let AppointmentScheduleSchema = new mongoose.Schema({
    patientName: String,
    patientDOB: String,
    phoneNumber: String,
    department: String,
    doctor: String,
    date1: String,
    time1: String,
    date2: String,
    time2: String,
    date3: String,
    time3: String,
    date4: String,
    time4: String
},{timestamps: true});

const AppointmentsScheduled = mongoose.model("AppointmentsScheduled", AppointmentScheduleSchema);

module.exports = AppointmentsScheduled
