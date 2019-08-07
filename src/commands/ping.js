const config = require('../../config')

exports.run = (client, message, args, embed, thumbImg, reactions, embedColors) => {
  embed.setTitle('Grabbing the paddle...')
  embed.setColor(embedColors.default)
  embed.setFooter(config.footer(message))
  embed.setTimestamp(new Date())
  embed.setThumbnail(thumbImg)

  message.channel.send(embed).then(m => {
    embed.setTitle(`🏓 *Pong!! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms!*`)
    m.edit(embed)
    message.react(reactions.success)
  })
}
