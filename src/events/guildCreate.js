const bot = require('../bot.js')
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

      embed.setColor(bot.config.colors.error)
      embed.setTimestamp(new Date())
      embed.setThumbnail(bot.config.thumbImg)
    }).catch((err) => {
      // Handle error
      console.error(err)
    })
  }
}
