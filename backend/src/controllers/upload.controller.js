const { UploadService } = require("../services");

class UploadController {
  static async getUploadHistory(req, res) {
    const uploadHistory = await UploadService.getUploadHistory(req.user.id);

    return res.json(uploadHistory);
  }
}

module.exports = UploadController;
