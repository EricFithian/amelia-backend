require('../config/db.connection');
const User = require('./User');
const Wifi = require('./Wifi');
const Appointment = require('./Appointment')

module.exports = {
    User,
    Wifi,
    Appointment
}