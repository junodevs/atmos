exports.run = (client, message, args, embed, thumbImg, reactions, embedColors) => {
  var afk
  if (message.channel.guild.afkChannel == null) {
    afk = 'No AFK Channel Set'
  } else {
    afk = message.guild.afkChannel
  }

  embed.setTitle(message.guild.name)
  embed.setDescription('Server Information')
  embed.setColor(embedColors.default)
  embed.setFooter(`${message.author.username + '#' + message.author.discriminator} | ❤ JunoDevs`)
  embed.setTimestamp(new Date())
  embed.setThumbnail(message.guild.iconURL)
  // Start Information
  embed.addField('Total Users', message.guild.memberCount, true)
  embed.addField('Owner', message.guild.owner, true)
  embed.addField('Creation Date', message.guild.createdAt, true)
  embed.addField('AFK Channel', afk, true)
  embed.addField('Server Region', message.guild.region, true)

  message.channel.send(embed)
  message.react(reactions.success)
}
