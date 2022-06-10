const { FileService } = require("../services");

class AnalysisController {
  static async postAnalysisData(req, res) {
    const { user } = req;
    const uploadPath = `${req.app.get("upload_dir")}/${user.id}/datev_files/`;

    FileService.uploadFile(req.files.datev_export_file, uploadPath);
  }
}

module.exports = AnalysisController;
