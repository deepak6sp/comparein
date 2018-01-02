import passport from 'passport';
import LocalStrategy from 'passport-local';

var User = require('../models/users');

passport.use('login', new LocalStrategy(
  function(username, password, done) {
    console.log("---------------------");
    console.log(username);
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
