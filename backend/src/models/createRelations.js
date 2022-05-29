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

  // One-to-Many Transfers & DatevAccounts
  Transfer.hasMany(DatevAccount);
  DatevAccount.belongsTo(Transfer);

  // One-to-Many Budgets & Subcategories
  Budget.hasMany(Subcategory);
  Subcategory.belongsTo(Budget);

  // One-To-Many User & Uploads
  User.hasMany(Upload);
  Upload.belongsTo(User);

  // Many-to-Many User Relations
  User.hasMany(Category, { through: "UserCategory" });
  Category.hasMany(User, { through: "UserCategory" });

  User.hasMany(Subcategory, { through: "UserSubategory" });
  Subcategory.hasMany(User, { through: "UserSubategory" });

  User.hasMany(DatevAccount, { through: "UserDatevAccount" });
  DatevAccount.hasMany(User, { through: "UserDatevAccount" });

  User.hasMany(Budget, { through: "UserBudget" });
  Budget.hasMany(User, { through: "UserBudget" });
};
