const ow = require('overwatch-api')
exports.run = (client, message, args, embed, thumbImg, reactions, embedColors) => {
  if (args.length === 3) {
    var playerName = args[0].replace('#', '-')

    var region
    var platform
    if (args[1] === 'us') region = 'us'
    if (args[1] === 'eu') region = 'eu'

    if (args[2] === 'pc') platform = 'pc'
    if (args[2] === 'xbl') platform = 'xbl'
    if (args[2] === 'psn') platform = 'psn'

    ow.getStats(platform, region, playerName, (err, json) => {
      if (err) {
        console.log(err)
        embed.setTitle('Retrieval Error')
        embed.setDescription('There was an error finding the specified username in the specified platform and region. This is probably an issue with blizzard. Please try again later.')
        embed.setColor(embedColors.error)
        embed.setFooter(`${message.author.username + '#' + message.author.discriminator} | ❤ JunoDevs`)
        embed.setTimestamp(new Date())
        embed.setThumbnail(thumbImg)

        message.channel.send(embed)
        message.react(reactions.error)
        return
      }

      if (json.private) {
        console.log(err)
        embed.setTitle('Privacy Error')
        embed.setDescription('**Your profile is set to private so Atmos cannot retrieve any stats or information on your gameplay. This can be modified by the user in-game.**')
        embed.setColor(embedColors.error)
        embed.setFooter(`${message.author.username + '#' + message.author.discriminator} | ❤ JunoDevs`)
        embed.setTimestamp(new Date())
        embed.setThumbnail(thumbImg)

        message.channel.send(embed)
        message.react(reactions.error)
        return
      }

      console.log(json)
      embed.setTitle(`Overwatch Player Stats: ${json.username}`)
      embed.setDescription('A summary of statistics for the specified overwatch profile.')
      embed.setColor(embedColors.success)
      embed.setFooter(`${message.author.username + '#' + message.author.discriminator} | ❤ JunoDevs`)
      embed.setTimestamp(new Date())
      embed.setThumbnail(json.portrait)
      embed.addField(`Level: ${json.level}`, 'More info to come soon!')

      message.channel.send(embed)
      message.react(reactions.success)
    })
  } else {
    embed.setTitle('Command Error')
    embed.setDescription('This command requires 3 arguments to run.')
    embed.setColor(embedColors.error)
    embed.setFooter(`${message.author.username + '#' + message.author.discriminator} | ❤ JunoDevs`)
    embed.setTimestamp(new Date())
    embed.setThumbnail(thumbImg)
    embed.addField('Username and Discrim', 'Ex: `BluLightShow#1929`')
    embed.addField('Region (Supports `us` and `eu`)', 'Ex: `us`')
    embed.addField('Platform (Supports `pc`, `xbl`, and `psn`)', 'Ex: `pc`')

    message.channel.send(embed)
    message.react(reactions.error)
  }
}
