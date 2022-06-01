const User = require("./user.model");
const Category = require("./category.model");
const Subcategory = require("./subcategory.model");
const DatevAccount = require("./datevAccount.model");
const Transfer = require("./transfer.model");
const Budget = require("./budget.model");
const Upload = require("./upload.model");
const DatevAccountDefaults = require("./datevAccountDefaults.model");

const createRelations = require("./createRelations");
const setupData = require("./setupData");

const sequelize = require("../utils/db");

module.exports = {
  User,
  Category,
  Subcategory,
  DatevAccount,
  Transfer,
  Budget,
  Upload,
  DatevAccountDefaults,

  setupData: setupData.setupData,
  setupDummyData: setupData.setupDummyData,

  createRelations,
  sequelize,
};
