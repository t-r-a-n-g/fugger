const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const Upload = sequelize.define(
  "uploads",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
  { tableName: "uploads" }
);

module.exports = Upload;
