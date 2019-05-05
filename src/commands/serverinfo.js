exports.run = (client, message, args, embed, thumbImg, reactions, embedColors) => {
    if (message.channel.guild.afkChannel == null) {
        var afk = "No AFK Channel Set"
      } else {
        var afk = message.channel.guild.afkChannel
      }

      embed.setTitle(message.channel.guild.name)
      embed.setDescription("Server Information")
      embed.setColor("#42f4c5")
      embed.setFooter(footer)
      embed.setTimestamp(new Date())
      embed.setThumbnail(channel.guild.iconURL)
      // Start Information
      embed.addField("Total Users", channel.guild.memberCount, true)
      embed.addField("Owner", channel.guild.owner, true)
      embed.addField("Creation Date", channel.guild.createdAt, true)
      embed.addField("AFK Channel", afk, true)
      embed.addField("Server Region", channel.guild.region, true)

      message.channel.send(embed)
      message.react(reactions.success)
}
