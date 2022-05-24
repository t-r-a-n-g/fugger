class AuthentificationError extends Error {
  constructor(message, fields) {
    super(message);
    this.name = "AuthentificationError";
    this.fields = fields;
  }
}

module.exports = AuthentificationError;
