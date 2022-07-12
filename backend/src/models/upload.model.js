const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const Upload = sequelize.define(
  "upload",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    file_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    file_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    org_file_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  { tableName: "uploads" }
);

module.exports = Upload;
