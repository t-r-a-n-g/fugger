const { DatevService } = require("../services");

// TO DO: error handling
class DatevAccountController {
  static async getDatevAccounts(req, res) {
    const { from, to } = req.query;
    const accounts = await DatevService.getUserAccounts(req.user.id, from, to);
    return res.json(accounts);
  }
}

module.exports = DatevAccountController;
