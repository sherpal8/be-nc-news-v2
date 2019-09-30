exports.up = function(knex) {
  // console.log("creating comments table");
  return knex.schema.createTable("comments", comments => {
    comments.increments("comments_id").primary();
    comments.string("author").references("users.username");
    comments.integer("article_id").references("articles.article_id");
    comments.integer("votes").defaultTo(0);
    comments.timestamp("created_at").defaultTo(knex.fn.now());
    comments.text("body").notNullable();
  });
};

exports.down = function(knex) {
  // console.log("removing comments table");
  return knex.schema.dropTable("comments");
};
