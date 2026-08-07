const mongoose = require("mongoose");

///////////////////////////////
// MODELS
////////////////////////////////


let EpicAppointmentsSchema = new mongoose.Schema({
  resourceType: String,
  status: String,
  serviceCategoryCodingSystem: {type: String, default: "http://example.com/epic/service-category"},
  serviceCategoryCodingCode: {type: Number, default: 100},
  serviceCategoryCodingDisplay: {type: String, default: "Outpatient"},
  serviceTypeSystem: {type: String, default: "http://open.epic.com/FHIR/StructureDefinition/appointment-service-type"},
  serviceTypeCode: {type: Number, default: 1001},
  serviceTypeDisplay: {type: String, default: "Follow Up"},
  serviceTypeText: {type: String, default: "Office Visit"},
  appointmentTypeCodingSystem: {type: String, default: "http://terminology.hl4.org/CodeSystem/v2-0276"},
  appointmentTypeCodingCode: {type: String, default: "ROUTINE"},
  appointmentTypeCodingDisplay: {type: String, default: "Routine visit"},
  reasonCodeText: {type: String, default: "Annual Checkup"},
  description: "Routine Follow-up Appointment",
  start: {type: String, default: "2026-08-10T09:00:00Z"},
  end: {type: String, default: "2026-08-10T09:30:00Z"},
  comment: {type: String, default: "Patient requested morning time slot."},
  patientReference: {type: String, default: "Patient/e123456"},
  patientDisplay: {type: String, default: "Smith, John"},
  patientStatus: {type: String, default: "accepted"},
  practionerReference: {type: String, default: "Practitioner/d987654"},
  practicionerDisplay: {type: String, default: "Dr. Sarah Taylor, MD"},
  practicionerStatus: {type: String, default: "accepted"},    
  locationReference: {type: String, default: "Location/l555444"},
  locationDisplay: {type: String, default: "Main Campus - Internal Medicine"},
  locationStatus: {type: String, default: "accepted"}
},{timestamps: true});

const EpicAppointments = mongoose.model("EpicAppointment", EpicAppointmentsSchema);

module.exports = EpicAppointments
