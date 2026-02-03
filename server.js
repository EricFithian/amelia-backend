require("dotenv").config();
const moment = require('moment');
const mongoose = require('mongoose')
// import express
const JSON5 = require('json5')
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const session = require('express-session')
const MongoStore = require('connect-mongo');
const app = express();
const { PORT = 4321, MONGODB_URI } = process.env;

///////////////////////////////
// MIDDLEWARE
////////////////////////////////
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));
app.use(bodyParser.text({ limit: '50mb' }));
app.use(express.json()); // parse json bodies - this will run before our request accesses the people router
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging for development
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(
    session({
        store: MongoStore.create({ mongoUrl: MONGODB_URI }),
        secret: "super secret",
        resave: false,
        saveUninitialized: false,
        // configure the experation of the cookie
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 * 2, // two weeks
        },
    })
);

// console.log(session);
// console.log(MongoStore);
const {User, Wildfire, Reservations, RoomService, Insurable, Houndify, Wifi, WifiAdvanced, Appointments, Sessions, Onboarding, PaymentDetails, ClaimStatus, Beneficiary, AppointmentsScheduled, AnnualAppointments} = require('./models')
const optum = require('./optum.json')


///////////////////////////////
// ROUTES
////////////////////////////////

app.get('/', async (req, res) => {
    try {
        const allUsers = await User.find({});
        // console.log(allUsers);
        res.json(allUsers);
    } catch(err) {
        res.status(400).json(err);
    }
})

app.get('/wifi-access', async (req, res) => {
    try {
        const allWifi = await Wifi.find({});
        console.log(req.params)
        console.log(req.params.count);
        res.status(200).json(allWifi);
    } catch(err) {
        res.status(400).json(err);
    }
})

app.get('/wifi-access-advanced', async (req, res) => {
    try {
        const allWifi = await WifiAdvanced.find({});
        console.log(req.params)
        console.log(req.params.count);
        res.status(200).json(allWifi);
    } catch(err) {
        res.status(400).json(err);
    }
})

app.get('/onboarding', async (req, res) => {
    try {
        const allOnboarding = await Onboarding.find({});
        res.status(200).json(allOnboarding);
    } catch(err) {
        res.status(400).json(err);
    }
})

app.get('/payment_details', async (req, res) => {
    try {
        const payment_details = await PaymentDetails.find({});
        res.status(200).json({payment_details: payment_details, error: null});
    } catch(err) {
        res.status(400).json(err);
    }
})

app.get('/houndifyMCP', async (req, res) => {
    try {
        const houndify = await Houndify.find({});
        res.status(200).json({results: houndify, error: null});
    } catch(err) {
        res.status(400).json(err);
    }
})

app.get('/reservations', async (req, res) => {
    try {
        const reservations = await Reservations.find({});
        res.status(200).json({results: reservations, error: null});
    } catch(err) {
        res.status(400).json(err);
    }
})

app.get('/room_service', async (req, res) => {
    try {
        const room_service = await RoomService.find({});
        res.status(200).json({results: room_service, error: null});
    } catch(err) {
        res.status(400).json(err);
    }
})

app.get('/appointments_scheduled', async (req, res) => {
    try {
        const room_service = await AppointmentsScheduled.find({});
        res.status(200).json({results: room_service, error: null});
    } catch(err) {
        res.status(400).json(err);
    }
})

app.get('/annual_appointments', async (req, res) => {
    try {
        const room_service = await AnnualAppointments.find({});
        res.status(200).json({results: room_service, error: null});
    } catch(err) {
        res.status(400).json(err);
    }
})

app.get('/insurable', async (req, res) => {
    try {
        const canBeInsured = await Insurable.find({});
        res.status(200).json({canBeInsured: canBeInsured, error: null});
    } catch(err) {
        res.status(400).json(err);
    }
})

app.get('/claim_status', async (req, res) => {
    try {
        const claim_status = await ClaimStatus.find({});
        res.status(200).json({claim_statuses: claim_status, error: null});
    } catch(err) {
        res.status(400).json(err);
    }
})

