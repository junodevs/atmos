// const config = require('../../../config')

// exports.run = (client, message, args, embed, thumbImg, reactions, embedColors) => {
//   function convertMillisecondsToDigitalClock (ms) {
//     var hours = Math.floor(ms / 3600000) // 1 Hour = 36000 Milliseconds
//     var minutes = Math.floor((ms % 3600000) / 60000) // 1 Minute = 60000 Milliseconds
//     var seconds = Math.floor(((ms % 360000) % 60000) / 1000) // 1 Second = 1000 Milliseconds
//     var str = `**`
//     if (hours !== 0) {
//       str += ` ${hours} hours,`
//     }
//     if (minutes !== 0) {
//       str += ` ${minutes} minutes,`
//     }
//     if (seconds !== 0) {
//       str += ` ${seconds} seconds`
//     }
//     return str + `**`
//   }

//   embed.setTitle('Atmos Uptime')
//   embed.setDescription('Atmos has been online for:' + convertMillisecondsToDigitalClock(client.uptime))
//   embed.setColor(embedColors.default)
//   embed.setFooter(config.footer(message))
//   embed.setTimestamp(new Date())
//   embed.setThumbnail(thumbImg)

//   message.react(reactions.success)
//   message.channel.send(embed)
// }
