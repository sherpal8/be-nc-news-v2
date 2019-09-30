exports.up = function(knex) {
  // console.log("creating users table");
  return knex.schema.createTable("users", users => {
    users
      .string("username")
      .primary()
      .notNullable();
    users.string("avatar_url").notNullable();
    users.string("name").notNullable();
    users.unique("username");
  });
};

exports.down = function(knex) {
  // console.log("removing users table");
  return knex.schema.dropTable("users");
};
