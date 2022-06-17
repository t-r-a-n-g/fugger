const { Op } = require("sequelize");
const { Budget } = require("../models");
const parseDate = require("../utils/dateParser");
const DatevService = require("./datev.service");

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
          // const tDate = transfer.date.split("/"); // 0: month, 1: year
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
}

module.exports = BudgetService;
