require("dotenv").config();
const moment = require('moment');

// import express
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const app = express();
const { PORT = 4321 } = process.env;

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


const {User, Wifi, Appointment} = require('./models')


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

app.get('/reset', async(req, res) => {
    try {
        await User.deleteMany({});
        await Wifi.deleteMany({});
        res.redirect('/');
    } catch(err) {
        res.status(403).json({result: err})
    }
})

app.get('/optum/instance/api/FHIR/STU3/Appointment/patient', async(req, res) => {
    try {
        res.send({
            "resourceType": "Appointment",
            "id": "ePjxkyjA8gju08Vwqc.iiAFHBGCmkucuk3O15LOr0KFg3",
            "identifier": [
                {
                    "system": "urn:oid:1.2.840.114350.1.13.861.1.7.3.698084.8",
                    "value": "10001659236"
                }
            ],
            "status": "proposed",
            "serviceCategory": {
                "coding": [
                    {
                        "system": "http://open.epic.com/FHIR/StructureDefinition/appointment-service-category",
                        "code": "appointment",
                        "display": "Appointment"
                    }
                ],
                "text": "appointment"
            },
            "serviceType": [
                {
                    "coding": [
                        {
                            "system": "urn:oid:1.2.840.114350.1.13.861.1.7.2.808267",
                            "code": "579",
                            "display": "ABF Office Visit"
                        }
                    ]
                }
            ],
            "appointmentType": {
                "coding": [
                    {
                        "system": "http://hl7.org/fhir/v3/ActCode",
                        "code": "AMB",
                        "display": "Ambulatory"
                    }
                ]
            },
            "reason": [
                {
                    "coding": [
                        {
                            "system": "http://snomed.info/sct",
                            "code": "271799000",
                            "display": "Head movements abnormal (finding)"
                        }
                    ],
                    "text": "Abnormal head movements"
                }
            ],
            "start": "2021-08-22T13:15:00Z",
            "end": "2021-08-22T13:30:00Z",
            "minutesDuration": 15,
            "created": "2021-08-20",
            "comment": "Patient instructions are spiffy!\n\nThis will get you to google!\n",
            "participant": [
                {
                    "actor": {
                        "reference": "https://hostname/instance/api/FHIR/STU3/Patient/eFs2zvgmbGfgWFfHliSRYZA3",
                        "display": "Gibson,Ken"
                    },
                    "status": "tentative"
                },
                {
                    "actor": {
                        "reference": "https://hostname/instance/api/FHIR/STU3/Practitioner/euc69RmkeUC5UjZOIGu0FiA3",
                        "display": "Amanda Fahr"
                    },
                    "status": "tentative"
                },
                {
                    "actor": {
                        "reference": "https://hostname/instance/api/FHIR/STU3/Location/e6gRswU5WJtj7msgU7NZiYw3",
                        "display": "ABF Family Practice"
                    },
                    "status": "tentative"
                }
            ]
        })
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

app.post('/appointment', async(req, res) => {
    try {
        const appointment = await Appointment.create(req.body);
        console.log(appointment)
        res.status(201).json({'status': `I have created a new appointment for ${req.body.patientName}`})
    } catch(err) {
        res.status(403).json({result: err})
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
        console.log("This was hit");
        console.log(req.body);
        toBeUpdated = await User.findOne({email: req.body.email});
        toBeUpdated.password = req.body.password;
        console.log(toBeUpdated);
        updatedUser = await User.findByIdAndUpdate(toBeUpdated._id, toBeUpdated);
        console.log(updatedUser);
        res.status(200).json({result: `Updated the password for ${req.body.email}`});
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