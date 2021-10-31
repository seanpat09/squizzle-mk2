"use strict";
const utils = require("./utils.js");

module.exports = class AnimalCrossing {
  constructor(client, db) {
    this.client = client;
    this.db = db;
  }
  
  handleMessage(userstate, msg) {
if (commandName === "!startvillagerhunt") {
  _startVillagerHunt()
} else if (commandName === "!showvillagers") {
} else if (commandName.startsWith("!addvillager")) {
} else if (commandName.startsWith("!removevillager")) {
  }
  }
  
  _startVillagerHunt() {
    // this.db.set("villagers", []).write()
  }
  
  _addVillager(target, name){
    // this.db.get("villagers").push(name).write();
    // this.viewVillagers(target);
  }
  
  _removeVillager(target, name) {
    // let villagers = this.db.get("villagers").value().filter(villager => villager !== name);
    // this.db.set("villagers", villagers).write();
    // this.viewVillagers(target)
  }
  
  _viewVillagers(target){
    // let villagers = this.db.get("villagers").value();
    // this.client.say(
    //   target,
    //   `So far we found the following villagers: ${villagers.join(", ")}`
    // );
  }
}