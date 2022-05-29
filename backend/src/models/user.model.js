const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },

    language: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { tableName: "users" }
);

module.exports = User;
