/* eslint-disable no-param-reassign */
const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const Category = sequelize.define(
  "category",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    order_num: {
      type: DataTypes.INTEGER,
      default: 0,
    },
  },
  { tableName: "categories" }
);

Category.beforeFind("addType", (opts) => {
  const typeAttribute = [sequelize.literal("'category'"), "type"];
  if (opts.attributes) opts.attributes.push(typeAttribute);
  else opts.attributes = [sequelize.literal("*"), typeAttribute];
});

module.exports = Category;
