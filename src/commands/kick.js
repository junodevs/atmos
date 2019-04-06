exports.run = (client, message, args, embed, thumbImg, reactions, embedColors) => {
  // ARG 1: User being banned
  // ARG 2: Reason for kick (can use spaces, optional)
  if (message.guild.member(message.author).hasPermission('KICK_MEMBERS')) {
    if (message.guild.members.get('219119687743569920' && '447838388943454209').has('KICK_MEMBERS', true)) {
      if (args.length >= 1) {
        if (message.mentions.members.array[0].kickable) {
          var reason = args.shift().join(' ')
          embed.setTitle(`You have been kicked from **${message.guild.name}**`)
          embed.setDescription(`Reason: **${reason}**`)
          embed.setColor(embedColors.error)
          embed.setFooter(`${message.author.username + '#' + message.author.discriminator} | ❤ JunoDevs`)
          embed.setTimestamp(new Date())
          embed.setThumbnail(bot.thumbImg)
        } else {
          // Mentioned user is not kickable by the bot, could be higher admin or server owner
        }
      } else {
        // Need arguments error msg
      }
    } else {
      // Bot does not have permission to kick people
    }
  } else {
    // Require kick members permission to kick members ;)
  }
}
