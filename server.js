require("dotenv").config();
const moment = require('moment');
const mongoose = require('mongoose')
// import express
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
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(bodyParser.text({ limit: '200mb' }));
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
const {User, Wifi, WifiAdvanced, Appointments, Sessions, Onboarding} = require('./models')
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
        newUser = req.body
        console.log(newUser);
        const addUser = await User.create(newUser);
        console.log(addUser);
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
        res.status(200).json({result: 'The post to your database was successful'})
    } catch(err) {
        res.status(400).json({result: err});
    }
})

app.post('/wifi-access-advanced', async (req, res) => {
    try {
        // console.log(req.body);
        const newWifi = await WifiAdvanced.create(req.body);
        // console.log(newWifi);
        res.status(200).json({result: 'The post to your database was successful'})
    } catch(err) {
        res.status(400).json({result: err});
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