const { DatevService } = require("../services");

// TO DO: error handling
class DatevAccountController {
  static async getDatevAccounts(req, res) {
    const accounts = await DatevService.getUserAccounts(req.user.id);
    return res.json(accounts);
  }
}

module.exports = DatevAccountController;
