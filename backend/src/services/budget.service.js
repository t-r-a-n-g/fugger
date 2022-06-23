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
        return el.number === budgetInput.number;
      });

      if (userDatevAccount) {
        const tDate = parseDate(budgetInput.date);
        dbBudgets.push({
          datevAccountId: userDatevAccount.id,
          amount: budgetInput.amount,
          date: tDate.date,
          userId,
        });
      }
    }

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
