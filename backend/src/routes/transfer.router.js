const express = require("express");

const router = express.Router();

const { TransferController } = require("../controllers");
const { verifyToken } = require("../middleware/auth.middleware");

router.get("/", verifyToken, (req, res) => {
  TransferController.getTransfers(req, res);
});

router.put("/:transferId", verifyToken, (req, res) => {
  TransferController.updateTransfer(req, res);
});

router.post("/", verifyToken, (req, res) => {
  TransferController.createTransfers(req, res);
});
module.exports = router;