app.get('/claim_status/:email', async (req, res) => {
    try {
        const users_claim_status = await ClaimStatus.findOne({petitionerEmail: req.params.email});
        res.status(200).json({claim_status: users_claim_status, error: null});
    } catch(err) {
        res.status(400).json(err);
    }
})
app.get('/appointments_scheduled/:patientName', async (req, res) => {
    try {
        const patient_appointments = await AppointmentsScheduled.find({appointments: req.params.patientName});
        res.status(200).json({appointments: patient_appointments, error: null});
    } catch(err) {
        res.status(400).json(err);
    }
})
app.get('/annual_appointments/:firstName/:lastName', async (req, res) => {
    try {
        const users_claim_status = await AnnualAppointments.find({petitionerEmail: req.params.email});
        res.status(200).json({annual_appointments: users_claim_status, error: null});
    } catch(err) {
        res.status(400).json(err);
    }
})

app.get('/beneficiary', async (req, res) => {
    try {
        const beneficiary = await Beneficiary.find({});
        res.status(200).json({beneficiaries: beneficiary, error: null});
    } catch(err) {
        res.status(400).json(err);
    }
})

app.get('/beneficiary/:email', async (req, res) => {
    try {
        const singleBenfit = await Beneficiary.findOne({emailOfPolicyHolder: req.params.email});
        res.status(200).json({beneficiary: singleBenfit});
    } catch(err) {
        res.status(400).json(err);
    }
})

app.get('/reservations/:email', async (req, res) => {
    try {
        let reservations = await Reservations.find({"guest.email": req.params.email});
        res.status(200).json(reservations);
    } catch(err) {
        res.status(400).json(err);
    }
})

app.get('/room_service/:guest', async (req, res) => {
    try {
        let room_service = await RoomService.find({"guest": req.params.guest});
        res.status(200).json(room_service);
    } catch(err) {
        res.status(400).json(err);
    }
})

app.post("/login", async function (req, res) {
    try {
        const foundUser = await User.findOne({ email: req.body.email });

        if (!foundUser) return res.send("The password or the username is invalid");
        
        let match
        foundUser.password == req.body.password ? match = true : match = false
    
        // if not match send error
        if (!match) return res.send("The password or the username is invalid");
    
        // if match create the session and redirect to home\
        // here we have created the key card
        req.session.currentUser = {
            user_info: foundUser
        };

        console.log(req.session);
    
        return res.json(`You created a user, ${foundUser}`);
    } catch (err) {
        console.log(err);
        req.error = err;
        return next();
    }
});

app.get('/sessions', async (req, res) => {
    try {
        await mongoose.connect(MONGODB_URI)
        const user_sessions = mongoose.connection.collection('sessions');
        console.log(user_sessions)
        const Session = await user_sessions.find({}).toArray()
        console.log(Session);
        res.status(200).json(Session);
    } catch(err) {
        res.status(400).json(err);
    }
})

app.get('/frontend', async (req, res) => {
    try {
        const wifis = await Wifi.find({});
        res.render('frontend', {wifis, moment});
    } catch(err) {
        res.status(400).json(err);
    }
})
// create a test route
// app.get("/:name", async (req, res) => {
//     try {
//         const username = await User.find({username: req.params.name});
//         console.log("The username is here");
//         res.json(username);
//     } catch(err) {
//         res.status(400).json(err);
//     }
// });

app.post('/', async (req, res) => {
    try {
        const addUser = await User.create(req.body);
        res.status(200).json({result: 'The update to your database was successful'})
    } catch(err) {
        console.log(err);
        res.status(403).json({result: err});
    }
})

app.post('/wifi-access', async (req, res) => {
    try {
        console.log(req.body);
        const newWifi = await Wifi.create(req.body);
        console.log(newWifi);
        res.status(200).json({result: 'The post to your database was successful', error: null})
    } catch(err) {
        res.status(400).json({result: err});
    }
})
app.get('/wildfire', async (req, res) => {
    try {
        console.log(req.body);
        const allWildfire = await Wildfire.find();
        console.log(allWildfire);
        res.status(200).json(allWildfire)
    } catch(err) {
        res.status(400).json({result: err});
    }
})

app.post('/wildfire', async (req, res) => {
    try {
        console.log(req.body);
        const newWildfire = await Wildfire.create(req.body);
        console.log(newWildfire);
        res.status(200).json({result: 'The post to your database was successful', error: null})
    } catch(err) {
        res.status(400).json({result: err});
    }
})

