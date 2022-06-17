const User = require("./user.model");

const Category = require("./category.model");
const Subcategory = require("./subcategory.model");
const DatevAccount = require("./datevAccount.model");
const Transfer = require("./transfer.model");

const Budget = require("./budget.model");

const Upload = require("./upload.model");

module.exports = function createRelations() {
  // One-to-Many Categories & Subcategories
  Category.hasMany(Subcategory);
  Subcategory.belongsTo(Category);

  // One-to-Many Subcategories & DatevAccounts
  Subcategory.hasMany(DatevAccount);
  DatevAccount.belongsTo(Subcategory);

  Category.belongsTo(User);
  User.hasMany(Category);

  Subcategory.belongsTo(User);
  User.hasMany(Subcategory);

  // One-to-Many Transfers & DatevAccounts
  Transfer.belongsTo(DatevAccount, { as: "datevAccount" });
  DatevAccount.hasMany(Transfer);

  Transfer.belongsTo(User);
  User.hasMany(Transfer);

  // One-to-Many Budgets & Subcategories
  Budget.belongsTo(DatevAccount, { as: "datevAccount" });
  DatevAccount.hasMany(Budget);

  // One-To-Many User & Uploads
  User.hasMany(Upload);
  Upload.belongsTo(User);

  // One-To-Many User & DatevAccounts
  User.hasMany(DatevAccount);
  DatevAccount.belongsTo(User);

  // One-To-Many User & Budgets
  User.hasMany(Budget);
  Budget.belongsTo(User);

  // Many-to-Many User Relations
  // User.belongsToMany(Category, { through: "UserCategory" });
  // Category.belongsToMany(User, { through: "UserCategory" });

  // User.belongsToMany(Subcategory, { through: "UserSubategory" });
  // Subcategory.belongsToMany(User, { through: "UserSubategory" });
};
