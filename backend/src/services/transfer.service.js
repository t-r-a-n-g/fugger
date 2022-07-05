const { Op } = require("sequelize");
const { Transfer } = require("../models");
const DatevService = require("./datev.service");
const { Category, Subcategory, DatevAccount } = require("../models");
const parseDate = require("../utils/dateParser");
const BudgetService = require("./budget.service");
const { ValueError, NotFoundError } = require("../exceptions");

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
      order: [["date", "ASC"]],
      raw: true,
      nest: true,
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

  static async updateTransfer(transferId, userId, amount) {
    const transfer = await Transfer.findOne({
      where: { id: transferId, userId },
    });
    if (!transfer) throw new NotFoundError();

    const parsedAmount = Number.parseFloat(amount);
    if (Number.isNaN(parsedAmount)) throw new ValueError();

    return transfer.update({ amount: parsedAmount });
  }
}

module.exports = TransferService;
