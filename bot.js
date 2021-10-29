const tmi = require("tmi.js");
const Channel = require('./channel.js');

const channelNames = [
  "squizzleflip",
  "squizzle_mk1"
];

// Define configuration options
const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: channelNames
};

// Create a client with our options
const client = new tmi.client(opts);

let channels = channelNames.map((name) => {
  return new Channel(name, client);
})

// Register our event handlers (defined below)
client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(channel, user, msg, self) {
  if (self) {
    return;
  } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

function isMod(user, channel) {
  let isMod = user.mod || user["user-type"] === "mod";
  let isBroadcaster = channel.slice(1) === user.username;
  return isMod || isBroadcaster;
}
