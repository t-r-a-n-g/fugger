const { Op } = require("sequelize");
const { Transfer } = require("../models");
const DatevService = require("./datev.service");
const { Category, Subcategory, DatevAccount } = require("../models");
const parseDate = require("../utils/dateParser");
const BudgetService = require("./budget.service");

class TransferService {
  static async getTransfers(from, to, userId) {
    const transfers = await Transfer.findAll({
      where: {
        date: {
          [Op.between]: [from, to],
        },
        userId,
      },
      include: [
        {
          model: DatevAccount,
          as: "datevAccount",
          include: [
            {
              model: Subcategory,
              include: [
                {
                  model: Category,
                },
              ],
            },
          ],
        },
      ],
    });

    return transfers;
  }

  static async createTransfers(transfers, userId) {
    const datevAccounts = await DatevService.getUserAccounts(userId);
    const dbTransfers = [];

    for (const datevTransfer of transfers) {
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
    await BudgetService.createBudgets(transfers, userId);
    return Transfer.bulkCreate(dbTransfers);
  }
}

module.exports = TransferService;
