// TO DO: how to deal with errors?

const jwt = require("jsonwebtoken"); // for encoding user info into a token

class AuthControllerPassport {
  static async login(req, res) {
    let resData = {};
    try {
      const { id } = req.user;
      const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        // expiresIn: 86400, // 24 hours
        expiresIn: 999999999,
      });
      resData = { success: true };
      res.cookie("user_token", token);
    } catch (err) {
      resData = { success: false, error: err };
    }
    return res.json(resData);
  }

  static async signup(req, res) {
    let resData = {};
    try {
      const { id } = req.user;
      const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        // expiresIn: 86400, // 24 hours
        expiresIn: 999999999,
      });
      resData = { success: true, user: req.user };
      res.cookie("user_token", token);
    } catch (err) {
      resData = { success: false, error: err };
    }
    return res.json(resData);
  }
}

module.exports = AuthControllerPassport;
