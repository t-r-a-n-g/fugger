const AuthentificationError = require("./authentification.error");

class DuplicationError extends AuthentificationError {
  constructor(message, fields) {
    super(message, fields);
    this.name = "DuplicationError";
  }
}

module.exports = DuplicationError;
