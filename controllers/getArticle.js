const { fetchArticle } = require("../models/fetchArticle");

exports.getArticle = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticle(article_id)
    .then(([article]) => {
      if (!article) {
        res.status(404).send({ msg: "Page not found" });
      }
      res.status(200).send({ article });
    })
    .catch(err => next(err));
};
