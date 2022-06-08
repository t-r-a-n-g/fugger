class ValidationEmailError extends Error {
  constructor(message, fields) {
    super(message);
    this.name = "ValidationEmailError";
    this.fields = fields;
  }
}

module.exports = ValidationEmailError;
