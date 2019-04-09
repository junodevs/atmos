exports.run = (client, message, args, embed, thumbImg, reactions, embedColors) => {
  // ARG 1: User being unbanned
  if (message.guild.member(message.author).hasPermission('BAN_MEMBERS')) {
    if ((message.guild.members.get('219119687743569920' && '447838388943454209').hasPermission('BAN_MEMBERS', false, true, true))) {
      if (args.length === 1) {
        var userid
        var user
        if (args[0].startsWith('<@') && args[0].endsWith('>')) {
          if (args[0].startsWith('<@!') && args[0].endsWith('>')) {
            userid = args[0].replace('<@!', '').replace('>', '')
            user = message.mentions.users.get(userid)
          } else {
            userid = args[0].replace('<@', '').replace('>', '')
            user = message.mentions.users.get(userid)
          }
        } else {
          // Not a valid user error
          embed.setTitle('Command Error')
          embed.setDescription('The first argument must be the mention of the user you wish to unban!')
          embed.setColor(embedColors.error)
          embed.setFooter(`${message.author.username + '#' + message.author.discriminator} | ❤ JunoDevs`)
          embed.setTimestamp(new Date())
          embed.setThumbnail(thumbImg)

          message.channel.send(embed)
          message.react(reactions.error)
          return // Breaks if removed so pls don't
        }

        message.guild.unban(user)

        embed.setTitle(`User Successfully Unbanned`)
        embed.setDescription('You can still access the original case using the case command!')
        embed.setColor(embedColors.success)
        embed.setFooter(`${message.author.username + '#' + message.author.discriminator} | ❤ JunoDevs`)
        embed.setTimestamp(new Date())
        embed.setThumbnail(thumbImg)

        message.channel.send(embed)
        message.react(reactions.success)
      } else {
        // I need a user you little shit (or maybe i dont need a reason one of the two)
        embed.setTitle('Command Error')
        embed.setDescription('You must provide a user to unban.')
        embed.setColor(embedColors.error)
        embed.setFooter(`${message.author.username + '#' + message.author.discriminator} | ❤ JunoDevs`)
        embed.setTimestamp(new Date())
        embed.setThumbnail(thumbImg)

        message.channel.send(embed)
        message.react(reactions.error)
      }
    } else {
      // Is this bot a joke to you (needs perms my guy)
      embed.setTitle('Permission Error')
      embed.setDescription('The bot requires the "BAN_MEMBERS" permission to unban members!')
      embed.setColor(embedColors.error)
      embed.setFooter(`${message.author.username + '#' + message.author.discriminator} | ❤ JunoDevs`)
      embed.setTimestamp(new Date())
      embed.setThumbnail(thumbImg)

      message.channel.send(embed)
      message.react(reactions.error)
    }
  } else {
    // You don't have perms and you know it
    embed.setTitle("You don't have permission to perform this action.")
    embed.setDescription('You require the "BAN_MEMBERS" permission to use this command!')
    embed.setColor(embedColors.error)
    embed.setFooter(`${message.author.username + '#' + message.author.discriminator} | ❤ JunoDevs`)
    embed.setTimestamp(new Date())
    embed.setThumbnail(thumbImg)

    message.channel.send(embed)
    message.react(reactions.error)
  }
}
