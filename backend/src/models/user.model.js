/* eslint-disable no-param-reassign */

const bcrypt = require("bcrypt");
const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const Category = require("./category.model");
const Subcategory = require("./subcategory.model");
const DatevAccount = require("./datevAccount.model");
const DatevAccountDefaults = require("./datevAccountDefaults.model");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    lastname: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },

    firstname: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },

    username: {
      type: DataTypes.STRING(30),
    },

    avatar_path: {
      type: DataTypes.STRING(255),
    },

    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },

    language: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    theme: {
      type: DataTypes.STRING(10),
    },
  },
  { tableName: "users" }
);

User.beforeCreate((user) => {
  return bcrypt.hash(user.password, 10).then((hash) => {
    user.password = hash;
    user.theme = "theme1";
  });
});

User.afterCreate(async (user) => {
  const defaultDatevAccounts = await DatevAccountDefaults.findAll();
  // const userDatevAccounts = {} // { category: { subcategory: [{accountName: "", accountNumber: 123}]}}

  // Get unique category names and bulk create them
  const categoryNames = new Set(
    defaultDatevAccounts.map((acc) => acc.category_name)
  );
  const categories = [...categoryNames].map((cat) => ({
    userId: user.id,
    name: cat,
  }));
  const userCategories = await Category.bulkCreate(categories);

  // convert subcategory names to object to make them unique, find parent category and bulk insert into db
  const subcategories = {};
  for (const acc of defaultDatevAccounts) {
    if (!subcategories[acc.subcategory_name]) {
      subcategories[acc.subcategory_name] = {
        categoryId: userCategories.find((cat) => cat.name === acc.category_name)
          .id,
        name: acc.subcategory_name,
        userId: user.id,
      };
    }
  }

  const userSubcategories = await Subcategory.bulkCreate(
    Object.values(subcategories)
  );

  const userDatevAccounts = defaultDatevAccounts.map((acc) => {
    return {
      name: acc.name,
      number: acc.number,
      subcategoryId: userSubcategories.find(
        (cat) => cat.name === acc.subcategory_name
      ).id,
      userId: user.id,
    };
  });

  DatevAccount.bulkCreate(userDatevAccounts);
});
module.exports = User;
