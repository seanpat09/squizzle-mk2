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
      const donorInfo = message.replace("!adddonor ", "").trim();
      if (donorInfo !== "") {
        let messageSplit = donorInfo.split(" ");
        if(messageSplit[0] && messageSplit[1] && !isNaN(messageSplit[1]))
        this._addDonor(channelName, messageSplit[0], parseFloat(messageSplit[1]));
      }
    } else if (message.startsWith("!removedonor")) {
      const donorName = message.replace("!removedonor ", "").trim();
      if (donorName !== "") {
        this._removeDonor(channelName, donorName);
      }
    } else if (message.startsWith("!donors")) {
      this._viewDonors(channelName);
    } if (message.startsWith("!donor")) {
        const donorName = message.replace("!donor ", "").trim();
        if (donorName !== "") {
          this._getDonor(channelName, donorName);
        }
      }
  }

  _intializeDonorTable() {
    this.db.defineTable("Donor", "donors", {
      name: {
        type: this.db.STRING_TYPE
      }, 
      total_donations: {
        type: this.db.DOUBLE_TYPE
      }
    });
  }

  async _addDonor(channelName, name, amount) {
    const donor = await this.db.findOne("Donor", { where : { name: name } });
    if(donor) {
        donor.total_donations = donor.total_donations ? parseFloat(donor.total_donations) + amount : amount
        await donor.save();
    } else {
        this.db.create("Donor", { name: name, total_donations: amount });
    }
  }

  async _getDonor(channelName, name) {
    const donor = await this.db.findOne("Donor", { where : { name: name } });
    console.log(donor);
    if(donor) {
        this.client.say(channelName, `${donor.name} has donated $${donor.total_donations} so far!`);
    }
  }

  async _removeDonor(channelName, name) {
    await this.db.deleteOne("Donor", { name: name });
  }

  async _viewDonors(channelName) {
    let donors = await this.db.findAll("Donor");
    let donorList = donors.map(v => `${v.name} ($${v.total_donations})`).join(", ");

    this.client.say(
      channelName,
      `Thank you to our donors! ${donorList}`
    );
  }
};
