require('../config/db.connection');
const User = require('./User');
const Wifi = require('./Wifi');
const WifiAdvanced = require('./WifiAdvanced');
const Appointments = require('./Appointments')
const Onboarding = require('./Onboarding')

module.exports = {
    User,
    Wifi,
    Appointments,
    Onboarding,
    WifiAdvanced
}