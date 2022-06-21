const express = require("express");

const router = express.Router();

const { AnalysisController } = require("../controllers");
const { verifyToken } = require("../middleware/auth.middleware");

router.get("/", verifyToken, (req, res) => {
  AnalysisController.getAnalysisData(req, res);
});

router.post("/", verifyToken, (req, res) => {
  AnalysisController.postAnalysisData(req, res);
});

module.exports = router;
