const express = require("express");

const router = express.Router();

const { CategoryController, SubcategoryController } = require("../controllers");
const { verifyToken } = require("../middleware/auth.middleware");

router.get("/", verifyToken, (req, res) => {
  SubcategoryController.getSubcategories(req, res);
});

router.put("/:categoryId", verifyToken, (req, res) => {
  CategoryController.updateSubcategory(req, res);
});

module.exports = router;
