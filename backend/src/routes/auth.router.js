const express = require("express");

const router = express.Router();

const { AuthController } = require("../controllers");
const { verifyToken } = require("../middleware/auth.middleware");

router.post("/login", (req, res) => {
  AuthController.login(req, res);
});

router.post("/signup", (req, res) => {
  AuthController.signup(req, res);
});

router.get("/logout", verifyToken, (req, res) => {
  res.clearCookie("user_token");
  res.send();
});

router.get("/me", verifyToken, (req, res) => {
  res.json(req.user);
  // AuthController.getCurrentUser(req, res);
});
module.exports = router;
