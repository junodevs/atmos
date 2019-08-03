// const cache = require('../../utils/cache.js')
// const { dbPromise } = require('../../utils/database.js')
// const bot = require('../../bot.js')
// const config = require('../../../config')

// exports.run = (client, message, args, embed, thumbImg, reactions, embedColors) => {
//   message.channel.startTyping()
//   var sqlselect = `SELECT ServerID FROM config WHERE ServerID=${message.guild.id}`
//   var sqlinsert = `INSERT INTO config (ServerID, Prefix) VALUES (${message.guild.id}, '${args[0]}')`
//   var sqlupdate = `UPDATE config SET Prefix='${args[0]}' WHERE ServerID=${message.guild.id}`

//   if (message.guild.member(message.author).hasPermission('MANAGE_GUILD')) {
//     if (args.length === 1) {
//       dbPromise(sqlselect).then((result) => {
//         if (result.length === 0) {
//           return dbPromise(sqlinsert)
//         } else {
//           return dbPromise(sqlupdate)
//         }
//       }).then(() => {
//         cache.setPrefixCache(message.guild.id, args[0])
//         embed.setTitle('Prefix Change Successful')
//         embed.setDescription(`Prefix changed to: **'${args[0]}'**`)
//         embed.setColor(embedColors.success)
//         embed.setFooter(config.footer(message))
//         embed.setTimestamp(new Date())
//         embed.setThumbnail(thumbImg)
//         embed.addField(`The original prefix (**${bot.config.prefix}**) will still continue to work for running commands, alongside your custom prefix.`, 'Retrieve your custom prefix with `' + bot.config.prefix + 'setprefix`')
//         message.channel.send(embed)

//         message.react(reactions.success)
//       }).catch((err) => {
//         console.log(err)
//         embed.setTitle('Database Error')
//         embed.setDescription('A database error occurred. Please try again later.')
//         embed.setColor(embedColors.error)
//         embed.setFooter(config.footer(message))
//         embed.setTimestamp(new Date())
//         embed.setThumbnail(thumbImg)
//         message.channel.send(embed)

//         message.react(reactions.error)
//       })
//     } else {
//       embed.setTitle('Command Error')
//       embed.setDescription('You must provide the new prefix you wish to use without any spaces!')
//       embed.setColor(embedColors.error)
//       embed.setFooter(config.footer(message))
//       embed.setTimestamp(new Date())
//       embed.setThumbnail(thumbImg)
//       message.channel.send(embed)

//       message.react(reactions.error)
//     }
//   } else {
//     embed.setTitle("You don't have permission to perform this action.")
//     embed.setDescription('You require the MANAGE_SERVER permission to execute this command!')
//     embed.setColor(embedColors.error)
//     embed.setFooter(config.footer(message))
//     embed.setTimestamp(new Date())
//     embed.setThumbnail(thumbImg)
//     message.channel.send(embed)

//     message.react(reactions.error)
//   }
//   message.channel.stopTyping(true)
// }
