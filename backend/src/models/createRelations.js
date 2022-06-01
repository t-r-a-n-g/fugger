const User = require("./user.model");

const Category = require("./category.model");
const Subcategory = require("./subcategory.model");
const DatevAccount = require("./datevAccount.model");
const Transfer = require("./transfer.model");

const Budget = require("./budget.model");

const Upload = require("./upload.model");

module.exports = function createRelations() {
  // User Categories
  User.hasMany(Category);
  Category.belongsTo(User);

  // One-to-Many Categories & Subcategories
  Category.hasMany(Subcategory);
  Subcategory.belongsTo(Category);

  // One-to-Many Subcategories & DatevAccounts
  Subcategory.hasMany(DatevAccount);
  DatevAccount.belongsTo(Subcategory);

  // One-to-Many Transfers & DatevAccounts
  Transfer.belongsTo(DatevAccount);
  DatevAccount.hasMany(Transfer);

  // One-to-Many Budgets & Subcategories
  Budget.belongsTo(DatevAccount);
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
  // User.belongsToMany(Category, { through: "User_Categories" });
  // Category.belongsToMany(User, { through: "User_Categories" });

  // User.belongsToMany(Subcategory, { through: "User_Subcategories" });
  // Subcategory.belongsToMany(User, { through: "User_Subcategories" });
};
