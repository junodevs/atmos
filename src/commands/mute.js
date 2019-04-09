exports.run = (client, message, args, embed, thumbImg, reactions, embedColors) => {
  // ARG 1: User being muted
  // ARG 2: Reason for mute (can use spaces, optional)
  if (message.guild.member(message.author).hasPermission('MANAGE_MESSAGES')) {
    if (message.guild.members.get('219119687743569920' && '447838388943454209').hasPermission('MANAGE_MESSAGES', false, true, true)) {
      if (args.length >= 1) {
        var userid
        var user
        var member
        let mutedRole = message.guild.roles.get(' ROLEID ')
        if (args[0].startsWith('<@') && args[0].endsWith('>')) {
          if (args[0].startsWith('<@!') && args[0].endsWith('>')) {
            userid = args[0].replace('<@!', '').replace('>', '')
            user = message.mentions.users.get(userid)
            member = message.channel.guild.member(user)
          } else {
            userid = args[0].replace('<@', '').replace('>', '')
            user = message.mentions.users.get(userid)
            member = message.channel.guild.member(user)
          }
        } else {
          // Not a valid user error
          embed.setTitle('Command Error')
          embed.setDescription('The first argument must be the mention of the user you wish to mute!')
          embed.setColor(embedColors.error)
          embed.setFooter(`${message.author.username + '#' + message.author.discriminator} | ❤ JunoDevs`)
          embed.setTimestamp(new Date())
          embed.setThumbnail(thumbImg)

          message.channel.send(embed)
          message.react(reactions.error)
          return // Breaks if removed so pls don't
        }
        if (message.guild.member(client.user).highestRole.comparePositionTo(member.highestRole) > 0) {
          args.shift()
          var reason = args.join(' ')

          embed.setTitle(`You have been muted in "**${message.guild.name}**"`)
          embed.setDescription(`Reason: **${reason}**`)
          embed.setColor(embedColors.error)
          embed.setFooter(`${message.author.username + '#' + message.author.discriminator} | ❤ JunoDevs`)
          embed.setTimestamp(new Date())
          embed.setThumbnail(thumbImg)

          if (user.dmChannel === null) {
            member.createDM().then(channel => {
              channel.send(embed)
            })
          } else {
            user.dmChannel.send(embed)
          }

          // TODO: Log ban to custom moderation log channel if one is set
          member.addRole(mutedRole)

          embed.setTitle(`User Successfully Muted`)
          embed.setColor(embedColors.success)
          embed.setFooter(`${message.author.username + '#' + message.author.discriminator} | ❤ JunoDevs`)
          embed.setTimestamp(new Date())
          embed.setThumbnail(thumbImg)

          message.channel.send(embed)
          message.react(reactions.success)
        } else {
          // Mentioned user is not banable by the bot, could be higher admin or server owner
          embed.setTitle('Muting Error')
          embed.setDescription('The specified user is not muteable by the bot.')
          embed.setColor(embedColors.error)
          embed.setFooter(`${message.author.username + '#' + message.author.discriminator} | ❤ JunoDevs`)
          embed.setTimestamp(new Date())
          embed.setThumbnail(thumbImg)
          embed.addField(`Try hoisting the Atmos role above ${user.username}'s role!`, 'This error may also occur if the mentioned user is the server owner.')

          message.channel.send(embed)
          message.react(reactions.error)
        }
      } else {
        // Need arguments error msg
        embed.setTitle('Command Error')
        embed.setDescription('You must provide a user to mute. (And optionally a reason)')
        embed.setColor(embedColors.error)
        embed.setFooter(`${message.author.username + '#' + message.author.discriminator} | ❤ JunoDevs`)
        embed.setTimestamp(new Date())
        embed.setThumbnail(thumbImg)

        message.channel.send(embed)
        message.react(reactions.error)
      }
    } else {
      // Bot does not have permission to ban people
      embed.setTitle('Permission Error')
      embed.setDescription('The bot requires the "MANAGE_MESSAGES" permission to mute members!')
      embed.setColor(embedColors.error)
      embed.setFooter(`${message.author.username + '#' + message.author.discriminator} | ❤ JunoDevs`)
      embed.setTimestamp(new Date())
      embed.setThumbnail(thumbImg)

      message.channel.send(embed)
      message.react(reactions.error)
    }
  } else {
    // Require ban members permission to ban members ;)
    embed.setTitle("You don't have permission to perform this action.")
    embed.setDescription('You require the "MANAGE_MESSAGES" permission to use this command!')
    embed.setColor(embedColors.error)
    embed.setFooter(`${message.author.username + '#' + message.author.discriminator} | ❤ JunoDevs`)
    embed.setTimestamp(new Date())
    embed.setThumbnail(thumbImg)

    message.channel.send(embed)
    message.react(reactions.error)
  }
}
