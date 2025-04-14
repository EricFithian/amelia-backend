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
  }, identifier: {
    type: Array,
    default: [
      {
          "system": "urn:oid:1.2.840.114350.1.13.861.1.7.3.698084.8",
          "value": "10001659236"
      }
  ]
  }, 
  status: {
    type: String,
    default: "proposed"
  }, serviceCategory: {
    coding: {
      type: Array,
      default: [
        {
            "system": "http://open.epic.com/FHIR/StructureDefinition/appointment-service-category",
            "code": "appointment",
            "display": "Appointment"
        }
    ]
    },
    text: {type: String, default: "appointment"}
  }, serviceType: {
    type: Array,
    default: [
      {
          "coding": [
              {
                  "system": "urn:oid:1.2.840.114350.1.13.861.1.7.2.808267",
                  "code": "579",
                  "display": "ABF Office Visit"
              }
          ]
      }
  ]
  },
  appointmentType: {
    coding: {
      type: Array,
      default: [
        {
            "system": "http://hl7.org/fhir/v3/ActCode",
            "code": "AMB",
            "display": "Ambulatory"
        }
    ]
    }
  }, reason: {
    type: Array,
    default: [
      {
          "coding": [
              {
                  "system": "http://snomed.info/sct",
                  "code": "271799000",
                  "display": "I have a headache"
              }
          ],
          "text": "Headache"
      }
  ]
  },
  start: {type: String, default: "2021-08-22T13:15:00Z"},
  end: {type: String, default: "2021-08-22T13:30:00Z"},
  minutesDuration: {type: Number, default: 15},
  comment: {type: String, default: "Patient instructions are spiffy!\n\nThis will get you to google!\n"},
  participant: {
    type: Array,
    default: [
      {
          "actor": {
              "reference": "https://hostname/instance/api/FHIR/STU3/Patient/eFs2zvgmbGfgWFfHliSRYZA3",
              "display": "Eric Fithian"
          },
          "status": "tentative"
      },
      {
          "actor": {
              "reference": "https://hostname/instance/api/FHIR/STU3/Practitioner/euc69RmkeUC5UjZOIGu0FiA3",
              "display": "Amanda Fahr"
          },
          "status": "tentative"
      },
      {
          "actor": {
              "reference": "https://hostname/instance/api/FHIR/STU3/Location/e6gRswU5WJtj7msgU7NZiYw3",
              "display": "ABF Family Practice"
          },
          "status": "tentative"
      }
  ]
  }
},{timestamps: true});

const Appointments = mongoose.model("Appointment", AppointmentsSchema);

module.exports = Appointments
