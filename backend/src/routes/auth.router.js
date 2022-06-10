const express = require("express");
// passport
const passport = require("passport");
require("../middleware/passport-strategies");

const router = express.Router();

const { AuthController, AuthControllerPassport } = require("../controllers");

router.post("/login", (req, res) => {
  AuthController.login(req, res);
});

router.post("/signup", (req, res) => {
  AuthController.signup(req, res);
});

/* ------------- TESTING NEW ROUTES WITH PASSPORT ------------------ */

router.post(
  "/signup-pp",
  passport.authenticate("local-signup", {
    session: false,
  }),
  (req, res) => AuthControllerPassport.signup(req, res)
);

router.post(
  "/login-pp",
  passport.authenticate("local-login", { session: false }),
  (req, res) => AuthControllerPassport.login(req, res)
);

// GOOGLE ROUTES
/* router.post(
  "/google",
  passport.authenticate("google-signup", { session: false })
);

router.post("/google/callback", {
  successRedirect: "/",
  failureRedirect: "/login",
  session: false,
});
 */

module.exports = router;
