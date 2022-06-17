const {
  // DatevAccountDefaults,
  DatevAccount,
  // Category,
  // Subcategory,
} = require("../models");

class DatevService {
  static async getUserAccounts(userId) {
    const accounts = DatevAccount.findAll({ where: { userId } });
    return accounts;
  }
}

module.exports = DatevService;
