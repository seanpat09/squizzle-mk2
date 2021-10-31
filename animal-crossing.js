"use strict";
const utils = require("./utils.js");
const Sequelize = require("sequelize");

module.exports = class AnimalCrossing {
  constructor(client, db) {
    this.client = client;
    this.db = db;
    this._intializeVillagerTable();
  }

  handleMessage(channelName, userstate, msg) {
    if (msg === "!startvillagerhunt") {
      this._startVillagerHunt();
    } else if (msg === "!addvillager") {
      this._addVillager(channelName, name);
    } else if (msg.startsWith("!removevillager")) {
      this._removeVillager(channelName, name);
    } else if (msg.startsWith("!showvillagers")) {
      this._viewVillagers(channelName);
    }
  }
  
  _intializeVillagerTable() {
        this.Villagers = this.db.defineTable("Villager", "villagers", {
      name: {
        type: this.db.STRING_TYPE
      }
    });
  }

  _startVillagerHunt() {
    this.db.resetTable("Villager");
  }

  _addVillager(channelName, name) {
    this.db.create("Villager", { name: name });
    this._viewVillagers(channelName);
  }

  _removeVillager(target, name) {
    // let villagers = this.db.get("villagers").value().filter(villager => villager !== name);
    // this.db.set("villagers", villagers).write();
    // this.viewVillagers(target)
  }

  async _viewVillagers(channelName) {
    let villagers = this.db.findAll("Villager");
    console.log(">>>>>>>", JSON.stringify(villagers));
    // let villagerList = villagers.map(v => v.name).join(", ");
    // this.client.say(
    //   channelName,
    //   `So far we found the following villagers: $villagerList}`
    // );
  }
};
