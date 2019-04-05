const cache = require('../utils/cache.js')
const { dbPromise } = require('../utils/database.js')
const bot = require('../bot')

exports.run = (client, message, args, embed, thumbImg, reactions, embedColors) => {
  var sqlselect = `SELECT ServerID FROM config_prefix WHERE ServerID=${message.guild.id}`
  var sqlinsert = `INSERT INTO config_prefix (ServerID, Prefix) VALUES (${message.guild.id}, '${args[0]}')`
  var sqlupdate = `UPDATE config_prefix SET Prefix='${args[0]}' WHERE ServerID=${message.guild.id}`

  if (message.guild.member(message.author).hasPermission('MANAGE_GUILD')) {
    if (args.length === 1) {
      dbPromise(sqlselect).then((result) => {
        if (result.length === 0) {
          return dbPromise(sqlinsert)
        } else {
          return dbPromise(sqlupdate)
        }
      }).then(() => {
        cache.setPrefixCache(message.guild.id, args[0])
        embed.setTitle('Prefix Change Successful')
        embed.setDescription(`Prefix changed to: **'${args[0]}'**`)
        embed.setColor(embedColors.success)
        embed.setFooter(`${message.author.username + '#' + message.author.discriminator} | ❤ JunoDevs`)
        embed.setTimestamp(new Date())
        embed.setThumbnail(thumbImg)
        embed.addField(`The original prefix (**${bot.config.prefix}**) will still continue to work for running commands, alongside your custom prefix.`)
        message.channel.send(embed)

        message.react(reactions.success)
      }).catch((err) => {
        console.log(err)
        embed.setTitle('Prefix Change Failed')
        embed.setDescription('A database error occurred. Please try again later.')
        embed.setColor(embedColors.error)
        embed.setFooter(`${message.author.username + '#' + message.author.discriminator} | ❤ JunoDevs`)
        embed.setTimestamp(new Date())
        embed.setThumbnail(thumbImg)
        message.channel.send(embed)

        message.react(reactions.error)
      })
    } else {
      embed.setTitle('Error')
      embed.setDescription('You must provide the new prefix you wish to use without any spaces!')
      embed.setColor(embedColors.error)
      embed.setFooter(`${message.author.username + '#' + message.author.discriminator} | ❤ JunoDevs`)
      embed.setTimestamp(new Date())
      embed.setThumbnail(thumbImg)
      message.channel.send(embed)

      message.react(reactions.error)
    }
  } else {
    embed.setTitle('Permission Error')
    embed.setDescription('You must have the MANAGE_SERVER permission to execute this command!')
    embed.setColor(embedColors.error)
    embed.setFooter(`${message.author.username + '#' + message.author.discriminator} | ❤ JunoDevs`)
    embed.setTimestamp(new Date())
    embed.setThumbnail(thumbImg)
    message.channel.send(embed)

    message.react(reactions.error)
  }
}
