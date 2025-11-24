const mongoose = require("mongoose");

///////////////////////////////
// MODELS
////////////////////////////////
const RoomServiceStatusSchema = new mongoose.Schema({
  room_number: Number,
  guest: String,
  items: [String],
  total_amount: Number,
  currency: String
},{timestamps: true});

const RoomServiceStatus = mongoose.model("RoomService", RoomServiceStatusSchema);

module.exports = RoomServiceStatus