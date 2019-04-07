const { dbPromise } = require('../utils/database.js')
exports.run = (client, message, args, embed, thumbImg, reactions, embedColors) => {
  // ARG 1: User being banned
  // ARG 2: Reason for ban (can use spaces, optional)
  if (message.guild.member(message.author).hasPermission('BAN_MEMBERS')) {
    if (message.guild.members.get('219119687743569920' && '447838388943454209').hasPermission('BAN_MEMBERS', false, true, true)) {
      if (args.length >= 1) {
        var userid
        var user
        var member
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
          embed.setDescription('The first argument must be the mention of the user you wish to ban!')
          embed.setColor(embedColors.error)
          embed.setFooter(`${message.author.username + '#' + message.author.discriminator} | ❤ JunoDevs`)
          embed.setTimestamp(new Date())
          embed.setThumbnail(thumbImg)

          message.channel.send(embed)
          message.react(reactions.error)
          return // Breaks of removed so pls don't
        }
        if (member.bannable) {
          args.shift()
          var reason = args.join(' ')

          embed.setTitle(`You have been banned from "**${message.guild.name}**"`)
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
          member.ban({
            reason: reason,
            days: 0
          })

          // Add case to the Atmos database, not done. Need to check if case number is already used and if it is regen the number.
          var caseid = Math.floor(Math.random() * 90000) + 10000
          var sqlinsert = `INSERT INTO bans (ServerID, UserID, CaseID, BanReason) VALUES (${message.guild.id}, ${user.id}, ${caseid}, '${reason}')`
          dbPromise(sqlinsert).then(result => {
            embed.setTitle(`User Successfully Banned`)
            embed.setDescription(`Case ID #${caseid}`)
            embed.setColor(embedColors.success)
            embed.setFooter(`${message.author.username + '#' + message.author.discriminator} | ❤ JunoDevs`)
            embed.setTimestamp(new Date())
            embed.setThumbnail(thumbImg)

            message.channel.send(embed)
            message.react(reactions.success)
          }).catch(err => {
            console.log(err)
            embed.setTitle('Database Error')
            embed.setDescription('There was an error adding the case to the Atmos database. Please try again later.')
            embed.setColor(embedColors.error)
            embed.setFooter(`${message.author.username + '#' + message.author.discriminator} | ❤ JunoDevs`)
            embed.setTimestamp(new Date())
            embed.setThumbnail(thumbImg)

            message.channel.send(embed)
            message.react(reactions.error)
          })
        } else {
          // Mentioned user is not banable by the bot, could be higher admin or server owner
          embed.setTitle('Kicking Error')
          embed.setDescription('The specified user is not bannable by the bot.')
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
        embed.setDescription('You must provide a user to ban. (And optionally a reason)')
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
      embed.setDescription('The "BAN_MEMBERS" permission is required to ban members! ;)')
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
    embed.setDescription('You require the "BAN_MEMBERS" permission to use this command!')
    embed.setColor(embedColors.error)
    embed.setFooter(`${message.author.username + '#' + message.author.discriminator} | ❤ JunoDevs`)
    embed.setTimestamp(new Date())
    embed.setThumbnail(thumbImg)

    message.channel.send(embed)
    message.react(reactions.error)
  }
}
