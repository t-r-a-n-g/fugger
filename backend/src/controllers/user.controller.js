const { UserService } = require("../services");

class UserController {
  static async changeUser(req, res) {
    const { data } = req.body;
    const user = await UserService.changeUser(req.user, data);
    res.json(user);
  }
}
module.exports = UserController;
