const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const DatevAccountDefaults = sequelize.define(
  "datev_account_defaults",
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
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    subcategory_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  { tableName: "datev_account_defaults" }
);

module.exports = DatevAccountDefaults;
