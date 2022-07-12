const express = require("express");

const router = express.Router();

const { UserController } = require("../controllers");
const { verifyToken } = require("../middleware/auth.middleware");

router.put("/", verifyToken, (req, res) => {
  try {
    UserController.changeUser(req, res);
  } catch (err) {
    res.status(500).send("500-error");
  }
});

module.exports = router;
