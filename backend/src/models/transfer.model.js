const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const Transfer = sequelize.define(
  "transfers",
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
  },
  { tableName: "transfers" }
);

module.exports = Transfer;
