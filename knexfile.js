const ENV = process.env.NODE_ENV || "development";
// const { myData } = require("./config.js");

const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations"
  },
  seeds: {
    directory: "./db/seeds"
  }
};

const customConfig = {
  development: {
    connection: {
      database: "nc_news"
      // username: myData.username
      // password: myData.password
    }
  },
  test: {
    connection: {
      database: "nc_news_test"
      // username: myData.username
      // password: myData.password
    }
  }
};

module.exports = { ...customConfig[ENV], ...baseConfig };
