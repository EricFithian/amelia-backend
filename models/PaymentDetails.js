const mongoose = require("mongoose");

///////////////////////////////
// MODELS
////////////////////////////////
const PaymentSchema = new mongoose.Schema({
  accountNumber: {
    type: Number
  },
  accountEmail: {
    type: String,
  },
  paymentType: {
    type: String,
    default: "Credit card"
  },
  paymentFrequency: {
    type: String,
    default: "Monthly"
  }
},{timestamps: true});

const PaymentDetails = mongoose.model("PaymentDetails", PaymentSchema);

module.exports = PaymentDetails