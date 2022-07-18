/* eslint-disable no-param-reassign */

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
    order_num: {
      type: DataTypes.INTEGER,
      default: 0,
    },
  },
  { tableName: "datev_accounts" }
);

DatevAccount.beforeFind("addType", (opts) => {
  const typeAttribute = [sequelize.literal("'datevAccount'"), "type"];
  if (opts.attributes) opts.attributes.push(typeAttribute);
  else opts.attributes = ["id", "name", "number", typeAttribute];
});

module.exports = DatevAccount;
