const mongoose = require("mongoose");

///////////////////////////////
// MODELS
////////////////////////////////

let AppointmentScheduleSchema = new mongoose.Schema({
    patientName: {type:String, default: ""},
    patientDOB: {type:String, default: ""},
    phoneNumber: {type:String, default: ""},
    department: {type:String, default: ""},
    doctor: {type:String, default: ""},
    date1: {type:String, default: ""},
    time1: {type:String, default: ""},
    location: {type:String, default: ""},
    date2: {type:String, default: ""},
    time2: {type:String, default: ""},
    date3: {type:String, default: ""},
    time3: {type:String, default: ""},
    date4: {type:String, default: ""},
    time4: {type:String, default: ""}
},{timestamps: true});

const AppointmentsScheduled = mongoose.model("AppointmentsScheduled", AppointmentScheduleSchema);

module.exports = AppointmentsScheduled
