const express = require("express");

const router = express.Router();

const { CategoryController } = require("../controllers");
const { verifyToken } = require("../middleware/auth.middleware");

// router.get("/", verifyToken, (req, res) => {
//   CategoryController.getCategories(req, res);
// });

// router.get("/totals", verifyToken, (req, res) => {
//   CategoryController.getAllTotalSums(req, res);
// });
// router.get("/:categoryId/totals", verifyToken, (req, res) => {
//   CategoryController.getTotalSums(req, res);
// });

router.put("/:categoryId", verifyToken, (req, res) => {
  try {
    CategoryController.updateCategory(req, res);
  } catch (err) {
    res.status(500).send("500-error");
  }
});

module.exports = router;
