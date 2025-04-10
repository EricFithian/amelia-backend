require('../config/db.connection');
const User = require('./User');
const Wifi = require('./Wifi');
const Appointments = require('./Appointments')

module.exports = {
    User,
    Wifi,
    Appointments
}