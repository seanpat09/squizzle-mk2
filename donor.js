"use strict";
const utils = require("./utils.js");

module.exports = class Donors {
  constructor(client, db) {
    this.client = client;
    this.db = db;
    this._intializeDonorTable();
  }

  handleMessage(channelName, userstate, msg) {
    if (!utils.isMod(userstate, channelName)) {
      return;
    }

    let message = msg.toLowerCase();
    if (message.startsWith("!adddonor")) {
      const donorName = message.replace("!adddonor ", "").trim();
      if (donorName !== "") {
        this._addDonor(channelName, donorName);
      }
    } else if (message.startsWith("!removedonor")) {
      const donorName = message.replace("!removedonor ", "").trim();
      if (donorName !== "") {
        this._removeDonor(channelName, donorName);
      }
    } else if (message.startsWith("!donors")) {
      this._viewDonors(channelName);
    }
  }

  _intializeDonorTable() {
    this.db.defineTable("Donor", "donors", {
      name: {
        type: this.db.STRING_TYPE
      }
    });
  }

  _addDonor(channelName, name) {
    this.db.create("Donor", { name: name });
  }

  async _removeDonor(channelName, name) {
    await this.db.deleteOne("Donor", { name: name });
  }

  async _viewDonors(channelName) {
    let donors = await this.db.findAll("Donor");
    let donorList = donors.map(v => v.name).join(", ");

    this.client.say(
      channelName,
      `Thank you to our donors! ${donorList}`
    );
  }
};
