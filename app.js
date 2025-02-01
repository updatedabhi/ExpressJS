const express = require("express");
const hello = require("./middleware/greet");
const app = express();
const morgan = require("morgan");
const userRouter = require("./router/userRouter");
const logger = require("./middleware/logger");

app.use(logger);

app.use(express.json());

app.use(hello);

app.use(morgan("dev"));

app.use("/api/v1/students", userRouter);

module.exports = app;
