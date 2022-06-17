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

    const monthIndex = {
      Jan: 0,
      Feb: 1,
      Mrz: 2,
      Apr: 3,
      Mai: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Okt: 9,
      Nov: 10,
      Dez: 11,
    };

    for (const datevTransfer of transfers) {
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
    await BudgetService.createBudgets(transfers, userId);
    return Transfer.bulkCreate(dbTransfers);
  }
}

module.exports = TransferService;
