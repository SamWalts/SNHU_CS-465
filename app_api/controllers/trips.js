const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Ensure the correct path to the model

// Example function using the Trip model
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

    const newTrip = await new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });
//    console.log(newTrip);
    const q = await newTrip.save();

        if(!q){
            return res.status(400).json(err);
        } else {
            return res.status(201).json(q);
        }

        // console.log(q);
    };

    // PUT: /trips/:tripCode - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async(req, res) => {
// Uncomment for debugging
    console.log(req.params);

    console.log(req.body);
    const q = await Trip
    .findOneAndUpdate(
        { 'code' : req.params.tripCode },
        {
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        }
    )
    .exec();
        if(!q)
        { // Database returned no data
            return res
                .status(400).json(err);
        } else { // Return resulting updated trip
            return res
                .status(201).json(q);
        }
// Uncomment the following line to show results of operation
// on the console
// console.log(q);
};
module.exports = {
    getTrips,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};