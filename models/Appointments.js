const mongoose = require("mongoose");

///////////////////////////////
// MODELS
////////////////////////////////
let identifierSchema = new mongoose.Schema({
  system: {type: String, default: "urn:oid:1.2.840.114350.1.13.861.1.7.3.698084.8"},
  value: {type: String, default: "10001659236"}
})

let serviceCodingSchema = new mongoose.Schema({
  system: {type: String, default: "http://open.epic.com/FHIR/StructureDefinition/appointment-service-category"},
  code: {type: String, default: "appointment"},
  display: {type: String, default: "Appointment"}
})

let serviceTypeCodingSchema = new mongoose.Schema({
    system: {type: String, default: "urn:oid:1.2.840.114350.1.13.861.1.7.2.808267"},
    code: {type: String, default: "579"},
    display: {type: String, default: "ABF Office Visit"}
})

let appointmentTypeCodingSchema = new mongoose.Schema(
  {
    system: {type: String, default: "http://hl7.org/fhir/v3/ActCode"},
    code: {type: String, default: "AMB"},
    display: {type: String, default: "Ambulatory"}
  }
)

let appointmentTypeReasonCodingSchema = new mongoose.Schema(
  {
    system: {type: String, default: "http://snomed.info/sct"},
    code: {type: String, default: "271799000"},
    display: {type: String, default: "Head movements abnormal (finding)"}
  }
)

let appointmentTypeReasonSchema = new mongoose.Schema(
  {
    coding: [appointmentTypeReasonCodingSchema],
    text: {type: String, default: "Abnormal head movements"}
  }
)

let participantSchema = new mongoose.Schema(
  {
    actor: {
      reference: {type: String, default: "https://hostname/instance/api/FHIR/STU3/Patient/eFs2zvgmbGfgWFfHliSRYZA3"},
      display: {type: String, default: "Eric Fithian"}
    },
    status: {type: String, default: "tentative"}
  }, {
    actor: {
      reference: {type: String, default: "https://hostname/instance/api/FHIR/STU3/Patient/eFs2zvgmbGfgWFfHliSRYZA3"},
      display: {type: String, default: "Amanda Fahr"}
    },
    status: "tentative"
  }, {
    actor: {
      reference: {type: String, default: "https://hostname/instance/api/FHIR/STU3/Patient/eFs2zvgmbGfgWFfHliSRYZA3"},
      display: {type: String, default: "ABF Family Practice"}
    },
    status: "tentative"
  }, 
)

let AppointmentsSchema = new mongoose.Schema({
  resourceType: {
    type: String,
    default: "Appointment"
  }, id: {
    type: String,
    default: "ePjxkyjA8gju08Vwqc.iiAFHBGCmkucuk3O15LOr0KFg3"
  }, identifier: [identifierSchema], 
  status: {
    type: String,
    default: "proposed"
  }, serviceCategory: {
    coding: [serviceCodingSchema],
    text: {type: String, default: "appointment"}
  }, serviceType: [
    {
      coding: [serviceTypeCodingSchema]
    }
  ],
  appointmentType: {
    coding: [appointmentTypeCodingSchema]
  }, reason: [appointmentTypeReasonSchema],
  start: {type: String, default: "2021-08-22T13:15:00Z"},
  end: {type: String, default: "2021-08-22T13:30:00Z"},
  minutesDuration: {type: Number, default: 15},
  comment: {type: String, default: "Patient instructions are spiffy!\n\nThis will get you to google!\n"},
  participant: [participantSchema]
},{timestamps: true});

const Appointments = mongoose.model("Appointment", AppointmentsSchema);

module.exports = Appointments
