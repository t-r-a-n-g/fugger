const validator = require("validator");

const bcrypt = require("bcrypt"); // for hashing the user password
const jwt = require("jsonwebtoken"); // for encoding user info into a token

const { User } = require("../models"); // import the User model
const {
  AuthentificationError,
  DuplicationError,
  ValidationEmailError,
  ValidationPasswordError,
} = require("../exceptions"); // import error classes

class AuthService {
  static async emailExists(email) {
    const user = await User.findOne({ where: { email } });
    if (user !== null) return true;

    return false;
  }

  static async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new AuthentificationError("user not found", ["email"]);

    const pwdMatch = await bcrypt.compare(password, user.password);
    if (!pwdMatch)
      throw new AuthentificationError("passwords do not match", ["password"]);

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      // expiresIn: 86400, // 24 hours
      expiresIn: 999999999,
    });

    return token;
  }

  static async signup(userData) {
    const { lastname, firstname, email, password } = userData;

    const emailExists = await AuthService.emailExists(email);
    if (emailExists)
      throw new DuplicationError("duplicate user data", ["email"]);

    // validation for strong password (not possible through sequelize validation because we store hashed password in db)
    const strongPassword = await validator.isStrongPassword(password);
    if (!strongPassword)
      throw new ValidationPasswordError("password to weak", ["password"]);

    const encryptedPassword = await bcrypt.hash(password, 10);

    let user = {};
    try {
      user = await User.create({
        lastname,
        firstname,
        email,
        password: encryptedPassword,
      });

      return {
        id: user.id,
        lastname: user.lastname,
        firstname: user.firstname,
        email: user.email,
      };
    } catch (err) {
      if (err)
        throw new ValidationEmailError("invalid email format", ["email"]);
    }

    return user;
  }
}

module.exports = AuthService;
