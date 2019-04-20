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
      selectsql = `SELECT CaseID FROM kicks WHERE CaseID=${args[1]}`
    } else if (args[0].toLowerCase() === 'mute') {
      selectsql = `SELECT CaseID FROM mutes WHERE CaseID=${args[1]}`
    } else if (args[0].toLowerCase() === 'warning') {
      selectsql = `SELECT CaseID FROM warnings WHERE CaseID=${args[1]}`
    } else {
      // Not a valid punish type
      return
    }

    dbPromise(selectsql).then(result => {
      if (result === [] || result[0] === undefined) {
        // No case found
      } else {
        if (result.ServerID === message.guild.id) {
          embed.setTitle(`Case Info: ${args[1]}`)
          embed.setColor(embedColors.success)
          embed.setFooter(`${message.author.username + '#' + message.author.discriminator} | ❤ JunoDevs`)
          embed.setTimestamp(new Date())
          embed.setThumbnail(thumbImg)
          embed.addField()

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
