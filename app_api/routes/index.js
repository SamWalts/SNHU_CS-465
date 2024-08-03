const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

// Define routes
router.get('/trips', tripsController.getTrips);
router.get('/trips/:code', tripsController.tripsFindByCode);


module.exports = router;
