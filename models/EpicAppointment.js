const mongoose = require("mongoose");

///////////////////////////////
// MODELS
////////////////////////////////

let codingSchema = new mongoose.Schema({
  system: {type: String, default: "http://example.com/epic/service-category"},
  code: {type: Number, default: 100},
  display: {type: String, default: "Outpatient"}
})

let EpicAppointmentsSchema = new mongoose.Schema({
  resourceType: String,
  status: String,
  serviceCategory: [
    {
      coding: [codingSchema]
    }
  ],
  serviceType: [
    {
      coding: [
        {
          system: {type: String, default: "http://open.epic.com/FHIR/StructureDefinition/appointment-service-type"},
          code: {type: Number, default: 1001},
          display: {type: String, default: "Follow Up"}
        }
      ],
      text: {type: String, default: "Office Visit"}
    }
  ],
  appointmentType: {
    coding: [
      {
        system: {type: String, default: "http://terminology.hl4.org/CodeSystem/v2-0276"},
        code: {type: String, default: "ROUTINE"},
        display: {type: String, default: "Routine visit"}
      }
    ]
  },
  reasonCode: [
    {
      text: {type: String, default: "Annual Checkup"}
    }
  ],
  description: "Routine Follow-up Appointment",
  start: {type: String, default: "2026-08-10T09:00:00Z"},
  end: {type: String, default: "2026-08-10T09:30:00Z"},
  comment: {type: String, default: "Patient requested morning time slot."},
  participant: [
    {
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
    }
  ]
},{timestamps: true});

const EpicAppointments = mongoose.model("EpicAppointment", EpicAppointmentsSchema);

module.exports = EpicAppointments
