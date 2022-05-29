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

module.exports = Subcategory;
