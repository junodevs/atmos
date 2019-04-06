exports.run = (client, message, args, embed, thumbImg, reactions, embedColors) => {
  // ARG 1: User being banned
  // ARG 2: Reason for kick (can use spaces, optional)
  if (message.guild.member(message.author).hasPermission('KICK_MEMBERS')) {
    if (args.length >= 1) {
    } else {
      // Need arguments error msg
    }
  } else {
    // Require kick members permission to kick members ;)
  }
}
