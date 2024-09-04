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


const {User, Wifi} = require('./models')


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

// app.get('/cleanup', async(req, res) => {
//     try {
//         await User.deleteMany({});
//         await Wifi.deleteMany({});
//         res.redirect('/');
//     } catch(err) {
//         res.status(403).json({result: err})
//     }
// })

// app.get('/clean-wifi', async(req, res) => {
//     try {
//         await Wifi.deleteMany({});
//         res.redirect('/');
//     } catch(err) {
//         res.status(403).json({result: err})
//     }
// })

// app.get('/clean-users', async(req, res) => {
//     try {
//         await User.deleteMany({});
//         res.redirect('/');
//     } catch(err) {
//         res.status(403).json({result: err})
//     }
// })

app.get('/:email', async (req, res) => {
    try {
        const currentUser = await User.findOne({email: req.params.email});
        console.log(currentUser);
        currentUser ? res.json(currentUser) : currentUser = await User.findOne({name: req.params.name})
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