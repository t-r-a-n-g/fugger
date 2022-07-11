require("dotenv").config();
const Sequelize = require("sequelize");

let sequelize = null;
if (process.env.DB_URI)
  sequelize = new Sequelize(process.env.DB_URI, { logging: false });
else console.warn("No DB URI found. Please add DB_URI to .env file");

module.exports = sequelize;
