"use strict";
const utils = require("./utils.js");

module.exports = class Pokemon {
  constructor(client, db) {
    this.client = client;
    this.db = db;
  }

  handleMessage(channelName, userstate, msg) {}
}