const express = require("express");

const router = express.Router();

const { CategoryController, DatevController } = require("../controllers");
const { verifyToken } = require("../middleware/auth.middleware");

router.get("/", verifyToken, (req, res) => {
  DatevController.getDatevAccounts(req, res);
});

router.put("/:accountId", verifyToken, (req, res) => {
  try {
    CategoryController.updateDatevAccount(req, res);
  } catch (err) {
    res.status(500).send("500-error");
  }
});

module.exports = router;
