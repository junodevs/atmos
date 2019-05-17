exports.run = (client, message, args, embed, thumbImg, reactions, embedColors) => {
  var msg = message.channel.fetchMessage(args[0])
  if (message.guild.channels.exists('name', 'pinboard')) {
      var chnl = message.guild.channels.get('name', 'pinboard')
  } else {
      message.guild.createChannel('pinboard', "text")
      embed.setTitle('Created Pinboard channel.')
      embed.setColor(embedColors.default)
      embed.setFooter(`${message.author.username + '#' + message.author.discriminator} | ❤ JunoDevs`)
      embed.setTimestamp(new Date())
      embed.setThumbnail(thumbImg)
      message.channel.send(embed)
  }
  embed.setTitle(':pushpin: Pinned:')
  embed.setColor(embedColors.default)
  embed.setFooter(`${message.author.username + '#' + message.author.discriminator} | ❤ JunoDevs`)
  embed.setTimestamp(new Date())
  embed.setThumbnail(thumbImg)
  embed.addField(`${message.author.username + '#' + message.author.discriminator}:`, `${msg}`)

  chnl.send(embed)
}
