const mongoose = require("mongoose");

///////////////////////////////
// MODELS
////////////////////////////////
const FinancialProspectsSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  status: {
    type: String,
    default: "In process"
  },
  notes: {
    type: String
  },
  pdfBase64: {
    type: String
  }
},{timestamps: true});

const FinancialProspects = mongoose.model("FinancialProspects", FinancialProspectsSchema);

module.exports = FinancialProspects