/* eslint-disable no-restricted-syntax  */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const swaggerFile = require("./swagger/output.json");

const db = require("./src/models");
const routes = require("./src/routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());

app.set("upload_dir", `${__dirname}/${process.env.UPLOAD_DIR}`);

// creating routes by looping over the routes/index.js file
Object.keys(routes).forEach((route) => {
  app.use(`/api/${route}`, routes[route]);
});

async function startServer() {
  const port = process.env.APP_PORT || 5000;
  app.listen(port, () => {
    console.info(`Server started on port ${port}`);
  });
}

// eslint-disable-next-line
async function checkDB() {
  try {
    await db.sequelize.authenticate();

    console.info(`DB connected`);
  } catch (err) {
    console.error("DB CONNECTION FAILED", err);
    throw err;
  }

  db.createRelations();
}

// eslint-disable-next-line
async function syncDB(force = false) {
  try {
    await db.sequelize.query("SET FOREIGN_KEY_CHECKS = 0", { raw: true });
    await db.sequelize.sync({ force });

    console.info("inserting dummy data");
    await db.setupData();
    const data = await db.setupDummyData();
    console.info("inserted data: ", data);

    console.info(`DB synced`);
  } catch (err) {
    console.error("DB CONNECTION FAILED", err);
    throw err;
  }
}

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

startServer();
checkDB();

syncDB(true);
