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
    const dbTransfers = [];

    for (const datevTransfer of budgets) {
      const userDatevAccount = datevAccounts.find((el) => {
        return el.number === datevTransfer.accountNumber;
      });

      if (userDatevAccount) {
        for (const transfer of datevTransfer.transfers) {
          const tDate = parseDate(transfer.date);
          dbTransfers.push({
            datevAccountId: userDatevAccount.id,
            amount: transfer.amount,
            date: tDate.date,
            userId,
          });
        }
      }
    }

    return Budget.bulkCreate(dbTransfers);
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
