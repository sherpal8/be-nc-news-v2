const { updateArticle } = require("../models/updateArticle");

exports.patchArticle = (req, res, next) => {
  const article_id = req.params;
  const { inc_votes } = req.body;
  updateArticle(article_id, inc_votes)
    .then(([article]) => {
      if (!inc_votes) res.status(400).send({ msg: "Bad request" });
      if (!article) res.status(404).send({ msg: "Page not found" });
      res.status(200).send({ article });
    })
    .catch(err => next(err));
};
