const express = require("express");
const cors = require("cors");
const massive = require("massive");
const path = require("path");

const loginRouter = require("./router/login");
const createUserRouter = require("./router/createUser");

require("dotenv").config({
  path: path.join(__dirname, "./.env"),
});

const { CONNECTION_STRING, PORT } = process.env;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", loginRouter);
app.use("/", createUserRouter);

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
}).then((dbInstance) => {
  app.set("db", dbInstance);
  console.log("db connected");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
