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
      this._startVillagerHunt(channelName);
    } else if (msg.startsWith("!addvillager")) {
      const villagerName = msg.replace("!addvillager ", "").trim();
      if (villagerName !== "") {
        this._addVillager(channelName, villagerName);
      }
    } else if (msg.startsWith("!removevillager")) {
      const villagerName = msg.replace("!removevillager ", "").trim();
      if (villagerName !== "") {
        this._removeVillager(channelName, villagerName);
      }
      
    } else if (msg.startsWith("!showvillagers")) {
      this._viewVillagers(channelName);
    }
  }

  _intializeVillagerTable() {
    this.db.defineTable("Villager", "villagers", {
      name: {
        type: this.db.STRING_TYPE
      }
    });
  }

  _startVillagerHunt(channelName) {
    this.db.resetTable("Villager");
    this._intializeVillagerTable();
    this._viewVillagers(channelName)
  }

  _addVillager(channelName, name) {
    this.db.create("Villager", { name: name });
    this._viewVillagers(channelName);
  }

  async _removeVillager(channelName, name) {
    await this.db.deleteOne("Villager", {name : name})
    this._viewVillagers(channelName);
  }

  async _viewVillagers(channelName) {
    let villagers = await this.db.findAll("Villager");
    let villagerList = villagers.map(v => v.name).join(", ");

    this.client.say(
      channelName,
      `So far we found the following villagers: ${villagerList}`
    );
  }
};
