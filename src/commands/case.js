var { dbPromise } = require('../utils/database.js')
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
      return
    }

    dbPromise(selectsql).then(result => {
      if (result === [] || result[0] === undefined) {
        // No case found
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
        
        if (caseinfo.ServerID = message.guild.id) {
          embed.setTitle(`Case Info: ${caseinfo.CaseID}`)
          embed.setColor(embedColors.success)
          embed.setFooter(`${message.author.username + '#' + message.author.discriminator} | ❤ JunoDevs`)
          embed.setTimestamp(new Date())
          embed.setThumbnail(thumbImg)
          embed.addField('User Punished', `<@${caseinfo.UserID}>`)
          embed.addField('Punishment Reason', reason)
          embed.addField('Date Punished', caseinfo.Date)

          message.channel.send(embed)
          message.react(reactions.success)
        } else {
          // Not valid for this guild
        }
      }
    })
  } else {
    // Exactly 2 args
  }
  message.channel.stopTyping(true)
}
