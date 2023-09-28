require("dotenv").config();
require('./config/db.connection');

// import express
const express = require("express");
const cors = require("cors")
const morgan = require("morgan")
const bodyParser = require('body-parser')
const app = express();
const { PORT = 4000 } = process.env;

///////////////////////////////
// MIDDLEWARE
////////////////////////////////
app.use(bodyParser.json())
app.use(express.json()); // parse json bodies - this will run before our request accesses the people router
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging for development

const User = require('./models/User')

///////////////////////////////
// ROUTES
////////////////////////////////

app.get('/', async (req, res) => {
    try {
        const allUsers = await User.find({});
        console.log(allUsers);
        res.json(allUsers);
    } catch(err) {
        res.status(400).json(err);
    }
})
// create a test route
app.get("/:name", async (req, res) => {
    try {
        const username = User.findOne({username: req.params.name})
        res.json(username);
    } catch(err) {
        res.status(400).json(err);
    }
});

app.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        console.log(newUser);
        res.redirect('/')
    } catch(err) {
        res.status(400).json(err);
    }
})

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));