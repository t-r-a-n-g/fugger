const { DatevAccount, Category, Subcategory } = require("../models");

class DatevService {
  static async getUserAccounts(userId, includeParents = true) {
    const include = [
      {
        model: Subcategory,
        attributes: ["id"],
        include: [
          {
            model: Category,
            attributes: ["id"],
          },
        ],
      },
    ];

    const accounts = await DatevAccount.findAll({
      where: { userId },
      include: includeParents ? include : [],
    });

    return accounts;
  }

  static async getUserAccount(userId, accountId, includeParents = true) {
    const include = [
      {
        model: Subcategory,
        attributes: ["id"],
        include: [
          {
            model: Category,
            attributes: ["id"],
          },
        ],
      },
    ];

    const account = await DatevAccount.findOne({
      where: { userId, id: accountId },
      include: includeParents ? include : [],
    });

    return account;
  }
}

module.exports = DatevService;
