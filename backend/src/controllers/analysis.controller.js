const {
  UploadService,
  TransferService,
  BudgetService,
} = require("../services");
const DatevParser = require("../utils/file-parsers/datevParser");
const parseDate = require("../utils/dateParser");

// ToDo: implement error handling
class AnalysisController {
  static categories = {};

  static subcategories = {};

  static datevAccounts = {};

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
        monthlyTotal: {},
        subcategoryId,
        categoryId,
        type: "datev",
        isEditable: true,
      };
    }

    if (!self.subcategories[subcategoryId]) {
      const sc = transfer.datevAccount.subcategory;
      self.subcategories[subcategoryId] = {
        id: sc.id,
        name: sc.name,
        monthlyTotal: {},
        children: {},
        categoryId,
        type: "subcategory",
        isEditable: true,
      };
    }

    if (!self.categories[categoryId]) {
      const cat = transfer.datevAccount.subcategory.category;
      self.categories[categoryId] = {
        ...cat,
        monthlyTotal: {},
        children: {},
        type: "category",
        isEditable: true,
      };
    }
  }

  static async getAnalysisData(req, res) {
    const from = parseDate(req.query.from).date;
    const to = parseDate(req.query.to).date;

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

      datevAccount.monthlyTotal[dateKey] = {
        id: trsf.id,
        type: transferType,
        actual: transferAmount,
        budget: budget.amount,
        isEditable: true,
        datevAccountId: datevAccount.id,
      };

      if (!subcategory.monthlyTotal[dateKey])
        subcategory.monthlyTotal[dateKey] = {
          actual: 0,
          budget: 0,
          type: transferType,
        };

      subcategory.monthlyTotal[dateKey].actual += transferAmount;
      subcategory.monthlyTotal[dateKey].budget += budget.amount;

      if (!category.monthlyTotal[dateKey])
        category.monthlyTotal[dateKey] = {
          actual: 0,
          budget: 0,
          type: transferType,
        };

      category.monthlyTotal[dateKey].actual += transferAmount;
      category.monthlyTotal[dateKey].budget += budget.amount;

      if (!subcategory.children[datevAccount.id])
        subcategory.children[datevAccount.id] = datevAccount;

      if (!category.children[subcategory.id])
        category.children[subcategory.id] = subcategory;
    }

    res.json({ categories: self.categories, dates: self.transferMonths });

    self.categories = {};
    self.subcategories = {};
    self.transferMonths = {};
    // res.json({
    //   categories,
    //   subcategories,
    //   datevAccounts,
    //   monthlyData: Object.values(monthlyData),
    // });
    // res.json({
    //   categories: Object.values(categories),
    //   subcategories: Object.values(subcategories),
    //   datevAccounts: Object.values(datevAccounts),
    //   monthlyData: Object.values(monthlyData),
    // });
  }

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
