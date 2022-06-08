const jwt = require("jsonwebtoken");
const { User } = require("../models");

async function verifyToken(req, res, next) {
  const token = req.cookies.user_token; // retrieving token from cookies
  const errors = {
    auth: null,
  };

  if (!token) errors.auth = "err-auth-no-token";
  else {
    try {
      const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

      const userId = decodedToken.id;
      const user = await User.findOne({
        where: { id: userId },
        attributes: { exclude: ["password"] },
      });

      if (!user) errors.auth = "err-auth-invalid-user";
      else {
        req.user = user; // why?
        return next();
      }
    } catch (err) {
      console.error(err);
      // throw new AuthorizationError("Not authorized!"); why?
      errors.auth = "err-auth-forbidden";
    }
  }

  return res.status(403).json({ errors });
}

module.exports = {
  verifyToken,
};
