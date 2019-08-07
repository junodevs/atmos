// const config = require('../../config')

// exports.run = (client, message, args, embed, thumbImg, reactions, embedColors) => {
//   if (args.length === 0) {
//     embed.setTitle(message.author.username)
//     embed.setDescription('User Information')
//     embed.setColor(embedColors.default)
//     embed.setFooter(config.footer(message))
//     embed.setTimestamp(new Date())
//     embed.setThumbnail(message.author.displayAvatarURL)
//     // Start Information
//     embed.addField('Account Creation Date', message.author.createdAt, true)
//     embed.addField('User ID', message.author.id, true)
//     embed.addField('Current Status', message.author.presence.status, true)

//     message.channel.send({ embed })
//     message.react(reactions.success)
//   } else {
//     if (args.length === 1) {
//       var whoid
//       var who
//       if (args[0].startsWith('<@') && args[0].endsWith('>')) {
//         if (args[0].startsWith('<@!') && args[0].endsWith('>')) {
//           whoid = args[0].replace('<@!', '').replace('>', '')
//           who = message.mentions.users.get(whoid)
//         } else {
//           whoid = args[0].replace('<@', '').replace('>', '')
//           who = message.mentions.users.get(whoid)
//         }
//         embed.setTitle(who.username)
//         embed.setDescription('User Information')
//         embed.setColor(embedColors.default)
//         embed.setFooter(config.footer(message))
//         embed.setTimestamp(new Date())
//         embed.setThumbnail(who.displayAvatarURL)
//         // Start Information
//         embed.addField('Account Creation Date', who.createdAt, true)
//         embed.addField('User ID', who.id, true)
//         embed.addField('Current Status', who.presence.status, true)

//         message.channel.send({ embed })
//         message.react(reactions.success)
//       } else {
//         embed.setTitle('Error')
//         embed.setDescription('Your first argument must be a @mention')
//         embed.setColor(embedColors.default)
//         embed.setFooter(config.footer(message))
//         embed.setTimestamp(new Date())
//         embed.setThumbnail(thumbImg)

//         message.channel.send({ embed })
//         message.react(reactions.error)
//       }
//     } else {
//       embed.setTitle('Error')
//       embed.setDescription('Too many arguments given. There should be one or no arguments given.')
//       embed.setColor(embedColors.default)
//       embed.setFooter(config.footer(message))
//       embed.setTimestamp(new Date())
//       embed.setThumbnail(thumbImg)

//       message.channel.send({ embed })
//       message.react(reactions.error)
//     }
//   }
// }
