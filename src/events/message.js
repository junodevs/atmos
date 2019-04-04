var bot = require('../bot.js')
const cache = require('../utils/cache.js')
const { dbPromise } = require('../utils/database.js')

module.exports = (message) => {
  if (message.author.bot) return
  var embed = new bot.Discord.RichEmbed()

  if (message.channel.type === 'dm') {
    // TODO: ModMail features execute here
  }

  var prefix
  // For the prefixes and all settings use a database, and have the website connect to the db and have people sign into Discord.
  if (!cache.getPrefixCache(message.guild.id)) {
    // Check if the current server has a custom prefix set or not
    var sqlcheck = `SELECT Prefix FROM config_prefix WHERE ServerID=${message.guild.id}`

    dbPromise(sqlcheck).then((result) => {
      if (result !== [] || !result[0] !== undefined) {
        var prefixobject = result[0]
        var prefixresult = prefixobject['Prefix']

        cache.setPrefixCache(message.guild.id, prefixresult)
        prefix = cache.getPrefixCache(message.guild.id)
        commandRun() // Prefix checking done; Commands can be ran
      }
    }).catch((err) => {
      if (!bot.dbErrorThrown) {
        bot.client.user.setPresence({
          game: {
            name: "DB Error! | We're already on it!"
          },
          status: 'dnd'
        })

        embed.setTitle('DB Connection Error')
        embed.setDescription('There was an error connecting and/or querying the database, look into this immediately!')
        embed.setColor(bot.config.thumbColor)
        embed.setFooter("Chief we've got a problem")
        embed.setTimestamp(new Date())
        embed.setThumbnail(bot.config.thumbImg)
        // error message
        embed.addField('`' + err + '`')

        bot.client.guilds.get('561768427757240330').channels.get('563495099896430612').send(embed)
        bot.client.guilds.get('561768427757240330').channels.get('563495099896430612').send('<@&563495674432192513>')
      }
      bot.dbErrorThrown = true
      console.error(err)
    })
  } else {
    prefix = cache.getPrefixCache(message.guild.id)
    commandRun()
  }

  // Function is required because MySQL is asynchronous and I'm too lazy to actually do it the right way
  function commandRun() {
    // HANDLE MESSAGE NOW THAT WE HAVE PREFIX

    if (message.content.indexOf(prefix || bot.config.defaultprefix) !== 0) return // The Magical Line (AKA don't fuck with it)

    // Check for permissions required to run ANY atmos command
    if (!message.guild.members.get('219119687743569920' && '447838388943454209').hasPermission(['SEND_MESSAGES', 'EMBED_LINKS', 'USE_EXTERNAL_EMOJIS', 'ADD_REACTIONS'], false, true, false)) {
      embed.setTitle('Permission Error')
      embed.setDescription("I don't have the correct global permissions! If you're a normal user, alert a server admin of this error. If you're a server admin, please ensure you have given Atmos the correct permissions, see following:")
      embed.setColor(bot.config.thumbColor)
      embed.setFooter(`${message.author.username + message.author.discriminator} | ❤ JunoDevs`)
      embed.setTimestamp(new Date())
      embed.setThumbnail(bot.config.thumbImg)

      // Check each individually to report back
      var sendMessages = '❌'
      var embedLinks = '❌'
      var externalEmojis = '❌'
      var addReactions = '❌'

      if (message.guild.members.get('219119687743569920' && '447838388943454209').hasPermission('SEND_MESSAGES', false, true, false)) sendMessages = '✅'
      if (message.guild.members.get('219119687743569920' && '447838388943454209').hasPermission('EMBED_LINKS', false, true, false)) embedLinks = '✅'
      if (message.guild.members.get('219119687743569920' && '447838388943454209').hasPermission('USE_EXTERNAL_EMOJIS', false, true, false)) externalEmojis = '✅'
      if (message.guild.members.get('219119687743569920' && '447838388943454209').hasPermission('ADD_REACTIONS', false, true, false)) addReactions = '✅'

      // Respond with what permissions we have and those we don't
      embed.addBlankField()
      embed.addField(`Send Messages: ${sendMessages}`)
      embed.addField(`Embed Links: ${embedLinks}`)
      embed.addField(`Use External Emojis: ${externalEmojis}`)
      embed.addField(`Add Reactions: ${addReactions}`)

      // Well I mean if we can't send messages we gotta DM 'em
      if (message.author.dmChannel === null) {
        message.author.createDM().then(channel => {
          channel.send(embed)
        })
      } else {
        message.author.dmChannel.send(embed)
      }

      return // Very important or else we die
    }
  }
}
