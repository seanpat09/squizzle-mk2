"use strict";

module.exports = class Channel {
  constructor(channelName, client) {
    this.channelName = channelName;
    this.client = client;
    this.enabledAddOns = new Set();
  }
  
  handleMessage(userstate, msg) {
    this.client.say(this.channelName, "squizzle bot online.")
  }
  
  enableAddOn(addon) {
    this.enabledAddOns.add(addon);
    return this;
  }
}