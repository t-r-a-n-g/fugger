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

  static async changeUser(user, data) {
    return user.update(data);
  }
}

module.exports = UserService;
