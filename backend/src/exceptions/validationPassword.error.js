class ValidationPasswordError extends Error {
  constructor(message, fields) {
    super(message);
    this.name = "ValidationPasswordError";
    this.fields = fields;
  }
}

module.exports = ValidationPasswordError;
