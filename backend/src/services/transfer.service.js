const { Transfer } = require("../models");
const DatevService = require("./datev.service");

class TransferService {
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
          const tDate = transfer.date.split("/"); // 0: month, 1: year
          dbTransfers.push({
            datevAccountId: userDatevAccount.id,
            amount: transfer.amount,
            date: new Date(Date.UTC(tDate[1], monthIndex[tDate[0]])),
          });
        }
      }
    }

    return Transfer.bulkCreate(dbTransfers);
  }
}

module.exports = TransferService;
