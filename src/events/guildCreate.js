module.exports = (guild, embed) => {
  if (guild.available) {
    guild.createRole({
      name: 'Muted',
      color: 'GREY',
      permissions: 1024
    }).then(() => {
      embed.setTitle('')
      embed.setDescription('')
      embed.addField()
      embed.addField()
      embed.addField()

      embed.setColor(embedColors.error)
      embed.setTimestamp(new Date())
      embed.setThumbnail(thumbImg)
    }).catch((err) => {
      // Handle error
      console.error(err)
    })
  }
}