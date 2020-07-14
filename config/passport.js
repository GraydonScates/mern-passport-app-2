const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const keys = require('../config/keys');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.cypher,
    passReqToCallback: true
};

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (req, jwt_payload, done) => {
            User.findById(jwt_payload.id).then(user => {
                if(user){
                    req.user = user;
                    return done(null, user);
                }
                return done(null, false);
            }).catch(err => console.log(err));
        })
    );
};