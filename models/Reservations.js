const mongoose = require("mongoose");

///////////////////////////////
// MODELS
////////////////////////////////
const GuestSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    address: String,
    phone_number: String,
    email: {
        type: String,
        default: "mhowey@soundhound.com"
    }
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
  currency: String,
  status: {
    type: String,
    default: "Booked"
  },
  check_in: {
    type: String,
    default: "2025-11-26"
  },
  check_out: {
    type: String,
    default: "2025-11-26"
  }
},{timestamps: true});

const ReservationStatus = mongoose.model("Reservation", ReservationStatusSchema);

module.exports = ReservationStatus