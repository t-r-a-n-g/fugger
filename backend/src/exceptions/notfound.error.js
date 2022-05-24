class AuthentificationError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
  }
}

module.exports = AuthentificationError;
