const { TransferService, UploadService } = require("../services");
const DatevParser = require("../utils/file-parsers/datevParser");

class TransferController {
  static async createTransfers(req, res) {
    const { user } = req;
    const uploadPath = `${req.app.get("upload_dir")}/${user.id}/datev_files`;

    if (!req.files?.datev_export_file)
      return res.status(400).json({ error: "err-no-file" });

    const uploadedFile = await UploadService.uploadFile(
      req.files.datev_export_file,
      uploadPath,
      req.user.id
    );

    const uploadedFilePath = `${uploadedFile.file_path}/${uploadedFile.file_name}`;
    const fileParser = new DatevParser(uploadedFilePath);
    const datevData = await fileParser.parseFinancialExportFile();

    try {
      const transfers = await TransferService.createTransfers(
        datevData,
        req.user.id
      );
      return res.json(transfers);
    } catch (err) {
      return res.status(500).send("500-error");
    }
  }

  static async getTransfers(req, res) {
    const { from, to } = req.query;

    const transfers = await TransferService.getTransfers(from, to, req.user.id);
    return res.json(transfers);
  }

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
