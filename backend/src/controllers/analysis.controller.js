const {
  UploadService,
  TransferService,
  BudgetService,
} = require("../services");
const DatevParser = require("../utils/file-parsers/datevParser");
const parseDate = require("../utils/dateParser");

// ToDo: implement error handling
class AnalysisController {
  static async getAnalysisData(req, res) {
    const from = parseDate(req.query.from).date;
    const to = parseDate(req.query.to).date;
    const transfers = await TransferService.getTransfers(from, to, req.user.id);
    const budgets = await BudgetService.getBudgets(from, to, req.user.id);

    const categories = {};
    const subcategories = {};
    const datevAccounts = {};
    const monthlyData = {};

    for (const [index, trsf] of transfers.entries()) {
      const [categoryId, subcategoryId, datevAccountId] = [
        trsf.datevAccount.subcategory.category.id,
        trsf.datevAccount.subcategory.id,
        trsf.datevAccount.id,
      ];

      if (!datevAccounts[datevAccountId]) {
        const dt = trsf.datevAccount;
        datevAccounts[datevAccountId] = {
          id: dt.id,
          name: dt.name,
          subcategoryId,
        };
      }

      if (!subcategories[subcategoryId]) {
        const sc = trsf.datevAccount.subcategory;
        subcategories[subcategoryId] = {
          id: sc.id,
          name: sc.name,
          categoryId,
        };
      }

      if (!categories[categoryId])
        categories[categoryId] = trsf.datevAccount.subcategory.category;

      const dateKey = `${trsf.date.toLocaleDateString("en-US", {
        month: "short",
      })}${trsf.date.getFullYear()}`; // e.g. Jan2019

      if (!monthlyData[dateKey]) {
        monthlyData[dateKey] = {
          id: index + 1,
          date: trsf.date,
          key: dateKey,
          transfers: [],
        };
      }

      const budget = budgets.find((b) => {
        return (
          b.date.getTime() === trsf.date.getTime() &&
          b.datevAccountId === datevAccountId
        );
      });

      monthlyData[dateKey].transfers.push({
        id: trsf.id,
        actual: trsf.amount,
        budget: budget.amount,
        datevAccountId,
      });
    }
    res.json({
      categories: Object.values(categories),
      subcategories: Object.values(subcategories),
      datevAccounts: Object.values(datevAccounts),
      monthlyData: Object.values(monthlyData),
    });
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
