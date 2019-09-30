const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter");

const _ = require("./errors/errors.js");

app.use(express.json());

app.use("/api", apiRouter);

// custom error 404
app.all("/*", (req, res, next) =>
  res.status(404).send({ msg: "Page not found" })
);

// psql error handlers
app.use(_.errorHandler400);
app.use(_.errorHandler404);
app.use(_.errorHandler422);
app.use(_.errorHandler500);

module.exports = app;
