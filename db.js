"use strict";
const Sequelize = require("sequelize");

module.exports = class Db {
  constructor(filename) {
    this.STRING_TYPE = Sequelize.STRING;

    if (!filename) {
      return;
    }
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
      .then(err => {
        console.log("Connection has been established successfully.");
        //         // define a new table 'users'
        //         this.User = this.sequelize.define("users", {
        //           username: {
        //             type: Sequelize.STRING
        //           },
        //         });

        //         this.User.sync()
      })
      .catch(err => {
        console.log("Unable to connect to the database: ", err);
      });
  }

  defineTable(propertyName, tableName, columns) {
    this[propertyName] = this.sequelize.define(tableName, columns);
    this[propertyName].sync();
  }

  create(tableProperty, row) {
    this[tableProperty].create(row);
  }

  resetTable(tableProperty) {
    this[tableProperty].destroy({
      where: {},
      truncate: true
    });
  }

  async findAll(tableProperty) {
    return await this[tableProperty].findAll().then(rows => {
      return rows
    });
  }
  
  async deleteOne(tableProperty, objectToFilter) {
    this[tableProperty].findOne({ where: objectToFind }).then(row.;
  }
};
