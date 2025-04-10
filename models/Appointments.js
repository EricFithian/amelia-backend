const mongoose = require("mongoose");

///////////////////////////////
// MODELS
////////////////////////////////
const AppointmentsSchema = new mongoose.Schema({
  resourceType: {
    type: String,
    required: [true, "Resource is required"],
  }, id: {
    type: String,
    required: [true, "Patient id is required"]
  }, identifier: [
    {
      system: {type: String, default: "urn:oid:1.2.840.114350.1.13.861.1.7.3.698084.8"},
      value: {type: String, default: "10001659236"}
    }
  ], status: {
    type: String,
    default: "proposed"
  }, serviceCategory: {
    coding: [
      {
        system: {type: String, default: "http://open.epic.com/FHIR/StructureDefinition/appointment-service-category"},
        code: {type: String, default: "appointment"},
        display: {type: String, default: "Appointment"}
      }
    ],
    text: {type: String, default: "appointment"}
  }, serviceType: [
    {
      coding: [
        {
          system: {type: String, default: "urn:oid:1.2.840.114350.1.13.861.1.7.2.808267"},
          code: {type: String, default: "579"},
          display: {type: String, default: "ABF Office Visit"}
        }
      ]
    }
  ],
  appointmentType: {
    coding: [
      {
        system: {type: String, default: "http://hl7.org/fhir/v3/ActCode"},
        code: {type: String, default: "AMB"},
        display: {type: String, default: "Ambulatory"}
      }
    ]
  }, reason: [
    {
      coding: [
        {
          system: {type: String, default: "http://snomed.info/sct"},
          code: {type: String, default: "271799000"},
          display: {type: String, default: "Head movements abnormal (finding)"}
        }
      ],
      text: {type: String, default: "Abnormal head movements"}
    }
  ],
  start: {type: Date, default: "2021-08-22T13:15:00Z"},
  end: {type: Date, default: "2021-08-22T13:30:00Z"},
  minutesDuration: {type: Number, default: 15},
  comment: {type: String, default: "Patient instructions are spiffy!\n\nThis will get you to google!\n"},
  participant: [
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
  ]
},{timestamps: true});

const Appointments = mongoose.model("Appointment", AppointmentSchema);

module.exports = Appointments
