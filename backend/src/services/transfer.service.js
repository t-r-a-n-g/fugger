const { Op } = require("sequelize");
const { Transfer } = require("../models");
const { Category, Subcategory, DatevAccount } = require("../models");

const DatevService = require("./datev.service");

// const BudgetService = require("./budget.service");

const parseDate = require("../utils/dateParser");
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
        { model: DatevAccount, as: "datevAccount" },
        { model: Category },
        { model: Subcategory },
      ],

      order: [["date", "ASC"]],
      raw: true,
      nest: true,
    });

    return transfers;
  }

  static async createTransfers(accountTransfers, userId) {
    const datevAccounts = await DatevService.getUserAccounts(userId);
    const dbTransfers = [];
    // accountTransfers contains an account number and an array (transfers) with transfers for this account
    for (const accountTransfer of accountTransfers) {
      const transferDatevAccount = datevAccounts.find((el) => {
        return el.number === accountTransfer.accountNumber;
      });

      if (transferDatevAccount) {
        for (const transfer of accountTransfer.transfers) {
          const tDate = parseDate(transfer.date);
          const subcategoryId = transferDatevAccount.subcategory.id;
          const categoryId = transferDatevAccount.subcategory.category.id;
          dbTransfers.push({
            datevAccountId: transferDatevAccount.id,
            subcategoryId,
            categoryId,
            amount: transfer.amount,
            type: transfer.type,
            date: tDate.date,
            userId,
          });
        }
      }
    }
    return Transfer.bulkCreate(dbTransfers, { updateOnDuplicate: ["amount"] });
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
