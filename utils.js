function isMod(user, channel) {
  let isMod = user.mod || user["user-type"] === "mod";
  let isBroadcaster = channel.slice(1) === user.username;
  let isSquizzle = user.username === "squizzleflip";
  return isMod || isBroadcaster || isSquizzle;
}

exports.isMod = isMod;
