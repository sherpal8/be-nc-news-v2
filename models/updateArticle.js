const connection = require("../connection.js");

exports.updateArticle = (article_id, inc_votes) => {
  return connection("articles")
    .where(article_id)
    .increment("votes", inc_votes)
    .returning("*");
};
