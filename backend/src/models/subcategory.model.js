/* eslint-disable no-param-reassign */

const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const Subcategory = sequelize.define(
  "subcategory",
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
  },
  { tableName: "subcategories" }
);

Subcategory.beforeFind("addType", (opts) => {
  const typeAttribute = [sequelize.literal("'subcategory'"), "type"];

  if (opts.attributes) opts.attributes.push(typeAttribute);
  else opts.attributes = ["*", typeAttribute];
});

module.exports = Subcategory;
