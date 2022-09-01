"use strict";

const AnimalCrossing = require("./animal-crossing.js");
const Donor = require("./donor.js");
const Db = require("./db.js");

module.exports = class Channel {
  static ANIMAL_CROSSING = "animalCrossing";
  static DONOR = "donor";

  constructor(channelName, client, filename) {
    this.channelName = channelName;
    this.client = client;
    this.enabledAddOns = new Set();
    
    this.db = new Db(filename)
    this.addOns = [];
  }

  handleMessage(userstate, msg) {
    if(msg === "!ping") {
      this.client.say(this.channelName, "squizzle bot online.");
    }
    this.addOns.forEach(addOn => addOn.handleMessage(this.channelName, userstate, msg));
  }

  enableAddOn(addOn) {
    if(!this.enabledAddOns.has(addOn)) {
      this.enabledAddOns.add(addOn);
      if (addOn === Channel.ANIMAL_CROSSING) {
        this.addOns.push(new AnimalCrossing(this.client, this.db));
      } else if (addOn === Channel.DONOR) {
        this.addOns.push(new Donor(this.client, this.db));
      } 
   }
    
    return this;
  }
};
