const express = require("express");

const router = express.Router();

const { AuthController } = require("../controllers");

router.post("/login", (req, res) => {
  AuthController.login(req, res);
});

router.post("/signup", (req, res) => {
  AuthController.signup(req, res);
});

module.exports = router;
