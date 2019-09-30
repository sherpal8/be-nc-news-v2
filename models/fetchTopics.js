const connection = require("../connection.js");

exports.fetchTopics = () => {
  return connection.select("*").from("topics");
};
