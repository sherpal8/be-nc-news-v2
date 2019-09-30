const connection = require("../connection.js");

exports.fetchUser = username => {
  return connection
    .select("*")
    .from("users")
    .where(username);
};
