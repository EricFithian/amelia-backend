const mongoose = require("mongoose");

///////////////////////////////
// MODELS
////////////////////////////////

let EpicAvailabilitySchema = new mongoose.Schema({
  resourceType: {type: String, default: "Slot"},
  status: {type: String, default: "free"},
  start: {type: String, default: "2026-08-10T09:00:00Z"},
  end: {type: String, default: "2026-08-10T09:30:00Z"},
  overbooked: false,
  comment: {type: String, default: "Available opening for routine office visit."},
  schedule: {
    reference: {type: String, default: "Schedule/eSch9876543"},
    display: {type: String, default: "Dr. Sarah Taylor - Internal Medicine Schedule"}
  },
  serviceType: [
    {
      coding: [
        {
          system: {type: String, default: "http://open.epic.com/FHIR/StructureDefinition/slot-service-type"},
          code: {type: Number, default: 1001},
          display: {type: String, default: "Office Visit"}
        }
      ],
      text: {type: String, default: "Office Visit"}
    }
  ],
  extension: [
    {
      url: {type: String, default: "http://open.epic.com/FHIR/StructureDefinition/extension/department-id"},
      valueString: {type: Number, default: 101001}
    }
  ]

},{timestamps: true});

const EpicAvailabilities = mongoose.model("EpicAvailability", EpicAvailabilitySchema);

module.exports = EpicAvailabilities
