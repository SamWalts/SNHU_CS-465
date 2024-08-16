const express = require('express');
const router = express.Router();
const jwt = require("express-jwt");

const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['HS256']
});

const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

// Define routes
// router.get('/trips', tripsController.getTrips);
// router.get('/trips/:code', tripsController.tripsFindByCode);
// router.post('/trips', tripsController.tripsAddTrip);
// router.put('/trips/:tripCode', tripsController.tripsUpdateTrip);
// router.post('/register', authController.register);
// router.post('/login', authController.login);

router
    .route('/trips/:tripCode') // Updated to tripCode
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip)

router
    .route('/trips/:code')
    .get(tripsController.tripsFindByCode)
    
router
    .route('/trips')
    .get(tripsController.getTrips)
    .post(auth, tripsController.tripsAddTrip);

router
    .route('/register')
    .post(authController.register);

    router
    .route('/login')
    .post(authController.login);
    module.exports = router;
