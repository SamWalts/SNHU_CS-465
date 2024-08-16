const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
require('../models/user');
const User = mongoose.model('users');

// Configure the local strategy for use by Passport.
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
        }
        if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

const register = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ "message": "All fields required" });
    }
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    try {
        await user.save();
        const token = user.generateJwt();
        res
            .status(200)
            .json({ token });
    } catch (err) {
        res
            .status(400)
            .json(err);
    }
};

const login = (req, res) => {
    console.log('Login function called');
    
    if (!req.body.email || !req.body.password) {
        console.log('Missing email or password');
        return res
            .status(400)
            .json({ "message": "All fields required" });
    }

    passport.authenticate('local', (err, user, info) => {
        console.log('Passport authentication callback');
        
        if (err) {
            console.log('Authentication error:', err);
            return res
                .status(404)
                .json(err);
        }

        if (user) {
            console.log('User authenticated successfully');
            const token = user.generateJwt();
            return res
                .status(200)
                .json({ token });
        } else {
            console.log('Authentication failed:', info);
            return res
                .status(401)
                .json(info);
        }
    })(req, res);
};
module.exports = {
    register,
    login
};