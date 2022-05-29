const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const DatevAccount = sequelize.define(
  "datev_account",
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
  },
  { tableName: "datev_accounts" }
);

module.exports = DatevAccount;
