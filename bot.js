"use strict";
const tmi = require("tmi.js");
const Channel = require("./channel.js");
require('dotenv').config();

module.exports = class Bot {
  constructor() {
    this.channelNames = process.env.CHANNEL_NAME.split(' ');

    this.opts = {
      identity: {
        username: process.env.BOT_USERNAME,
        password: process.env.OAUTH_TOKEN
      },
      channels: this.channelNames
    };

    this.client = new tmi.client(this.opts);

    this.channelsByName = new Map();
    this.channels = this.channelNames.map(name => {
      let aChannel = new Channel(name, this.client, `.data/${name.slice(1)}`);
      this.channelsByName.set(name, aChannel);
      return aChannel;
    });

    this.configureAddOns();

    this.client.on("message", this.onMessageHandler.bind(this));
    this.client.on("connected", this.onConnectedHandler);

    // Connect to Twitch:
    this.client.connect();
  }

  // Called every time a message comes in
  onMessageHandler(channel, user, msg, self) {
    if (self) {
      return;
    } // Ignore messages from the bot

    this.channels.forEach(c => {
      if (channel === c.channelName) {
        c.handleMessage(user, msg);
      }
    });
  }

  // Called every time the bot connects to Twitch chat
  onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
  }

  isMod(user, channel) {
    let isMod = user.mod || user["user-type"] === "mod";
    let isBroadcaster = channel.slice(1) === user.username;
    return isMod || isBroadcaster;
  }

  configureAddOns() {
    this.channelNames.forEach(channelName => {
      const channel =  this.channelsByName.get(channelName);
      if(channel) {
        channel.enableAddOn(Channel.ANIMAL_CROSSING);
      }
    })
  }
};
