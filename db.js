"use strict";
const Sequelize = require("sequelize");

module.exports = class Db {
  constructor(filename) {
    this.sequelize = new Sequelize(
      "database",
      process.env.DB_USER,
      process.env.DB_PASS,
      {
        host: "0.0.0.0",
        dialect: "sqlite",
        pool: {
          max: 5,
          min: 0,
          idle: 10000
        },
        storage: filename
      }
    );

    this.sequelize
      .authenticate()
      .then((err) => {
        console.log("Connection has been established successfully.");
//         // define a new table 'users'
//         this.User = this.sequelize.define("users", {
//           username: {
//             type: Sequelize.STRING
//           },
//         });
      
//         this.User.sync()
      })
      .catch((err) => {
        console.log("Unable to connect to the database: ", err);
      });
  }
};
