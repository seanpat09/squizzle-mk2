"use strict";

const Channel = require("./animal-crossing.js");

module.exports = class Channel {
  static ANIMAL_CROSSING = "animalCrossing";

  constructor(channelName, client) {
    this.channelName = channelName;
    this.client = client;
    this.enabledAddOns = new Set();
    let addOns = [];
  }

  handleMessage(userstate, msg) {
    this.client.say(this.channelName, "squizzle bot online.");
    addOns.forEach(addOn => addOn.handleMessage(userstage, msg));
  }

  enableAddOn(addOn) {
    if(!this.enabledAddOns.has(addOn)) {
      this.enabledAddOns.add(addOn);
      if (addOn === ANIMAL_CROSSING) {
        this.animalCrossing = new AnimalCrossing(this.client, this.db);
      }     
   }
    
    return this;
  }
};
