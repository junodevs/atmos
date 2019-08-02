var { dbPromise } = require('../../../utils/database.js')
const config = require('../../../../config')
const date = require('date-fns')
exports.run = (client, message, args, embed, thumbImg, reactions, embedColors) => {
  // ARG 1: Punishment type
  // ARG 2: CaseID
  message.channel.startTyping()
  if (args.length === 2) {
    var selectsql
    if (args[0].toLowerCase() === 'ban') {
      selectsql = `SELECT CaseID,ServerID,UserID,BanReason,Date FROM bans WHERE CaseID=${args[1]}`
    } else if (args[0].toLowerCase() === 'kick') {
      selectsql = `SELECT CaseID,ServerID,UserID,KickReason,Date FROM kicks WHERE CaseID=${args[1]}`
    } else if (args[0].toLowerCase() === 'mute') {
      selectsql = `SELECT CaseID,ServerID,UserID,MuteReason,Date FROM mutes WHERE CaseID=${args[1]}`
    } else if (args[0].toLowerCase() === 'warning') {
      selectsql = `SELECT CaseID,ServerID,UserID,WarnReason,Date FROM warnings WHERE CaseID=${args[1]}`
    } else {
      // Not a valid punish type
      embed.setTitle('Command Error')
      embed.setDescription('The punishment type provided in the first argument was invalid.')
      embed.setColor(embedColors.error)
      embed.setFooter(config.footer(message))
      embed.setTimestamp(new Date())
      embed.setThumbnail(thumbImg)

      message.channel.send(embed)
      message.react(reactions.error)
      return
    }

    dbPromise(selectsql).then(result => {
      if (result === [] || result[0] === undefined) {
        // No case found
        embed.setTitle('Retrieval Error')
        embed.setDescription('There was an error retrieving the specified CaseID. Make sure you have the right CaseID. If the error persists please try again later.')
        embed.setColor(embedColors.error)
        embed.setFooter(config.footer(message))
        embed.setTimestamp(new Date())
        embed.setThumbnail(thumbImg)

        message.channel.send(embed)
        message.react(reactions.error)
        console.log('No Case Found')
      } else {
        var caseinfo = result[0]
        var reason
        if (args[0].toLowerCase() === 'ban') {
          reason = caseinfo.BanReason
        } else if (args[0].toLowerCase() === 'kick') {
          reason = caseinfo.KickReason
        } else if (args[0].toLowerCase() === 'mute') {
          reason = caseinfo.MuteReason
        } else if (args[0].toLowerCase() === 'warning') {
          reason = caseinfo.WarnReason
        }
        if (!reason) {
          reason = 'No specified reason.'
        }
        // Format date
        var formatting = date.format(
          caseinfo.Date,
          'MMMM Do, YYYY h:m A'
        )
        var fulldate = formatting + ' (Universal Standard Time)'
        if (caseinfo.ServerID === message.guild.id) {
          embed.setTitle(`Case Info: ${caseinfo.CaseID}`)
          embed.setColor(embedColors.success)
          embed.setFooter(config.footer(message))
          embed.setTimestamp(new Date())
          embed.setThumbnail(thumbImg)
          embed.addField('User Punished', `<@${caseinfo.UserID}>`)
          embed.addField('Punishment Reason', reason)
          embed.addField('Date Punished', fulldate)
          message.channel.send(embed)
          message.react(reactions.success)
        } else {
          // Not valid for this guild
          embed.setTitle('Retrieval Error')
          embed.setDescription('The specified CaseID does not pertain to this server.')
          embed.setColor(embedColors.error)
          embed.setFooter(config.footer(message))
          embed.setTimestamp(new Date())
          embed.setThumbnail(thumbImg)

          message.channel.send(embed)
          message.react(reactions.error)
        }
      }
    })
  } else {
    // Exactly 2 args
    embed.setTitle('Command Error')
    embed.setDescription('You must provide 2 arguments.')
    embed.setColor(embedColors.error)
    embed.setFooter(config.footer(message))
    embed.setTimestamp(new Date())
    embed.setThumbnail(thumbImg)
    embed.addField('First Argument', 'Punishment Type (Ex. ban, kick, mute)')
    embed.addField('Second Argument', 'CaseID (Ex. 4, 23, 549)')

    message.channel.send(embed)
    message.react(reactions.error)
  }
  message.channel.stopTyping(true)
}
