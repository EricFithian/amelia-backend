require('../config/db.connection');
const User = require('./User');
const Wifi = require('./Wifi');
const Appointments = require('./Appointments')
const Onboarding = require('./Onboarding')

module.exports = {
    User,
    Wifi,
    Appointments,
    Onboarding
}