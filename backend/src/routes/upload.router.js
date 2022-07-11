const express = require("express");

const router = express.Router();

const { UploadController } = require("../controllers");
const { verifyToken } = require("../middleware/auth.middleware");

router.get("/", verifyToken, (req, res) => {
  try {
    UploadController.getUploadHistory(req, res);
  } catch (err) {
    res.status(500).send("500-error");
  }
});

module.exports = router;
