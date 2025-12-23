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
const Houndify = require('./HoundifyMCP')
const Reservations = require('./Reservations')
const RoomService = require('./RoomService')
const AnnualAppointments = require('./AnnualAppointments')
const AppointmentsScheduled = require('./AppointmentsScheduled')

module.exports = {
    User,
    Wifi,
    Appointments,
    Onboarding,
    WifiAdvanced,
    Beneficiary,
    ClaimStatus,
    PaymentDetails,
    Insurable,
    Houndify,
    Reservations,
    RoomService,
    AppointmentsScheduled,
    AnnualAppointments
}