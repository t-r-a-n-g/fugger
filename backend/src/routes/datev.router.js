const express = require("express");

const router = express.Router();

const { CategoryController } = require("../controllers");
const { verifyToken } = require("../middleware/auth.middleware");

router.put("/:accountId", verifyToken, (req, res) => {
  CategoryController.updateDatevAccount(req, res);
});

module.exports = router;
