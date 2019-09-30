const connection = require("../connection.js");

exports.sendComment = (article_id, commentData) => {
  return connection("comments")
    .insert(article_id, commentData)
    .returning("*");
};
