"use strict";

module.exports = class Channel {
  constructor(channelName, client) {
    this.channelName = channelName;
    this.client = client;
  }
  
  handleMessage(userstate, msg) {
    this.client.say(this.channelName, "squizzle bot online.")
  }
}