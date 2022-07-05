const { Op } = require("sequelize");
const { Budget } = require("../models");
const parseDate = require("../utils/dateParser");
const DatevService = require("./datev.service");
const { ValueError, NotFoundError } = require("../exceptions");

class BudgetService {
  static async getBudgets(from, to, userId) {
    const budgets = await Budget.findAll({
      where: {
        date: {
          [Op.between]: [from, to],
        },
        userId,
      },
    });
    return budgets;
  }

  static async createBudgets(budgets, userId) {
    const datevAccounts = await DatevService.getUserAccounts(userId);
    const dbBudgets = [];

    for (const budgetInput of budgets) {
      // looking for the respective datev account which user defined budget for
      const userDatevAccount = datevAccounts.find((el) => {
        return el.id === budgetInput.account.id;
      });

      // parse amount and date for correct format
      const parsedAmount = Number.parseFloat(budgetInput.amount);
      if (Number.isNaN(parsedAmount) || parsedAmount < 0)
        throw new ValueError();

      // needs to be modified
      const parsedDate = parseDate(budgetInput.date);

      // check if budget entry already exists in db
      // eslint-disable-next-line no-await-in-loop
      const budgetEntry = await Budget.findOne({
        where: {
          datevAccountId: budgetInput.account.id,
          date: parsedDate.date,
          userId,
        },
      });

      // update already existing budgets
      if (budgetEntry) {
        // eslint-disable-next-line no-await-in-loop
        await BudgetService.updateBudget(budgetEntry.id, userId, parsedAmount);
      }

      // create new budgets
      if (userDatevAccount && !budgetEntry) {
        dbBudgets.push({
          datevAccountId: userDatevAccount.id,
          amount: parsedAmount,
          date: parsedDate.date,
          userId,
        });
      }
    }
    // return something else here?
    return Budget.bulkCreate(dbBudgets);
  }

  static async updateBudget(budgetId, userId, amount) {
    const budget = await Budget.findOne({ where: { id: budgetId, userId } });
    if (!budget) throw new NotFoundError();

    const parsedAmount = Number.parseFloat(amount);
    if (Number.isNaN(parsedAmount) || parsedAmount < 0) throw new ValueError();

    return budget.update({ amount: parsedAmount });
  }
}

module.exports = BudgetService;
