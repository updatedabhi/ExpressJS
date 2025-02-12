const express = require("express");
const hello = require("./middleware/greet");
const app = express();
const morgan = require("morgan");
const studentRouter = require("./router/studentRouter");
const userRouter = require("./router/userRoute");
// const logger = require("./middleware/logger");

// app.use(logger);

app.use(express.json());

app.use(hello);

app.use(morgan("dev"));

app.use("/api/v1/students", studentRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
