const express = require("express");

const router = express.Router();

const { AnalysisController } = require("../controllers");
const { verifyToken } = require("../middleware/auth.middleware");

router.get("/", verifyToken, (req, res) => {
  try {
    AnalysisController.getAnalysisData(req, res);
  } catch (err) {
    res.status(500).send("500-error");
  }
});

router.get("/budgets", verifyToken, (req, res) => {
  try {
    AnalysisController.getBudgetData(req, res);
  } catch (err) {
    res.status(500).send("500-error");
  }
});

router.post("/", verifyToken, (req, res) => {
  try {
    AnalysisController.postAnalysisData(req, res);
  } catch (err) {
    res.status(500).send("500-error");
  }
});

module.exports = router;
