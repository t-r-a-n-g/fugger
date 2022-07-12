const { TransferService, BudgetService } = require("../services");

// ToDo: implement error handling
class AnalysisController {
  static categories = {};

  static subcategories = {};

  static datevAccounts = {};

  static getTransferParents(transfer) {
    const self = AnalysisController;

    const categoryId = transfer.category.id;
    const subcategoryId = transfer.subcategory.id;
    const datevAccountId = transfer.datevAccount.id;

    if (!self.categories[categoryId])
      self.categories[categoryId] = {
        ...transfer.category,
        totalSums: {},
        isEmpty: true,
        type: "category",
      };

    if (!self.subcategories[subcategoryId])
      self.subcategories[subcategoryId] = {
        ...transfer.subcategory,
        totalSums: {},
        isEmpty: true,
        type: "subcategory",
      };

    if (!self.datevAccounts[datevAccountId])
      self.datevAccounts[datevAccountId] = {
        ...transfer.datevAccount,
        totalSums: {},
        isEmpty: true,
        type: "datevAccount",
      };

    return {
      category: self.categories[categoryId],
      subcategory: self.subcategories[subcategoryId],
      datevAccount: self.datevAccounts[datevAccountId],
    };
  }

  static async getBudgetData(req, res) {
    const { from, to } = req.query;

    const budgets = await BudgetService.getBudgets(from, to, req.user.id);

    const self = AnalysisController;
    self.categories = {};
    self.subcategories = {};
    self.datevAccounts = {};

    for (const budget of budgets) {
      const { category, subcategory, datevAccount } =
        self.getTransferParents(budget);

      const dateTime = budget.date.getTime();
      for (const parent of [category, subcategory, datevAccount]) {
        if (!parent.totalSums[dateTime]) {
          parent.totalSums[dateTime] = {
            actual: 0,
            budget: 0,
            date: dateTime,
            type: "H",
          };
        }

        parent.totalSums[dateTime].budget += budget.amount;
        if (parent.isEmpty) parent.isEmpty = budget.amount === 0;

        if (parent.type === "datevAccount") {
          parent.totalSums[dateTime].budgetId = budget.id;
        }
      }
    }

    return res.json({
      categories: Object.values(self.categories).filter((cat) => !cat.isEmpty),
      subcategories: Object.values(self.subcategories).filter(
        (scat) => !scat.isEmpty
      ),
      datevAccounts: Object.values(self.datevAccounts).filter(
        (dtv) => !dtv.isEmpty
      ),
    });
  }

  static async getAnalysisData(req, res) {
    const { from, to } = req.query;

    const transfers = await TransferService.getTransfers(from, to, req.user.id);
    const budgets = await BudgetService.getBudgets(from, to, req.user.id);

    const self = AnalysisController;
    self.categories = {};
    self.subcategories = {};
    self.datevAccounts = {};

    for (const transfer of transfers) {
      const { category, subcategory, datevAccount } =
        self.getTransferParents(transfer);

      const dateTime = transfer.date.getTime();
      const budget = budgets.find(
        (b) =>
          b.datevAccountId === transfer.datevAccountId &&
          b.date.getTime() === dateTime
      );

      for (const parent of [category, subcategory, datevAccount]) {
        if (!parent.totalSums[dateTime]) {
          parent.totalSums[dateTime] = {
            actual: 0,
            budget: 0,
            date: dateTime,
            type: transfer.type,
          };
        }

        if (transfer.type === "H")
          parent.totalSums[dateTime].actual += transfer.amount;
        else parent.totalSums[dateTime].actual -= transfer.amount;

        if (budget) parent.totalSums[dateTime].budget += budget.amount;

        if (parent.totalSums[dateTime].actual < 0)
          parent.totalSums[dateTime].type = "S";
        else parent.totalSums[dateTime].type = "H";

        if (parent.isEmpty) parent.isEmpty = transfer.amount === 0;

        if (parent.type === "datevAccount") {
          parent.totalSums[dateTime].transferId = transfer.id;
          parent.totalSums[dateTime].budgetId = budget?.id;
        }
      }
    }

    return res.json({
      categories: Object.values(self.categories).filter((cat) => !cat.isEmpty),
      subcategories: Object.values(self.subcategories).filter(
        (scat) => !scat.isEmpty
      ),
      datevAccounts: Object.values(self.datevAccounts).filter(
        (dtv) => !dtv.isEmpty
      ),
    });
  }
}

module.exports = AnalysisController;
