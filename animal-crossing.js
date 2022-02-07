"use strict";
const utils = require("./utils.js");

module.exports = class AnimalCrossing {
  constructor(client, db) {
    this.client = client;
    this.db = db;
    this._intializeVillagerTable();
    this._initializeCount();
  }

  handleMessage(channelName, userstate, msg) {
    if (!utils.isMod(userstate, channelName)) {
      return;
    }
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
    } else if (msg === "!islandCount") {
      this._viewIslandCount(channelName);
    } else if (msg === "!addIsland") {
      this._incrementIslandCount(channelName);
    } else if (msg.startsWith("!setIslandCount")) {
      const islandCount = msg.replace("!setIslandCount ", "").trim();
      if (islandCount !== "") {
        this._setIslandCount(channelName, parseInt(islandCount));
      }
    }
  }

  _intializeVillagerTable() {
    this.db.defineTable("Villager", "villagers", {
      name: {
        type: this.db.STRING_TYPE
      }
    });
  }

  _initializeCount() {
    this.db.defineTable("Count", "counts", {
      count: {
        type: this.db.INTEGER_TYPE
      },
      name: {
        type: this.db.STRING_TYPE
      }
    });
  }

  _startVillagerHunt(channelName) {
    this.db.resetTable("Villager");
    this._viewVillagers(channelName);
  }

  _addVillager(channelName, name) {
    this.db.create("Villager", { name: name });
    this._viewVillagers(channelName);
  }

  async _removeVillager(channelName, name) {
    await this.db.deleteOne("Villager", { name: name });
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

  async _incrementIslandCount(channelName) {
    let islandCount =  await this.db.findOne("Count", { where: { name : 'Island Count'}})
    if(islandCount) {
      let count = islandCount.count || 0
      this.db.update("Count", {count : count+1},{ where: { name : 'Island Count'}} )
    } else {
      this.db.create("Count", { name: 'Island Count', count: 1 });
    }
    this._viewIslandCount(channelName);
  }

  async _viewIslandCount(channelName) {
    let islandCount =  await this.db.findOne("Count", { where: { name : 'Island Count'}})
    let count;
    if(islandCount) {
      count = islandCount.count;
    } else {
      count = 1;
      this.db.create("Count", { name: 'Island Count', count: count });
    }

    if( count === 1) {
      this.client.say(
        channelName,
        `We have visited ${count} island so far.`
      );
    } else {
      this.client.say(
        channelName,
        `We have visited ${count} islands so far.`
      );
    } 
  }

  async _setIslandCount(channelName, numIslands) {
    let islandCount =  await this.db.findOne("Count", { where: { name : 'Island Count'}})
    if(islandCount) {
      this.db.update("Count", {count : numIslands},{ where: { name : 'Island Count'}} )
    } else {
      this.db.create("Count", { name: 'Island Count', count: numIslands });
    }

    this._viewIslandCount(channelName);
  }
};
