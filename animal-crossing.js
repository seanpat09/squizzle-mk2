"use strict";
const utils = require("./utils.js");
const Sequelize = require("sequelize");

module.exports = class AnimalCrossing {
  constructor(client, db) {
    this.client = client;
    this.db = db;

    this.Villagers = this.db.defineTable("Villager", "villagers");
    
  }

  handleMessage(channel, userstate, msg) {
    if (msg === "!startvillagerhunt") {
      this._startVillagerHunt();
    } else if (msg === "!showvillagers") {
      this._addVillager(channel, name);
    } else if (msg.startsWith("!addvillager")) {
      this._removeVillager(channel, name);
    } else if (msg.startsWith("!removevillager")) {
      this._viewVillagers(channel);
    }
  }

  _startVillagerHunt() {
    this.db.User.destroy({
      where: {},
      truncate: true
    })
  }

  _addVillager(target, name) {
    // this.db.get("villagers").push(name).write();
    // this.viewVillagers(target);
  }

  _removeVillager(target, name) {
    // let villagers = this.db.get("villagers").value().filter(villager => villager !== name);
    // this.db.set("villagers", villagers).write();
    // this.viewVillagers(target)
  }

  _viewVillagers(target) {
    // let villagers = this.db.get("villagers").value();
    // this.client.say(
    //   target,
    //   `So far we found the following villagers: ${villagers.join(", ")}`
    // );
  }
};
