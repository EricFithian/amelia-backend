require('../config/db.connection');
const User = require('./User');
const Wifi = require('./Wifi');
const WifiAdvanced = require('./WifiAdvanced');
const Appointments = require('./Appointments')
const Onboarding = require('./Onboarding')
const Beneficiary = require('./Beneficiary')
const ClaimStatus = require('./ClaimStatus')
const Insurable = require('./Insurable')
const PaymentDetails = require('./PaymentDetails')

module.exports = {
    User,
    Wifi,
    Appointments,
    Onboarding,
    WifiAdvanced,
    Beneficiary,
    ClaimStatus,
    PaymentDetails,
    Insurable
}