app.post('/appointments_scheduled', async (req, res) => {
    try {
        console.log(req.body);
        const newAppointment = await AppointmentsScheduled.create(req.body);
        console.log(newAppointment);
        res.status(200).json({result: "The post was successful", error: null})
    } catch(err) {
        res.status(400).json({result: err});
    }
})

app.post('/annual_appointments', async (req, res) => {
    try {
        console.log(req.body);
        const newAppointment = await AnnualAppointments.create(req.body);
        console.log(newAppointment);
        res.status(200).json({result: 'The post to your database was successful', error: null})
    } catch(err) {
        res.status(400).json({result: err});
    }
})

app.post('/reservations', async (req, res) => {
    try {
        console.log(req.body);
        const newReservation = await Reservations.create(req.body);
        console.log(newReservation);
        res.status(201).json({result: 'The post to your database was successful', error: null})
    } catch(err) {
        res.status(400).json({result: err});
    }
})

app.post('/room_service', async (req, res) => {
    try {
        console.log(req.body);
        const newRoomService = await RoomService.create(req.body);
        console.log(newRoomService);
        res.status(201).json({result: 'The post to your database was successful', error: null})
    } catch(err) {
        res.status(400).json({result: req.body});
    }
})

app.post('/houndifyMCP', async (req, res) => {
    try {
        const houndifyPost = await Houndify.create(req.body);
        console.log(houndifyPost);
        res.status(200).json({result: 'The post to your database was successful', error: null})
    } catch(err) {
        res.status(400).json({result: err});
    }
})

app.post('/claim_status', async (req, res) => {
    try {
        console.log(req.body);
        const newClaim = await ClaimStatus.create(req.body);
        console.log(newClaim);
        res.status(200).json({result: 'The post to your database was successful', error: null})
    } catch(err) {
        res.status(400).json({result: err});
    }
})

app.post('/insurable', async (req, res) => {
    try {
        console.log(req.body);
        const newInsured = await Insurable.create(req.body);
        console.log(newInsured);
        res.status(200).json({result: 'The post to your database was successful', error: null})
    } catch(err) {
        res.status(400).json({result: err});
    }
})

app.post('/beneficiary', async (req, res) => {
    try {
        console.log(req.body);
        const newBeneficiary = await Beneficiary.create(req.body);
        console.log(newBeneficiary);
        res.status(200).json({result: 'The post to your database was successful', error: null})
    } catch(err) {
        res.status(400).json({result: err});
    }
})

app.post('/payment_details', async (req, res) => {
    try {
        console.log(req.body);
        const newPayentDetails = await PaymentDetails.create(req.body);
        console.log(newPayentDetails);
        res.status(200).json({result: 'The post to your database was successful', error: null})
    } catch(err) {
        res.status(400).json({result: err});
    }
})

app.put('/payment_details/:email', async (req, res) => {
    try {
        let paymentUpdate = await PaymentDetails.findOne({accountEmail: req.params.email});
        if(req.body.paymentFrequency && req.body.paymentType) {
            paymentUpdate.paymentFrequency = req.body.paymentFrequency
            paymentUpdate.paymentType = req.body.paymentType
        } else if(req.body.paymentFrequency) {
            paymentUpdate.paymentFrequency = req.body.paymentFrequency
        } else if(req.body.paymentType) {
            paymentUpdate.paymentType = req.body.paymentType
        } else {
            return res.json({error: `I did not receive any paymentType or paymentFrequency in the request`})
        }
        updatedUser = await User.findByIdAndUpdate(paymentUpdate._id, paymentUpdate)
        console.log(updatedUser);
        res.status(200).json({result: 'The post to your database was successful', error: null})
    } catch(err) {
        res.status(400).json({result: err});
    }
})

app.put('/reservations/:id', async (req, res) => {
    try {
        let reservationUpdate = await Reservations.findById(req.params.id)
        if(req.body.status) {reservationUpdate.status = req.body.status}
        if(req.body.check_in) {reservationUpdate.check_in = req.body.check_in}
        if(req.body.check_out) {reservationUpdate.check_out = req.body.check_out}
        if(req.body.currency) {reservationUpdate.currency = req.body.currency}
        if(req.body.total) {reservationUpdate.total = req.body.total}
        if(req.body.hotel_id) {reservationUpdate.hotel_id = req.body.hotel_id}
        if(req.body.hotel_name) {reservationUpdate.hotel_name = req.body.hotel_name}
        if(req.body.guest) {reservationUpdate.guest = req.body.guest}
        if(req.body.rooms) {reservationUpdate.rooms = req.body.rooms}
        await Reservations.findByIdAndUpdate(reservationUpdate._id, reservationUpdate)
        res.status(201).json({result: 'The post to your database was successful', error: null})
    } catch(err) {
        res.status(400).json({result: err});
    }
})

