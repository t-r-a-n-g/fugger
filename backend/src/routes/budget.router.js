const express = require("express");

const router = express.Router();

const { BudgetController } = require("../controllers");
const { verifyToken } = require("../middleware/auth.middleware");

router.put("/:budgetId", verifyToken, (req, res) => {
  BudgetController.updateBudget(req, res);
});

router.post("/", verifyToken, (req, res) => {
  BudgetController.createBudget(req, res);
});

module.exports = router;
