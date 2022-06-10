const fs = require("node:fs/promises");

class FileService {
  static async uploadFile(file, path) {
    await this.ensureDirExists(path);
    // eslint-disable-next-line
    const fileName = await this.getUniqueFileName(file.name, path);
    // file.mv(path, (err) => {
    //   if (err) throw new Error(err);
    // });
  }

  static async ensureDirExists(path) {
    try {
      await fs.mkdir(path, { recursive: true });
    } catch (err) {
      // directory does exist - ignore this
      if (err.code !== "EEXIST") throw err;
    }
  }

  // eslint-disable-next-line
  static async getUniqueFileName(path, fileName, fileId = "") {
    try {
      await fs.access(`${path}/${fileName}$`);
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = FileService;
