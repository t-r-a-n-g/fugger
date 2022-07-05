const express = require("express");

const router = express.Router();

const {
  CategoryController,
  DatevAccountController,
} = require("../controllers");
const { verifyToken } = require("../middleware/auth.middleware");

router.put("/:accountId", verifyToken, (req, res) => {
  CategoryController.updateDatevAccount(req, res);
});

router.get("/", verifyToken, (req, res) => {
  DatevAccountController.getDatevAccounts(req, res);
});

module.exports = router;
