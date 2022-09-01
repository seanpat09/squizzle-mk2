"use strict";
const Sequelize = require("sequelize");

module.exports = class Db {
  constructor(filename) {
    this.STRING_TYPE = Sequelize.STRING;
    this.INTEGER_TYPE = Sequelize.INTEGER;
    this.DOUBLE_TYPE = Sequelize.DOUBLE;

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
      })
      .catch(err => {
        console.log("Unable to connect to the database: ", err);
      });
  }

  defineTable(propertyName, tableName, columns) {
    this[propertyName] = this.sequelize.define(tableName, columns);
    this[propertyName].sync({ alter: true });
  }

  create(tableProperty, row) {
    this[tableProperty].create(row);
  }

  create(tableProperty, row) {
    this[tableProperty].create(row);
  }

  update(tableProperty, what, where) {
    this[tableProperty]
      .update(what, where)
  }

  resetTable(tableProperty) {
    this[tableProperty].destroy({
      where: {},
      truncate: true
    });
  }

  findAll(tableProperty) {
    return this[tableProperty].findAll().then(rows => {
      return rows;
    });
  }

  findOne(tableProperty, where) {
    return this[tableProperty].findOne(where).then(row => {
      return row
    });
  }

  deleteOne(tableProperty, objectToFilter) {
    return this[tableProperty].findOne({ where: objectToFilter }).then(row => {
      if (row) {
        row.destroy();
      }
    });
  }
};
