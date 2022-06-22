const { User } = require("../models");
const { NotFoundError } = require("../exceptions");

class UserService {
  static async getUser(userId) {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
    });

    if (!user) throw new NotFoundError();

    return {
      user,
    };
  }
}

module.exports = UserService;
