const mongoose = require("mongoose");

///////////////////////////////
// MODELS
////////////////////////////////

let codingSchema = new mongoose.Schema({
  system: {type: String, default: "http://example.com/epic/service-category"},
  code: {type: Number, default: 100},
  display: {type: String, default: "Outpatient"}
})

let serviceCategorySchema = new mongoose.Schema({
  coding: [codingSchema]
})

let serviceTypeCodingSchema = new mongoose.Schema({
  system: {type: String, default: "http://open.epic.com/FHIR/StructureDefinition/appointment-service-type"},
  code: {type: Number, default: 1001},
  display: {type: String, default: "Follow Up"}
})

let serviceTypeSchema = new mongoose.Schema({
  coding: [serviceTypeCodingSchema],
  text: {type: String, default: "Office Visit"}
})

let appointmentTypeCodingSchema = new mongoose.Schema({
  system: {type: String, default: "http://terminology.hl4.org/CodeSystem/v2-0276"},
  code: {type: String, default: "ROUTINE"},
  display: {type: String, default: "Routine visit"}
})

let reasonCodeSchema = new mongoose.Schema({
  text: {type: String, default: "Annual Checkup"}
})

let participantSchema = new mongoose.Schema({
  actor: {
    reference: {type: String, default: "Patient/e123456"},
    display: {type: String, default: "Smith, John"}
  },
  status: {type: String, default: "accepted"}
},
{
  actor: {
    reference: {type: String, default: "Practitioner/d987654"},
    display: {type: String, default: "Dr. Sarah Taylor, MD"}
  },
  status: {type: String, default: "accepted"}
},
{
  actor: {
    reference: {type: String, default: "Location/l555444"},
    display: {type: String, default: "Main Campus - Internal Medicine"}
  },
  status: {type: String, default: "accepted"}
})

let EpicAppointmentsSchema = new mongoose.Schema({
  resourceType: String,
  status: String,
  serviceCategory: [serviceCategorySchema],
  serviceType: [serviceTypeSchema],
  appointmentType: {
    coding: [appointmentTypeCodingSchema]
  },
  reasonCode: [reasonCodeSchema],
  description: "Routine Follow-up Appointment",
  start: {type: String, default: "2026-08-10T09:00:00Z"},
  end: {type: String, default: "2026-08-10T09:30:00Z"},
  comment: {type: String, default: "Patient requested morning time slot."},
  participant: [participantSchema]
},{timestamps: true});

const EpicAppointments = mongoose.model("EpicAppointment", EpicAppointmentsSchema);

module.exports = EpicAppointments
