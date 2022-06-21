const { TransferService } = require("../services");

class TransferController {
  static async updateTransfer(req, res) {
    const { transferId } = req.params;
    const { amount } = req.body;

    const transfer = await TransferService.updateTransfer(
      transferId,
      req.user.id,
      amount
    );
    return res.json(transfer);
  }
}

module.exports = TransferController;
