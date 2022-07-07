const fs = require("node:fs/promises");
const { nanoid } = require("nanoid");
const { Upload } = require("../models");

class UploadsService {
  static async uploadFile(file, path, userId) {
    await this.ensureDirExists(path);
    const fileName = await this.getUniqueFileName(file.name);

    return new Promise((resolve, reject) => {
      file.mv(`${path}/${fileName}`, (err) => {
        if (err) return reject(err);

        const upload = Upload.create({
          file_path: path,
          file_name: fileName,
          org_file_name: file.name,
          userId,
        });

        return resolve(upload);
      });
    });
  }

  static async ensureDirExists(path) {
    try {
      await fs.mkdir(path, { recursive: true });
    } catch (err) {
      // directory does exist - ignore this
      if (err.code !== "EEXIST") throw err;
    }
  }

  static async getUniqueFileName(fileName) {
    const timestamp = +new Date();
    const id = await nanoid(2);

    const uniqueFileName = `${id}${timestamp}-${fileName}`;
    return uniqueFileName;
  }

  static async getUploadHistory(userId) {
    const uploadHistory = await Upload.findAll({ where: { userId } });

    return uploadHistory;
  }
}

module.exports = UploadsService;
