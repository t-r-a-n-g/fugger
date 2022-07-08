const express = require("express");

const router = express.Router();

const { UploadController } = require("../controllers");
const { verifyToken } = require("../middleware/auth.middleware");

router.get("/", verifyToken, (req, res) => {
  UploadController.getUploadHistory(req, res);
});

module.exports = router;
