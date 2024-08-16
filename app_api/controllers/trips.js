const mongoose = require('mongoose');
require('../models/travlr'); // Ensure the correct path to the model
require('../models/user');
const User = mongoose.model('users');
const Trip = mongoose.model('trips');

const getTrips = async (req, res) => {
    try {
        const trips = await Trip.find({});
        res.status(200).json(trips);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const tripsFindByCode = async (req, res) => {
    try {
        const find = await Trip.find({'code' : req.params.code});
        // Uncomment the following line to see the output in the console
        // console.log('Trips found:',find);
        res.status(200).json(find);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST /trips - Adds new trip
// Regardless, must display some type of HTML code
// and JSON response to requestor
const tripsAddTrip = async (req, res) => {
    console.log('Request received at tripsAddTrip');
    console.log('Request body:', req.body);

    getUser(req, res, async (req, res) => {
        console.log('Inside getUser callback');
        
        const newTrip = new Trip({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });

        console.log('New trip object created:', newTrip);

        try {
            const q = await newTrip.save();
            console.log('Save result:', q);

            if (!q) {
                console.log('Error: Trip not saved');
                return res.status(400).json({ message: 'Error saving trip' });
            } else {
                console.log('Trip successfully saved');
                return res.status(201).json(q);
            }
        } catch (err) {
            console.log('Error during save operation:', err);
            return res.status(400).json({ message: err.message });
        }
    });
};
// PUT: /trips/:tripCode - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async (req, res) => {
    console.log('Request received at tripsUpdateTrip');
    console.log('Request params:', req.params);
    console.log('Request body:', req.body);

    try {
        const tripCode = req.params.tripCode; // Corrected parameter name
        console.log('Trip code to update:', tripCode);

        const trip = await Trip.findOneAndUpdate(
            { code: tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            { new: true }
        );

        if (!trip) {
            console.log('Trip not found');
            return res.status(404).json({ message: 'Trip not found' });
        }

        console.log('Trip successfully updated:', trip);
        return res.status(200).json(trip);
    } catch (err) {
        console.log('Error during update operation:', err);
        return res.status(400).json({ message: err.message });
    }
};
const getUser = async (req, res, callback) => {
    if (req.payload && req.payload.email) {
        console.log("In the getUser function");
        try {
            const user = await User.findOne({ email: req.payload.email }).exec();
            if (!user) {
                console.log('User not found in getUser');
                return res.status(404).json({ "message": "User not found" });
            }
            console.log('User found in getUser');
            callback(req, res);
        } catch (err) {
            console.log('Error in getUser:', err);
            return res.status(404).json(err);
        }
    } else {
        console.log('No payload or email in request');
        return res.status(400).json({ message: 'No payload or email in request' });
    }
};
    
module.exports = {
    getTrips,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};