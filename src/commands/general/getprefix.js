const cache = require('../../utils/cache.js')
const bot = require('../../bot.js')
const config = require('../../../config')

exports.run = (client, message, args, embed, thumbImg, reactions, embedColors) => {
  message.channel.startTyping()
  var prefix = 'No custom prefix'
  if (cache.getPrefixCache(message.guild.id)) prefix = cache.getPrefixCache(message.guild.id)
  embed.setTitle('Current Custom Prefix')
  embed.setColor(embedColors.default)
  embed.setFooter(config.footer(message))
  embed.setTimestamp(new Date())
  embed.setThumbnail(thumbImg)
  embed.addField(`Your current custom prefix: "**${prefix}**"`, 'Users with MANAGE_SERVER permissions can change the prefix anytime with `' + bot.config.prefix + 'setprefix`')
  message.channel.send(embed)

  message.react(reactions.success)
  message.channel.stopTyping(true)
}
