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
  {
    tableName: "transfers",
    indexes: [
      { unique: true, fields: ["date", "datevAccountId"] },
      { unique: false, fields: ["date"] },
    ],
  }
);

module.exports = Transfer;
