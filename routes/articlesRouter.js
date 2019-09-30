const express = require("express");
const articlesRouter = express.Router();
const { getArticle } = require("../controllers/getArticle");
const { patchArticle } = require("../controllers/patchArticle");
const { postComment } = require("../controllers/postComment");
const _ = require("../errors/errors");

articlesRouter
  .route("/:article_id")
  .get(getArticle)
  .patch(patchArticle)
  .all(_.errorHandler405);

articlesRouter.route("/:article_id/comments").post(postComment);

module.exports = articlesRouter;
