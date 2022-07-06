const {
  UploadService,
  TransferService,
  BudgetService,
} = require("../services");
const DatevParser = require("../utils/file-parsers/datevParser");
// const parseDate = require("../utils/dateParser");

// ToDo: implement error handling
class AnalysisController {
  static categories = {};

  static subcategories = {};

  static datevAccounts = {};

  static transfers = [];

  static transferMonths = {};

  static getTransferParents(transfer) {
    const self = AnalysisController;

    const [categoryId, subcategoryId, datevAccountId] = [
      transfer.datevAccount.subcategory.category.id,
      transfer.datevAccount.subcategory.id,
      transfer.datevAccount.id,
    ];

    const [category, subcategory, datevAccount] = [
      self.categories[categoryId],
      self.subcategories[subcategoryId],
      self.datevAccounts[datevAccountId],
    ];

    return [category, subcategory, datevAccount];
  }

  static fillPropsFromTransfer(transfer) {
    const self = AnalysisController;

    const [categoryId, subcategoryId, datevAccountId] = [
      transfer.datevAccount.subcategory.category.id,
      transfer.datevAccount.subcategory.id,
      transfer.datevAccount.id,
    ];

    if (!self.datevAccounts[datevAccountId]) {
      const dt = transfer.datevAccount;
      self.datevAccounts[datevAccountId] = {
        id: dt.id,
        name: dt.name,
        subcategoryId,
        categoryId,
        type: "datev",
      };
    }

    if (!self.subcategories[subcategoryId]) {
      const sc = transfer.datevAccount.subcategory;
      self.subcategories[subcategoryId] = {
        id: sc.id,
        name: sc.name,
        childIds: {}, // use an object instead of a Set, because a set becomes an empty object on res.send and sends not data
        categoryId,
        type: "subcategory",
      };
    }

    if (!self.categories[categoryId]) {
      const cat = transfer.datevAccount.subcategory.category;
      self.categories[categoryId] = {
        id: cat.id,
        name: cat.name,
        childIds: {}, // use an object instead of a Set, because a set becomes an empty object on res.send and sends not data
        type: "category",
      };
    }
  }

  static async getAnalysisData(req, res) {
    // const from = parseDate(req.query.from).date;
    // const to = parseDate(req.query.to).date;
    const { from, to } = req.query;
    const transfers = await TransferService.getTransfers(from, to, req.user.id);
    const budgets = await BudgetService.getBudgets(from, to, req.user.id);

    const self = AnalysisController;
    for (const trsf of transfers) {
      self.fillPropsFromTransfer(trsf);

      const [category, subcategory, datevAccount] =
        self.getTransferParents(trsf);

      const dateKey = `${trsf.date.toLocaleDateString("en-US", {
        month: "short",
      })}${trsf.date.getFullYear()}`; // e.g. Jan2019

      const transferAmount = Math.abs(trsf.amount);
      const transferType = trsf.amount < 0 ? "S" : "H";

      if (!self.transferMonths[dateKey])
        self.transferMonths[dateKey] = { date: trsf.date, key: dateKey };

      const budget = budgets.find((b) => {
        return (
          b.date.getTime() === trsf.date.getTime() &&
          b.datevAccountId === datevAccount.id
        );
      });

      self.transfers.push({
        id: trsf.id,
        date: trsf.date,
        actual: transferAmount,
        budget: budget?.amount,
        type: transferType,
        dateKey,
        datevAccountId: datevAccount.id,
        categoryId: category.id,
        subcategoryId: subcategory.id,
      });

      subcategory.childIds[datevAccount.id] = true;
      category.childIds[subcategory.id] = true;
    }

    res.json({
      categories: self.categories,
      subcategories: self.subcategories,
      datevAccounts: self.datevAccounts,
      transfers: self.transfers,
      dates: Object.values(self.transferMonths),
    });
    // res.json({
    // categories: Object.values(self.categories),
    // subcategories: Object.values(self.subcategories),
    // datevAccounts: Object.values(self.datevAccounts),
    // transfers: self.transfers,
    // dates: Object.values(self.transferMonths),
    // });

    self.categories = {};
    self.subcategories = {};
    self.transferMonths = {};
    self.datevAccounts = {};
    self.transfers = [];
  }

  static async postAnalysisData(req, res) {
    const { user } = req;
    const uploadPath = `${req.app.get("upload_dir")}/${user.id}/datev_files`;

    if (!req.files?.datev_export_file)
      return res.status(400).json({ error: "err-no-file" });

    const uploadedFile = await UploadService.uploadFile(
      req.files.datev_export_file,
      uploadPath,
      user.id
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
