const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const Transfer = sequelize.define(
  "transfer",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
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
