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
  },
  { tableName: "categories" }
);

module.exports = Category;
