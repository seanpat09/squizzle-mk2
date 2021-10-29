"use strict";

module.exports = class Channel {
  constructor(channelName, client) {
    this.name = channelName;
    this.client = client;
  }
  
  handleMessage(userstate, msg) {
    this.client.say(this.name, "squizzle bot online.")
  }
}