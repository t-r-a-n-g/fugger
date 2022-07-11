const express = require("express");

const router = express.Router();

const { AuthController } = require("../controllers");
const { verifyToken } = require("../middleware/auth.middleware");

router.post("/login", (req, res) => {
  try {
    AuthController.login(req, res);
  } catch (err) {
    res.status(500).send("500-error");
  }
});

router.post("/signup", (req, res) => {
  try {
    AuthController.signup(req, res);
  } catch (err) {
    res.status(500).send("500-error");
  }
});

router.get("/logout", verifyToken, (req, res) => {
  try {
    res.clearCookie("user_token");
    res.send();
  } catch (err) {
    res.status(500).send("500-error");
  }
});

router.get("/me", verifyToken, (req, res) => {
  try {
    res.json(req.user);
  } catch (err) {
    res.status(500).send("500-error");
  }
});
module.exports = router;
