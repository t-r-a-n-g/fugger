const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { User } = require("../models");

/* ----------------------------------- LOCAL STRATEGY ----------------------------------- */

/* TO DO:
 - backend validation for email and password
 - return a token somewhere (here or in Controller?)
 */

/* eslint consistent-return: 0 */
/* eslint func-names: 0 */

const localSignup = new LocalStrategy(
  // overwriting default username field of passport
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true, // for passing the rest of req.body to callback function
  },

  async (req, email, password, done) => {
    // looking for that user in db
    try {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return done(null, false, {
          message: "An account with this E-mail already exists.",
        });
      }
      // if there is no such user already in db do the following:

      const encryptedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        email,
        password: encryptedPassword,
      });
      if (user) {
        return done(null, user);
      }
    } catch (err) {
      return done(err);
    }
  }
);

// serialize
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// deserialize user
passport.deserializeUser(function (id, done) {
  User.findByPk(id).then(function (user) {
    if (user) {
      done(null, user.get());
    } else {
      done(user.errors, null);
    }
  });
});

module.exports = localSignup;
