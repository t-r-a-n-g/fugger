const auth = require("./auth.router");
const analysis = require("./analysis.router");
const categories = require("./category.router");
const subcategories = require("./subcategory.router");
const datev = require("./datev.router");

const transfers = require("./transfer.router");
const budgets = require("./budget.router");
const users = require("./user.router");
const uploads = require("./upload.router");

module.exports = {
  auth,
  analysis,
  categories,
  subcategories,
  datev,
  transfers,
  budgets,
  users,
  uploads,
};
