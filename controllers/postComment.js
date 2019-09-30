const { sendComment } = require("../models/sendComment");

exports.postComment = (req, res, next) => {
  const article_id = req.params;
  const commentData = req.body;
  sendComment(article_id, commentData).then(comment => {
    console.log(comment);
    res.status(200).send({ comment });
  });
};
