const express = require("express");

const router = express.Router();

const { CategoryController } = require("../controllers");
const { verifyToken } = require("../middleware/auth.middleware");

router.put("/:categoryId", verifyToken, (req, res) => {
  CategoryController.updateSubcategory(req, res);
});

module.exports = router;
