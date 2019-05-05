exports.run = (client, message, args, embed, thumbImg, reactions, embedColors) => {
  embed.setTitle("Grabbing the paddle...")
    embed.setColor("#42f4c5")
    embed.setFooter(footer)
    embed.setTimestamp(new Date())
    embed.setThumbnail(thumbnail)

    channel.send(embed).then(m => {
        embed.setTitle(`🏓 *Pong!! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms!*`)
        m.edit(embed)
        message.react(reactions.success)
    })
}
