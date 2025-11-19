const mongoose = require("mongoose");

///////////////////////////////
// MODELS
////////////////////////////////
const ClientActionSucceededResultSchema = new mongoose.Schema({
    SpokenResponse: {type: String, default: "Opening trunk"},
    SpokenResponseLong: {type: String, default: "Opening trunk."},
    WrittenResponse: {type: String, default: "Opening trunk."},
    WrittenResponseLong: {type: String, default: "Opening trunk."}
})

const ClientActionFailedResultSchema = new mongoose.Schema({
    SpokenResponse: {type: String, default: "Could not open trunk."},
    SpokenResponseLong: {type: String, default: "Could not open trunk."},
    WrittenResponse: {type: String, default: "Could not open trunk."},
    WrittenResponseLong: {type: String, default: "Could not open trunk."}
})
const HoundifyMCP = new mongoose.Schema({
    CommandKind: {
        type: String,
        default: "CarControlCommand"
    },
    CarControlCommandKind: {
        type: String,
        default: "CarControlDoorCommand"
    },
    CommandType: {
        type: String,
        default: "OpenDoor"
    },
    DoorSelection: {
        type: Array,
        default: [
            "Trunk"
        ]
    },  
    AutoListen: {
        type: Boolean,
        default: false
    },
    ViewType: {
        type: Array,
        default: "CarControlDoorCommand"
    },
    CommandType: {
        type: String,
        default: [
            "Native",
            "None"
        ]
    },
    ClientActionSucceededResult: ClientActionSucceededResultSchema,
    ClientActionFailedResult: ClientActionFailedResultSchema,
    SpokenResponse: {type: String, default: "Opening trunk."},
    SpokenResponseLong: {type: String, default: "Opening trunk."},
    WrittenResponse: {type: String, default: "Opening trunk."},
    WrittenResponseLong: {type: String, default: "Opening trunk."}
},{timestamps: true});

const Houndify = mongoose.model("Houndify", HoundifyMCP);

module.exports = Houndify
