const express = require("express");
// passport
const passport = require("passport");
const local = require("../middleware/passport-strategies");

passport.use(local);

const router = express.Router();

const { AuthController } = require("../controllers");

router.post("/login", (req, res) => {
  AuthController.login(req, res);
});

router.post("/signup", (req, res) => {
  AuthController.signup(req, res);
});

/* ------------- TESTING NEW ROUTE WITH PASSPORT ------------------ */
router.post(
  "/signup-pp",
  passport.authenticate("local", {
    successRedirect: "/analysis",
    failureRedirect: "/login",
    failureMessage: true,
    session: false,
  })
);

module.exports = router;
