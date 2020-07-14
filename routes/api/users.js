const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const db = require('../../config/db');

router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) return res.status(400).json(errors);

    const name = req.sanitize(req.body.name);
    const email = req.sanitize(req.body.email);
    const password = req.sanitize(req.body.password);

    db.User.findOne({ email }).then(user => {
        if(user) return res.status(400).json({ email: "Email already exists" });

        const newUser = new db.User({
            name,
            email,
            password
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;

                newUser.password = hash;
                newUser.save().then(user => res.json(user)).catch(err => console.log(err));
            });
        });
    });
});

router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) return res.status(400).json(errors);

    const email = req.sanitize(req.body.email);
    const password = req.sanitize(req.body.password);

    db.User.findOne({ email }).then(user => {
        if(!user) return res.status(404).json({ emailnotfound: "Email not found" });

        bcrypt.compare(password, user.password).then(isMatch => {
            if(!isMatch) return res.status(400).json({ passwordincorrect: "Password incorrect" });

            const payload = {
                id: user.id,
                name: user.name
            };

            jwt.sign(payload, keys.cypher, { expiresIn: 31556926 }, (err, token) => {
                if(err) return res.status(400).json({ tokenerror: "There was a problem updating your security token" });
                
                res.json({
                    success: true,
                    token: "Bearer " + token
                });
            });
        });
    });
});

// Protected route, requires user to be logged in via token
// Just returns the current user's document from the users collection
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    if(!req.user) return res.status(403).json({});

    db.User.find({ _id: req.user._id }).lean().then(results => res.json(results)).catch(err => {
        console.log(err);
        res.status(500).json({});
    });
});

module.exports = router;