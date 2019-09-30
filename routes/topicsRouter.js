const express = require("express");
const topicsRouter = express.Router();
const { getTopics } = require("../controllers/getTopics");
const _ = require("../errors/errors.js");

topicsRouter
  .route("/")
  .get(getTopics)
  .all(_.errorHandler405);

module.exports = topicsRouter;
