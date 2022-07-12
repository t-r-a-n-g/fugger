const AuthorizationError = require("./authorization.error");
const AuthentificationError = require("./authentification.error");
const DuplicationError = require("./duplication.error");
const NotFoundError = require("./notfound.error");
const ValidationEmailError = require("./validationEmail.error");
const ValidationPasswordError = require("./validationPassword.error");
const ValueError = require("./value.error");

module.exports = {
  AuthorizationError,
  AuthentificationError,
  DuplicationError,
  NotFoundError,
  ValidationEmailError,
  ValidationPasswordError,
  ValueError,
};
