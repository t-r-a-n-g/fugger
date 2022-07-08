const auth = require("./auth.router");
const analysis = require("./analysis.router");
const categories = require("./category.router");
const subcategories = require("./subcategory.router");
const datev = require("./datev.router");

const transfer = require("./transfer.router");
const budget = require("./budget.router");
const user = require("./user.router");
const upload = require("./upload.router");

module.exports = {
  auth,
  analysis,
  categories,
  subcategories,
  datev,
  transfer,
  budget,
  user,
  upload,
};
