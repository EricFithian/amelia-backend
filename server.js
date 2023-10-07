require("dotenv").config();

// import express
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const app = express();
const { PORT = 4000 } = process.env;

///////////////////////////////
// MIDDLEWARE
////////////////////////////////
app.use(bodyParser.json());
app.use(express.json()); // parse json bodies - this will run before our request accesses the people router
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging for development

const {User, Wifi} = require('./models')

const posting = async () => {
    try {
        console.log(req.body);
        const newWifi = await Wifi.create(req.body);
        console.log(newWifi);
        res.status(200).json({result: 'The update to your database was successful'})
    } catch(err) {
        res.status(400).json(err);
    }
}

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
        // console.log(allUsers);
        res.status(200).json(allWifi);
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

app.post('/', posting())

app.post('/wifi-access', async (req, res) => {
    try {
        console.log(req.body);
        const newWifi = await Wifi.create(req.body);
        console.log(newWifi);
        res.status(200).json({result: 'The post to your database was successful'})
    } catch(err) {
        res.status(400).json(err);
    }
})

app.put('/', async(req, res) => {
    try {
        updatedUser = User.findOne({name: req.body.name});
        if(updatedUser) {
            updateUser = User.findByIdAndUpdate(updatedUser._id, req.body);
            console.log(updatedUser);
            res.status(200).json({
                response: "The update to your database was successful"
            })
        } else {
            posting();
        }
    } catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
})

app.delete('/delete', async (req, res) => {
    try {
        await User.deleteMany({});
        const deleted = await User.find({});
        console.log(deleted);
        res.json(deleted);
    } catch (err) {
        res.status(400).json(err);
    }
})

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));