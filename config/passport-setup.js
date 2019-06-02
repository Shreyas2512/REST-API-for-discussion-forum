const passport = require('passport');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const User = require('../models/user-model');
const config = require('../configuration');

passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: config.oauth.google.clientID,
    clientSecret: config.oauth.google.clientSecret
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // Should have full user profile over here
      console.log(profile.id);
  
      const existingUser = await User.findOne({ "googleid": profile.id });
      if (existingUser) {

          console.log('User already exists');
          return done(null, existingUser);
    }
    console.log('User does not exist');
  
    const newUser = new User({
        
          googleid: profile.id,
          username: profile.displayName
        
      });
      await newUser.save();
      done(null, newUser);
    } catch(error) {
      done(error, false, error.message);
    }
  }));