exports.up = function(knex) {
  // console.log("creating topics table");
  return knex.schema.createTable("topics", topics => {
    topics
      .string("slug")
      .primary()
      .notNullable();
    topics.string("description").notNullable();
    topics.unique("slug");
  });
};

exports.down = function(knex) {
  // console.log("removing topics table...");
  return knex.schema.dropTable("topics");
};
