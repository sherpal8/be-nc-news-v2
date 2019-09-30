const connection = require("../connection.js");

exports.fetchArticle = article_id => {
  return connection
    .select("articles.*")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .count({ comment_count: "comments.article_id" })
    .groupBy("articles.article_id")
    .where({ "articles.article_id": article_id });
};
