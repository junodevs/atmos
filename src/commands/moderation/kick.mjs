// const { dbPromise } = require('../utils/database.js')
// const config = require('../../config')

// exports.run = (client, message, args, embed, thumbImg, reactions, embedColors) => {
//   // ARG 1: User being kicked
//   // ARG 2: Reason for kick (can use spaces, optional)
//   message.channel.startTyping()
//   if (message.guild.member(message.author).hasPermission('KICK_MEMBERS')) {
//     if (message.guild.members.get('219119687743569920' && '447838388943454209').hasPermission('KICK_MEMBERS', false, true, true)) {
//       if (args.length >= 1) {
//         var userid
//         var user
//         var member
//         if (args[0].startsWith('<@') && args[0].endsWith('>')) {
//           if (args[0].startsWith('<@!') && args[0].endsWith('>')) {
//             userid = args[0].replace('<@!', '').replace('>', '')
//             user = message.mentions.users.get(userid)
//             member = message.channel.guild.member(user)
//           } else {
//             userid = args[0].replace('<@', '').replace('>', '')
//             user = message.mentions.users.get(userid)
//             member = message.channel.guild.member(user)
//           }
//         } else {
//           // Not a valid user error
//           embed.setTitle('Command Error')
//           embed.setDescription('The first argument must be the mention of the user you wish to kick!')
//           embed.setColor(embedColors.error)
//           embed.setFooter(config.footer(message))
//           embed.setTimestamp(new Date())
//           embed.setThumbnail(thumbImg)

//           message.channel.send(embed)
//           message.react(reactions.error)
//           return // Breaks if removed so pls don't
//         }
//         if (member.kickable) {
//           args.shift()
//           var reason = args.join(' ')

//           // Add case to the Atmos database
//           var sqlinsert = `INSERT INTO kicks (ServerID, UserID, KickReason) VALUES (${message.guild.id}, ${user.id}, '${reason}')`
//           dbPromise(sqlinsert).then(result => {
//             // DM USER
//             function dmUser () {
//               embed.setTitle(`You have been kicked from "**${message.guild.name}**"`)
//               embed.setDescription(`Reason: **${reason}**`)
//               embed.setColor(embedColors.error)
//               embed.setTimestamp(new Date())
//               embed.setThumbnail(thumbImg)

//               if (user.dmChannel === null) {
//                 member.createDM().then(channel => {
//                   channel.send(embed)
//                 })
//               } else {
//                 user.dmChannel.send(embed)
//               }
//             }

//             // TODO: Log kick to custom moderation log channel if one is set
//             // Actually perform the kick \/
//             function completeKick () {
//               member.kick(reason)

//               // REPLY IN CHAT
//               embed.setTitle(`User Successfully Kicked`)
//               embed.setColor(embedColors.success)
//               embed.setFooter(config.footer(message))
//               embed.setTimestamp(new Date())
//               embed.setThumbnail(thumbImg)

//               message.channel.send(embed)
//               message.react(reactions.success)
//             }

//             // RUN THE KICKS AND ENSURE THERE IS MINOR DELAY FOR DM TO REACH USER BEFORE THEY ARE KICKED
//             dmUser()
//             setTimeout(completeKick, 1000)
//           })
//         } else {
//           // Mentioned user is not kickable by the bot, could be higher admin or server owner
//           embed.setTitle('Kicking Error')
//           embed.setDescription('The specified user is not kickable by the bot.')
//           embed.setColor(embedColors.error)
//           embed.setFooter(config.footer(message))
//           embed.setTimestamp(new Date())
//           embed.setThumbnail(thumbImg)
//           embed.addField(`Try hoisting the Atmos role above ${user.username}'s role!`, 'This error may also occur if the mentioned user is the server owner.')

//           message.channel.send(embed)
//           message.react(reactions.error)
//         }
//       } else {
//         // Need arguments error msg
//         embed.setTitle('Command Error')
//         embed.setDescription('You must provide a user to kick. (And optionally a reason)')
//         embed.setColor(embedColors.error)
//         embed.setFooter(config.footer(message))
//         embed.setTimestamp(new Date())
//         embed.setThumbnail(thumbImg)

//         message.channel.send(embed)
//         message.react(reactions.error)
//       }
//     } else {
//       // Bot does not have permission to kick people
//       embed.setTitle('Permission Error')
//       embed.setDescription('The bot requires the "KICK_MEMBERS" permission to kick members!')
//       embed.setColor(embedColors.error)
//       embed.setFooter(config.footer(message))
//       embed.setTimestamp(new Date())
//       embed.setThumbnail(thumbImg)

//       message.channel.send(embed)
//       message.react(reactions.error)
//     }
//   } else {
//     // Require kick members permission to kick members ;)
//     embed.setTitle("You don't have permission to perform this action.")
//     embed.setDescription('You require the "KICK_MEMBERS" permission to use this command!')
//     embed.setColor(embedColors.error)
//     embed.setFooter(config.footer(message))
//     embed.setTimestamp(new Date())
//     embed.setThumbnail(thumbImg)

//     message.channel.send(embed)
//     message.react(reactions.error)
//   }
//   message.channel.stopTyping(true)
// }
