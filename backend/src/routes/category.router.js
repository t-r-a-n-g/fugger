const express = require("express");

const router = express.Router();

const { CategoryController } = require("../controllers");
const { verifyToken } = require("../middleware/auth.middleware");

router.get("/", verifyToken, (req, res) => {
  CategoryController.getCategories(req, res);
});

router.put("/:categoryId", verifyToken, (req, res) => {
  CategoryController.updateCategory(req, res);
});

module.exports = router;
