const { AuthService } = require("../services");

class AuthController {
  static async login(req, res) {
    let resData = { success: false };
    try {
      const { email, password } = req.body;
      const token = await AuthService.login(email, password);

      resData = { sucess: true };
      res.cookie("user_token", token, { httpOnly: true });
    } catch (err) {
      switch (err.name) {
        case "AuthentificationError":
          res.status(403);
          resData = {
            success: false,
            errors: {
              email: "err-email-password-match",
              password: "err-email-password-match",
            },
          };
          break;

        case "ValidationError":
          res.status(400);
          resData = {
            success: false,
            errors: { email: "err-invalid-email-format" },
          };
          break;

        default:
          console.error(err);
          res.status(500);
          resData = {
            success: false,
            errors: { server: "err-internal" },
          };
      }
    }

    return res.json(resData);
  }

  static async signup(req, res) {
    let resData = {};

    try {
      const { lastname, firstname, email, password } = req.body;

      const user = await AuthService.signup({
        lastname,
        firstname,
        email,
        password,
      });
      const token = await AuthService.login(email, password);

      resData = { success: true, user };
      res.cookie("user_token", token, { httpOnly: true });
    } catch (err) {
      switch (err.name) {
        case "DuplicationError":
          res.status(409);
          resData = {
            success: false,
            errors: { email: "err-email-already-exists" },
          };
          break;

        case "ValidationEmailError":
          res.status(400);
          resData = {
            success: false,
            errors: { email: "err-invalid-email-format" },
          };
          break;

        case "ValidationPasswordError":
          res.status(400);
          resData = {
            success: false,
            errors: { password: "err-password-weak" },
          };
          break;

        default:
          console.error(err);

          res.status(500);
          resData = {
            success: false,
            errors: { server: "err-internal" },
          };
      }
    }

    return res.json(resData);
  }
}

module.exports = AuthController;
