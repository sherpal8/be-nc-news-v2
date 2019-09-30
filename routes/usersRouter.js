const express = require("express");
const usersRouter = express.Router();
const { getUser } = require("../controllers/getUser.js");
const _ = require("../errors/errors");

usersRouter
  .route("/:username")
  .get(getUser)
  .all(_.errorHandler405);

module.exports = usersRouter;
