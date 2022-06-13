const LocalStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oauth2");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { User } = require("../models");

/* ----------------------------------- LOCAL SIGN UP STRATEGY ----------------------------------- */

/* TO DO:
 - backend validation for email and password
 - return a token somewhere (here or in Controller?)
 */

/* eslint consistent-return: 0 */
/* eslint func-names: 0 */

passport.use(
  "local-signup",
  new LocalStrategy(
    // overwriting default username field of passport
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true, // for passing the rest of req.body to callback function
    },

    async (req, formEmail, password, done) => {
      // looking for that user in db
      try {
        const userExists = await User.findOne({ where: { email: formEmail } });
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
          email: formEmail,
          password: encryptedPassword,
        });

        // putting only relevant info into req.user
        const { id, lastname, firstname, email } = user;
        const userInfo = { id, lastname, firstname, email };
        if (user) {
          return done(null, userInfo);
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);
/* // serialize
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// deserialize user
passport.deserializeUser(function (user, done) {
  User.findByPk(user.id, function (err, user) {
    done(err, user);
  });
});
 */

/* ----------------------------------- LOCAL LOGIN STRATEGY ----------------------------------- */

passport.use(
  "local-login",
  new LocalStrategy(
    // overwriting default username field of passport
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      // looking for that user in db
      try {
        const userExists = await User.findOne({ where: { email } });
        if (!userExists) {
          return done(null, false, {
            message: "User not found.",
          });
        }

        // checking if pwd is correct
        const pwdMatch = await bcrypt.compare(password, userExists.password);
        if (!pwdMatch) {
          return done(null, false, {
            message: "Wrong password.",
          });
        }

        // just putting user id in req.user because only for creating token
        const user = { id: userExists.id };
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

/* ---------------------------- GOOGLE SIGN UP STRATEGY ------------------------------- */

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);
