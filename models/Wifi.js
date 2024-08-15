const mongoose = require("mongoose");

///////////////////////////////
// MODELS
////////////////////////////////
const WifiSchema = new mongoose.Schema({
  number: {
    type: String
  },
  password: {
    type: String
  },
  vendor: {
    type: String
  },
  startDate: {
    type: String
  },
  endDate: {
    type: String
  },
  duration: {
    type: String
  }, image: {
    type: String,
    default: "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
  }, imageType: {
    type: String,
    default: "image/png"
  }
},{timestamps: true});

const Wifi = mongoose.model("Wifi", WifiSchema);

module.exports = Wifi
