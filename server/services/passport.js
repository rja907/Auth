const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const localStrategy = require('passport-local');

// Create localStrategy
const localOptions = { usernameField: 'email'};
const locallogin = new localStrategy({ localOptions }, function(email, password, done) {
  // Verify username and password
  // if correct, call done
  User.findOne({ email: email}, function(err, user){
    if(err) { return done(err);}
    if(!user) {return done(null, false);}

    // Compare password
    
  });

  // Otherwise, call done with false


});

// Setup options for JwtStrategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JwtStrategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if the userid in the payload exists in our DB
  User.findById(payload.sub, function(err, user){
    // If it does, call 'done' with that
    if(err) {return done(err, false);}
    // Otherwise, call done without that user object
    if(user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});


// Tell passport to use this Strategy
passport.use(jwtLogin);
