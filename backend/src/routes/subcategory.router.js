const express = require("express");

const router = express.Router();

const { CategoryController } = require("../controllers");
const { verifyToken } = require("../middleware/auth.middleware");

router.put("/:categoryId", verifyToken, (req, res) => {
  try {
    CategoryController.updateSubcategory(req, res);
  } catch (err) {
    res.status(500).send("500-error");
  }
});

module.exports = router;
