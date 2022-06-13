const { UploadService, TransferService } = require("../services");
const DatevParser = require("../utils/file-parsers/datevParser");

class AnalysisController {
  static async postAnalysisData(req, res) {
    const { user } = req;
    const uploadPath = `${req.app.get("upload_dir")}/${user.id}/datev_files`;

    if (!req.files?.datev_export_file)
      return res.status(400).json({ error: "err-no-file" });

    const uploadedFile = await UploadService.uploadFile(
      req.files.datev_export_file,
      uploadPath
    );

    const uploadedFilePath = `${uploadedFile.file_path}/${uploadedFile.file_name}`;
    const fileParser = new DatevParser(uploadedFilePath);
    const datevData = await fileParser.parseFinancialExportFile();

    const transfers = await TransferService.createTransfers(
      datevData,
      req.user.id
    );
    return res.json(transfers);
  }
}

module.exports = AnalysisController;
