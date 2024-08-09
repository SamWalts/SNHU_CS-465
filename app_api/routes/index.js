const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

// Define routes
router.get('/trips', tripsController.getTrips);
router.get('/trips/:code', tripsController.tripsFindByCode);
router.post('/trips', tripsController.tripsAddTrip);
router.put('/trips/:tripCode', tripsController.tripsUpdateTrip);
//     .route('/trips')
//     .get(tripsController.tripsList)
//     .post(tripsController.tripsAddTrip);

// router
//     .route('/trips/:tripcode')
//     .get(tripsController.tripsFindByCode)

    module.exports = router;
