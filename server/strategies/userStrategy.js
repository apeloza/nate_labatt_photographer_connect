var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('../models/user');

//Store this user's id in the session for later
//Only runs during author
//Stores info on req.session.passport.user
passport.serializeUser(function(user, done) {
  console.log('serialized: ', user);
  done(null, user.id);
});

//Runs on every req after user is authenticated
//Look up user id in the session and find them in the db
//Result is stored on req.user
passport.deserializerUser(function(id, done) {
  User.findById(id, function(err, user) {
    if(err) {
      done(err);

    }
    console.log('-----------------------------------------------\ndeserialized: ', user.id);
    done(null, user);
  });
});

//Login functionality

passport.use('local', new localStrategy({
  passReqToCallback: true,
  usernameField: 'username'
}, function(req, username, password, done) {
  User.findOne({username: username}, function(err, user) {
    if (err) {
      throw err;
    }
    if(!user){
      //user not found
      console.log('userStrategy.js :: no user found');
      return done(null, false, {message: 'Incorrect credentials.'});
    } else {
      //Found user, now check password
      user.comparePassword(password, function(err, isMatch) {
        if (err) {
          throw err;
        }

        if(isMatch) {
          console.log('userStrategy.js :: all clear');
          return(done(null, user));
        } else {
          console.log('userStrategy.js :: password incorrect');
          done(null, false, {message: 'Incorrect credentials'});
        }
      });
    } //end else
  }); //end findOne
} //end callback
));
module.exports = passport;
