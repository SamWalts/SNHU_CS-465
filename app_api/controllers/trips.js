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

module.exports = {
    getTrips,
    tripsFindByCode
};