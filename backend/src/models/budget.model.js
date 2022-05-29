const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const Budget = sequelize.define(
  "budget",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    file_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  { tableName: "budgets" }
);

module.exports = Budget;
