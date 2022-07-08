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

  Subcategory.hasMany(DatevAccount);
  DatevAccount.belongsTo(Subcategory);

  Category.belongsTo(User);
  User.hasMany(Category);

  Subcategory.belongsTo(User);
  User.hasMany(Subcategory);

  // TRANSFER
  Transfer.belongsTo(User);
  User.hasMany(Transfer);

  Transfer.belongsTo(Category);
  Category.hasMany(Transfer);

  Transfer.belongsTo(Subcategory);
  Subcategory.hasMany(Transfer);

  Transfer.belongsTo(DatevAccount, { as: "datevAccount" });
  DatevAccount.hasMany(Transfer);

  // BUDGET
  Budget.belongsTo(User);
  User.hasMany(Budget);

  Budget.belongsTo(Category);
  Category.hasMany(Budget);

  Budget.belongsTo(Subcategory);
  Subcategory.hasMany(Budget);

  Budget.belongsTo(DatevAccount, { as: "datevAccount" });
  DatevAccount.hasMany(Budget);

  // USER
  User.hasMany(Upload);
  Upload.belongsTo(User);

  User.hasMany(DatevAccount);
  DatevAccount.belongsTo(User);

  // Many-to-Many User Relations
  // User.belongsToMany(Category, { through: "UserCategory" });
  // Category.belongsToMany(User, { through: "UserCategory" });

  // User.belongsToMany(Subcategory, { through: "UserSubategory" });
  // Subcategory.belongsToMany(User, { through: "UserSubategory" });
};