app.put('/room_service/:id', async (req, res) => {
    try {
        let roomServiceUpdate = await RoomService.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(201).json({result: 'The post to your database was successful', error: null})
    } catch(err) {
        res.status(400).json({result: err});
    }
})

app.put('/beneficiary/email', async (req, res) => {
    try {
        let beneficiaryInfo = await Beneficiary.findOne({emailOfPolicyHolder: req.params.email});
        if(req.body.nameOfBeneficiary) {
            beneficiaryInfo.nameOfBeneficiary = req.body.nameOfBeneficiary
        }
        if(req.body.emailOfBeneficiary) {
            beneficiaryInfo.emailOfBeneficiary = req.body.emailOfBeneficiary
        }
        if(req.body.addressOfBeneficiary) {
            beneficiaryInfo.addressOfBeneficiary = req.body.addressOfBeneficiary
        }
        if(req.body.phoneNumberOfBeneficiary) {
            beneficiaryInfo.phoneNumberOfBeneficiary = req.body.phoneNumberOfBeneficiary
        }
        updatedBeneficiary = await User.findByIdAndUpdate(paymentUpdate._id, beneficiaryInfo)
        console.log(beneficiaryInfo);
        res.status(200).json({result: 'The post to your database was successful', error: null})
    } catch(err) {
        res.status(400).json({result: err});
    }
})

app.post('/wifi-access-advanced', async (req, res) => {
    try {
        if (typeof req.body.visitors.guests === 'string') {
            try {
              req.body.visitors.guests = JSON.parse(req.body.visitors.guests);
              await WifiAdvanced.create({
                "number": 4,
                "vendor": "soundhound",
                "startDate": "2025-07-08",
                "endDate": "2025-07-12",
                "duration": 4,
                "visitors": {
                "guests": [
                    "Eric"
                ],
                "passwords": [
                    "abc"
                ]                
            }})
            } catch (err) {
              console.error('Invalid JSON in visitors field', err);
              return res.status(400).send('Invalid guests JSON');
            }
          }          
        if (typeof req.body.visitors.passwords === 'string') {
            try {
              req.body.visitors.passwords = JSON.parse(req.body.visitors.passwords)
              await WifiAdvanced.create({
                "number": 4,
                "vendor": "soundhound",
                "startDate": "2025-07-08",
                "endDate": "2025-07-12",
                "duration": 4,
                "visitors": {
                "guests": [
                    "Eric"
                ],
                "passwords": [
                    "abc"
                ]                
            }})
            } catch (err) {
              console.error('Invalid JSON in visitors field', err);
              return res.status(400).send('Invalid passwords JSON');
            }
          }          
        const newWifi = await WifiAdvanced.create(req.body);
        console.log(newWifi);
        res.status(200).json({result: 'The post to your database was successful'})
    } catch(err) {
        res.status(400).json({body: req.body, error: err});
    }
})

app.post('/onboarding', async (req, res) => {
    try {
        console.log(req.body);
        const newOnboarding = await Onboarding.create(req.body);
        console.log(newOnboarding);
        res.status(200).json({result: 'The post to your database was successful'})
    } catch(err) {
        res.status(400).json({result: err});
    }
})

app.get('/reset', async(req, res) => {
    try {
        await User.deleteMany({});
        await Wifi.deleteMany({});
        await Onboarding.deleteMany({});
        res.redirect('/');
    } catch(err) {
        res.status(403).json({result: err})
    }
})
app.get('/reset_deloitte', async(req, res) => {
    try {
        await RoomService.deleteMany({});
        await Reservations.deleteMany({});
        res.redirect('/reservations');
    } catch(err) {
        res.status(403).json({result: err})
    }
})

app.get('/optum/instance/api/FHIR/STU3/Appointment/patient', async(req, res) => {
    try {
        res.send(optum)
    } catch(err) {
        res.status(403).json({result: err})
    }
})

