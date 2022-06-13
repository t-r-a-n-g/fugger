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
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failed",
  });
});

router.get(
  "/google",
  passport.authenticate("google", { session: false, scope: ["profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    successRedirect: "http://localhost:3000/analysis",
    failureRedirect: "/login/failed",
  })
);
/* eslint consistent-return: 0 */
/* eslint func-names: 0 */
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
  res.redirect("http://localhost:3000/login");
});

module.exports = router;
