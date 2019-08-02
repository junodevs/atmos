// const ow = require('overwatch-api')
// const config = require('../../config')

// exports.run = (client, message, args, embed, thumbImg, reactions, embedColors) => {
//   message.channel.startTyping()
//   if (args.length === 3) {
//     var playerName = args[0].replace('#', '-')

//     var region
//     var platform
//     if (args[1].toLowerCase() === 'us') {
//       region = 'us'
//     } else if (args[1].toLowerCase() === 'eu') {
//       region = 'eu'
//     } else {
//       embed.setTitle('Region Error')
//       embed.setDescription('The provided region was invalid.')
//       embed.setColor(embedColors.error)
//       embed.setFooter(config.footer(message))
//       embed.setTimestamp(new Date())
//       embed.setThumbnail(thumbImg)
//       embed.addField('Command Syntax', 'For command syntax do the command without arguments.')

//       message.channel.send(embed)
//       message.react(reactions.error)
//       message.channel.stopTyping(true)
//       return
//     }

//     if (args[2].toLowerCase() === 'pc') {
//       platform = 'pc'
//     } else if (args[2].toLowerCase() === 'xbl') {
//       platform = 'xbl'
//     } else if (args[2].toLowerCase() === 'psn') {
//       platform = 'psn'
//     } else {
//       embed.setTitle('Platform Error')
//       embed.setDescription('The provided platform was invalid.')
//       embed.setColor(embedColors.error)
//       embed.setFooter(config.footer(message))
//       embed.setTimestamp(new Date())
//       embed.setThumbnail(thumbImg)
//       embed.addField('Command Syntax', 'For command syntax do the command without arguments.')

//       message.channel.send(embed)
//       message.react(reactions.error)
//       message.channel.stopTyping(true)
//       return
//     }

//     ow.getStats(platform, region, playerName, (err, json) => {
//       if (err) {
//         embed.setTitle('Retrieval Error')
//         embed.setDescription('There was an error finding the specified username in the specified platform and region. This is probably an issue with blizzard, but it could also be a typo.')
//         embed.setColor(embedColors.error)
//         embed.setFooter(config.footer(message))
//         embed.setTimestamp(new Date())
//         embed.setThumbnail(thumbImg)
//         embed.addField('Command Syntax', 'For command syntax do the command without arguments.')

//         message.channel.send(embed)
//         message.react(reactions.error)
//         message.channel.stopTyping(true)
//         return
//       }

//       if (json.private) {
//         console.log(err)
//         embed.setTitle('Privacy Error')
//         embed.setDescription('**Your profile is set to private, so Atmos cannot retrieve any stats or information on your gameplay. This can be modified by the user in-game.**')
//         embed.setColor(embedColors.error)
//         embed.setFooter(config.footer(message))
//         embed.setTimestamp(new Date())
//         embed.setThumbnail(thumbImg)
//         embed.addField('Command Syntax', 'For command syntax do the command without arguments.')

//         message.channel.send(embed)
//         message.react(reactions.error)
//         message.channel.stopTyping(true)
//         return
//       }

//       ow.getProfile(platform, region, playerName, (err, profile) => {
//         if (err) console.log(err)

//         embed.setTitle(`Overwatch Player Stats: ${json.username}`)
//         embed.setDescription(`Level: ${json.level} (Includes stars, not player border)`)
//         embed.setColor(embedColors.success)
//         embed.setFooter(config.footer(message))
//         embed.setTimestamp(new Date())
//         embed.setThumbnail(json.portrait)
//         embed.setAuthor(`Competitive Rank: ${profile.competitive.rank}`, profile.competitive.rank_img)
//         embed.addField('Endorsement Level:', json.endorsement.level, true)
//         embed.addField('Comp Games Won:', json.stats.game.competitive[2].value, true)
//         embed.addField('Comp Games Lost:', json.stats.game.competitive[0].value, true)
//         embed.addField('Comp Time Played:', json.stats.game.competitive[3].value, true)
//         embed.addField('Quickplay Games Won:', json.stats.game.quickplay[0].value, true)
//         embed.addField('Quickplay Time Played:', json.stats.game.quickplay[1].value, true)

//         message.channel.send(embed)
//         message.react(reactions.success)
//         message.channel.stopTyping(true)
//       })
//     })
//   } else {
//     embed.setTitle('Command Error')
//     embed.setDescription('This command requires 3 arguments to run.')
//     embed.setColor(embedColors.error)
//     embed.setFooter(config.footer(message))
//     embed.setTimestamp(new Date())
//     embed.setThumbnail(thumbImg)
//     embed.addField('Username and Discrim', 'Ex: `BluLightShow#1929`')
//     embed.addField('Region (Supports `us` and `eu`)', 'Ex: `us`')
//     embed.addField('Platform (Supports `pc`, `xbl`, and `psn`)', 'Ex: `pc`')

//     message.channel.send(embed)
//     message.react(reactions.error)
//     message.channel.stopTyping(true)
//   }
// }