app.get('/clean-wifi', async(req, res) => {
    try {
        await Wifi.deleteMany({});
        res.redirect('/');
    } catch(err) {
        res.status(403).json({result: err})
    }
})

app.get('/clean-users', async(req, res) => {
    try {
        await User.deleteMany({});
        res.redirect('/');
    } catch(err) {
        res.status(403).json({result: err})
    }
})

app.get('/appointments', async(req, res) => {
    try {
        const appointment = await Appointments.find({});
        console.log(appointment)
        res.status(201).json(appointment)
    } catch(err) {
        res.status(403).json({result: err})
    }
})

app.get('/appointments/user/:name', async(req, res) => {
    try {
        const appointments = await Appointments.find({patient: req.params.name});
        console.log(appointments)
        res.status(201).json(appointments)
    } catch(err) {
        res.status(403).json({result: err})
    }
})

app.get('/appointments/:reason', async(req, res) => {
    try {
        const appointment = await Appointments.findOne({reason: [{ text:req.params.reason}]});
        console.log(appointment)
        res.status(201).json(appointment)
    } catch(err) {
        res.status(403).json({result: err})
    }
})

app.post('/appointments', async(req, res) => {
    try {
        const appointment = await Appointments.create(req.body);
        console.log(appointment)
        res.status(201).json({'status': `I have created a new appointment for ${req.body.patient}`})
    } catch(err) {
        res.status(403).json({result: err})
    }
})

app.get('/seed_appointments', async(req, res) => {
    try {
        log.info(optum)
        const appointments = await Appointments.create(optum);
        log.info(appointments)
        res.status(201).redirect('./appointments')
    } catch(err) {
        res.status(403).json(err)
    }
})

app.put('/appointments/:patient/:time/:new_time', async(req, res) => {
    try {
        toBeUpdated = await Appointments.findOne({patient: req.params.patient, start: req.params.time});
        toBeUpdated.start = req.params.new_time
        updatedUser = await Appointments.findByIdAndUpdate(toBeUpdated._id, toBeUpdated);
        res.status(200).json({result: `Updated the appointment for ${req.params.patient}`});
    } catch(err) {
        console.log(err);
        res.status(403).json({result: res.redirect(`/${req.body.email}`)});
    }
})

app.delete('/appointments/:patient/:time', async(req, res) => {
    try {
        toBeUpdated = await Appointments.findOneAndDelete({patient: req.params.patient, start: req.params.time});
        res.status(200).json({result: `Updated the appointment for ${req.params.patient}`});
    } catch(err) {
        console.log(err);
        res.status(403).json({result: res.redirect(`/${req.body.email}`)});
    }
})

app.delete('/appointments_scheduled/:patient/:date1/:time1', async(req, res) => {
    try {
        toBeUpdated = await AppointmentsScheduled.findOneAndDelete({patientName: req.params.patient, date1: req.params.date1, time1: req.params.time1});
        res.status(200).json({result: `Deleted the appointment for ${req.params.patient}`});
    } catch(err) {
        console.log(err);
        res.status(403).json({result: res.redirect(`/${req.body.email}`)});
    }
})

app.get('/:email', async (req, res) => {
    try {
        let currentUser
        currentUser = await User.findOne({email: req.params.email}) 
        currentUser ? currentUser == currentUser : currentUser = await User.findOne({name: req.params.email})
        console.log(currentUser);
        currentUser ? res.json(currentUser) : res.json(null)
    } catch(err) {
        res.status(400).json(err);
    }
})

app.put('/', async(req, res) => {
    try {
        let toBeUpdated;
        if(req.body.channel == "voice") {
            toBeUpdated = await User.findOne({phoneNumber: req.body.phoneNumber})
        } else {
            toBeUpdated = await User.findOne({email: req.body.email});
        }
        toBeUpdated.password = req.body.password;
        console.log(toBeUpdated);
        updatedUser = await User.findByIdAndUpdate(toBeUpdated._id, toBeUpdated);
        console.log(updatedUser);
        res.status(200).json({result: `Updated the password for ${req.body.name}`});
    } catch(err) {
        console.log(err);
        res.status(403).json({result: res.redirect(`/${req.body.email}`)});
    }
})

// app.delete('/delete', async (req, res) => {
//     try {
//         await User.deleteMany({});
//         const deleted = await User.find({});
//         console.log(deleted);
//         res.json(deleted);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// })

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));