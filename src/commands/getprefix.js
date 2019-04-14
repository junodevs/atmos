const cache = require('../utils/cache.js')
const bot = require('../bot.js')

exports.run = (client, message, args, embed, thumbImg, reactions, embedColors) => {
  message.channel.startTyping()
  embed.setTitle('Current Custom Prefix')
  embed.setColor(embedColors.default)
  embed.setFooter(`${message.author.username + '#' + message.author.discriminator} | ❤ JunoDevs`)
  embed.setTimestamp(new Date())
  embed.setThumbnail(thumbImg)
  embed.addField(`Your current custom prefix: "**${cache.getPrefixCache(message.guild.id)}**"`, 'Users with MANAGE_SERVER permissions can change the prefix anytime with `' + bot.config.prefix + 'setprefix`')
  message.channel.send(embed)

  message.react(reactions.success)
  message.channel.stopTyping()
}
