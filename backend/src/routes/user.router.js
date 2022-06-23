const express = require("express");

const router = express.Router();

const { UserController } = require("../controllers");
const { verifyToken } = require("../middleware/auth.middleware");

router.put("/", verifyToken, (req, res) => {
  UserController.changeUser(req, res);
});

module.exports = router;
