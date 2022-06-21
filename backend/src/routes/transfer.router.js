const express = require("express");

const router = express.Router();

const { TransferController } = require("../controllers");
const { verifyToken } = require("../middleware/auth.middleware");

router.put("/:transferId", verifyToken, (req, res) => {
  TransferController.updateTransfer(req, res);
});

module.exports = router;
