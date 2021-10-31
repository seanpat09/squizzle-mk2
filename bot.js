const tmi = require("tmi.js");
const Channel = require("./channel.js");

module.exports = class Bot {
  constructor() {
    this.channelNames = ["squizzleflip", "squizzle_mk2"];

    this.opts = {
      identity: {
        username: process.env.BOT_USERNAME,
        password: process.env.OAUTH_TOKEN
      },
      channels: this.channelNames
    };

    this.client = new tmi.client(this.opts);

    this.channels = this.channelNames.map(name => {
      return new Channel(name, this.client);
    });

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

    console.log(">>>>>>>>>>>>>onMessageHandler")
    this.channels.forEach(c => {
      console.log(channel, c.channelName);
      if (channel === c.channelName) {
        c.handleMessage(user, msg);
      }
    });
    // Remove whitespace from chat message
    const commandName = msg.trim();
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
};
