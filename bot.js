const tmi = require("tmi.js");
const Db = require("db.js");

// Define configuration options
const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: [process.env.CHANNEL_NAME]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);

// Connect to Twitch:
client.connect();

const db = new Db();

// Called every time a message comes in
function onMessageHandler(channel, user, msg, self) {
  if (self) {
    return;
  } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  if (commandName === "!helloworld") {
    client.say(channel, "Hello world!");
  } else if (commandName.startsWith("!echo")) {
    if (isMod(user, channel)) {
      const sayText = commandName.replace("!echo ", "");
      client.say(channel, sayText);
    }
  } else if (commandName === "!isMod") {
    if (isMod(user, channel)) {
      client.say(channel, `${user.username} is a mod!`);
    } else {
      client.say(channel, `BOP ${user.username} is not a mod!`);
    }
  } else if (commandName.startsWith("!addUser") ){
    if (isMod(user, channel)) {
      db.User
    }
  }
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
