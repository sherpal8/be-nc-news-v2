const {
  topicData,
  articleData,
  commentData,
  userData
} = require("../data/index.js");

const { formatDates, formatComments, makeRefObj } = require("../utils/utils");

exports.seed = function(knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      const usersInsertions = knex("users")
        .insert(userData)
        .returning("*");
      const topicsInsertions = knex("topics")
        .insert(topicData)
        .returning("*");
      return Promise.all([usersInsertions, topicsInsertions])
        .then(([users, topics]) => {
          // console.log(`${users.length} user inserted.`);
          // console.log(`${topics.length} topics inserted`);
          const formattedArticleData = formatDates(articleData);
          return knex("articles")
            .insert(formattedArticleData)
            .returning("*");
        })
        .then(articleRows => {
          // console.log(`${articleRows.length} articles inserted`);
          const articleRef = makeRefObj(articleRows);
          const formattedComments = formatComments(commentData, articleRef);
          return knex("comments")
            .insert(formattedComments)
            .returning("*");
        })
        .then(commentRows => {
          // console.log(`${commentRows.length} comments inserted`);
        });
    });
};
