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
  const categories = {};
  for(const acc of defaultDatevAccounts) {
    if(!categories[acc.category_name]) {
      categories[acc.category_name] = {
        userId: user.id,
        name: acc.category_name,
        order_num: acc.category_order,
      }
    }
  }

  const userCategories = await Category.bulkCreate(Object.values(categories));

  // convert subcategory names to object to make them unique, find parent category and bulk insert into db
  const subcategories = {};
  for (const acc of defaultDatevAccounts) {
    if (!subcategories[acc.subcategory_name]) {
      subcategories[acc.subcategory_name] = {
        categoryId: userCategories.find((cat) => cat.name === acc.category_name)
          .id,
        name: acc.subcategory_name,
        userId: user.id,
        order_num: 0,
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
      order_num: 0
    };
  });

  DatevAccount.bulkCreate(userDatevAccounts);
});
module.exports = User;
