const { TransferService, BudgetService } = require("../services");
const { getMonthRange } = require("../utils/date");

// ToDo: implement error handling
class AnalysisController {
  static categories = {};

  static subcategories = {};

  static datevAccounts = {};

  static getTransferParents(transfer) {
    const self = AnalysisController;

    const categoryId = `${transfer.category.order_num}-${transfer.category.id}`; // transfer.category.id;
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

  /*
   * format sum for a parent object (category, subcategory or datevAccount)
   *
   * take the amount of a transfer and/or a budget and add it to the parents totalSums property using the timestamp as key
   */
  static formatParentTotalSums(parent, transfer, budget, timestamp) {
    const transferType = transfer?.type ?? "H";
    if (!parent.totalSums[timestamp]) {
      parent.totalSums[timestamp] = {
        actual: 0,
        budget: 0,
        date: timestamp,
        type: transferType,
      };
    }

    if (transfer) {
      if (transfer.type === "H")
        parent.totalSums[timestamp].actual += transfer.amount;
      else parent.totalSums[timestamp].actual -= transfer.amount;
    }

    if (budget) parent.totalSums[timestamp].budget += budget.amount;

    if (parent.totalSums[timestamp].actual < 0)
      parent.totalSums[timestamp].type = "S";
    else parent.totalSums[timestamp].type = "H";

    if (parent.isEmpty)
      parent.isEmpty =
        parent.totalSums[timestamp].actual === 0 &&
        parent.totalSums[timestamp].budget === 0;

    if (parent.type === "datevAccount") {
      parent.totalSums[timestamp].transferId = transfer?.id;
      parent.totalSums[timestamp].budgetId = budget?.id;
    }
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
        self.formatParentTotalSums(parent, null, budget, dateTime);
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

      let budget = null;
      const budgetIndex = budgets.findIndex(
        (b) =>
          b.datevAccountId === transfer.datevAccountId &&
          b.date.getTime() === dateTime
      );

      if (budgetIndex >= 0) {
        // use splice to remove it from budgets array, so that we can map over the remaining budgets later
        // this fixes the bug where table data which has only a budget but no transfers is not includes
        // eslint-disable-next-line prefer-destructuring
        budget = budgets.splice(budgetIndex, 1)[0];
      }

      for (const parent of [category, subcategory, datevAccount]) {
        self.formatParentTotalSums(parent, transfer, budget, dateTime);
      }
    }

    const monthRange = getMonthRange(new Date(from), new Date(to));
    // loop over remaining budgets
    for (const budget of budgets) {
      // loop over every month to fill them with 0 if there is no budget
      for (const month of monthRange) {
        const { category, subcategory, datevAccount } =
          self.getTransferParents(budget);

        const dateTime = month.getTime();
        for (const parent of [category, subcategory, datevAccount]) {
          // since the budgets are ordered by date, we can use a zero budget if it does not belong to the current month
          // and override it later if the is a budget for the month
          if (budget.date.getTime() === month.getTime())
            self.formatParentTotalSums(parent, null, budget, dateTime);
          else self.formatParentTotalSums(parent, null, null, dateTime);
        }
      }
    }

    return res.json({
      categories: Object.values(self.categories).filter((cat) => !cat.isEmpty), // .sort((a,b) => a.order_num - b.order_num),
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
