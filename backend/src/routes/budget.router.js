const express = require("express");

const router = express.Router();

const { BudgetController } = require("../controllers");
const { verifyToken } = require("../middleware/auth.middleware");

// router.get("/", verifyToken, (req, res) => {
//   BudgetController.getBudgets(req, res);
// });

router.put("/:budgetId", verifyToken, (req, res) => {
  try {
    BudgetController.updateBudget(req, res);
  } catch (err) {
    res.status(500).send("500-error");
  }
});

router.post("/", verifyToken, (req, res) => {
  try {
    BudgetController.createBudget(req, res);
  } catch (err) {
    res.status(500).send("500-error");
  }
});

module.exports = router;
