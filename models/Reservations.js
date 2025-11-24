const mongoose = require("mongoose");

///////////////////////////////
// MODELS
////////////////////////////////
const GuestSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    address: String,
    phone_number: String
})

const ReservationStatusSchema = new mongoose.Schema({
  hotel_id: {
    type: String
  },
  hotel_name: {
    type: String,
  },
  guest: GuestSchema,
  rooms: [String],
  total_amount: Number,
  currency: String
},{timestamps: true});

const ReservationStatus = mongoose.model("Reservation", ReservationStatusSchema);

module.exports = ReservationStatus