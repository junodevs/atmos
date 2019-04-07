const bot = require('../bot.js')
const cache = require('../utils/cache.js')
const { dbPromise } = require('../utils/database.js')

module.exports = (client, message) => {
  if (message.author.bot) return
  const embed = new bot.Discord.RichEmbed()

  if (message.channel.type === 'dm') {
    // Will at first require dialogue request which server you are trying to reach (if the user is in multiple servers w/ atmos)
  }

  var prefix
  // For the prefixes and all settings use a database, and have the website connect to the db and have people sign into Discord.
  if (!cache.getPrefixCache(message.guild.id)) {
    // Check if the current server has a custom prefix set or not
    var sqlcheck = `SELECT Prefix FROM config WHERE ServerID=${message.guild.id}`

    dbPromise(sqlcheck).then((result) => {
      if (result === [] || result[0] === undefined) {
        cache.setPrefixCache(message.guild.id, bot.config.prefix)
        prefix = cache.getPrefixCache(message.guild.id)
        commandRun()
      } else {
        var prefixObject = result[0]
        var prefixResult = prefixObject['Prefix']

        cache.setPrefixCache(message.guild.id, prefixResult)
        prefix = cache.getPrefixCache(message.guild.id)
        commandRun() // Prefix checking done; Commands can be ran
      }
    }).catch((err) => { // This will catch a thrown issue from database connection AND the running command
      if (!bot.dbErrorThrown) {
        bot.client.user.setPresence({
          game: {
            name: `DB Error! | We're already on it!`
          },
          status: 'dnd'
        })

        embed.setTitle('Command Run Error')
        embed.setDescription('There was an error in the command run process.')
        embed.setColor(bot.config.colors.error)
        embed.setFooter(`Chief we've got a problem`)
        embed.setTimestamp(new Date())
        embed.setThumbnail(bot.config.thumbImg)
        // Error message
        embed.addField('`' + err + '`', 'Above is the error message. This message is the result of a problem anywhere from a DB connection error to an unhandled promise in a command file. This is an urgent, error, and must be handled as soon as possible by the team.')

        bot.client.guilds.get('561768427757240330').channels.get('563495099896430612').send('<@&563495674432192513>', { embed: embed })
      }
      bot.dbErrorThrown = true
      console.error(err)
    })
  } else {
    prefix = cache.getPrefixCache(message.guild.id)
    commandRun()
  }

  // Function is required because MySQL is asynchronous and I'm too lazy to actually do it the right way
  function commandRun () {
    var isCustomPrefix = false
    var isDefaultPrefix = false
    // Handle message

    if (message.content.indexOf(bot.config.prefix) === 0) { // The Magical Lines (AKA don't fuck with it)
      isDefaultPrefix = true
    }
    if (message.content.indexOf(prefix) === 0) {
      isCustomPrefix = true
    }

    if (isCustomPrefix === false && isDefaultPrefix === false) {
      return
    }
    // Check for permissions required to run ANY atmos command
    if (!message.guild.members.get('219119687743569920' && '447838388943454209').permissionsIn(message.channel).has(['SEND_MESSAGES', 'EMBED_LINKS', 'USE_EXTERNAL_EMOJIS', 'ADD_REACTIONS'], true)) {
      embed.setTitle('Permission Error')
      embed.setDescription("I don't have the correct global permissions! If you're a normal user, alert a server admin of this error. If you're a server admin, please ensure you have given Atmos the correct permissions, see following:")
      embed.setColor(bot.config.colors.error)
      embed.setFooter(`${message.author.username + '#' + message.author.discriminator} | ❤ JunoDevs`)
      embed.setTimestamp(new Date())
      embed.setThumbnail(bot.config.thumbImg)

      // Check each individually to report back
      var sendMessages = '❌'
      var embedLinks = '❌'
      var externalEmojis = '❌'
      var addReactions = '❌'

      if (message.guild.members.get('219119687743569920' && '447838388943454209').permissionsIn(message.channel).has('SEND_MESSAGES', true)) sendMessages = '✅'
      if (message.guild.members.get('219119687743569920' && '447838388943454209').permissionsIn(message.channel).has('EMBED_LINKS', true)) embedLinks = '✅'
      if (message.guild.members.get('219119687743569920' && '447838388943454209').permissionsIn(message.channel).has('USE_EXTERNAL_EMOJIS', true)) externalEmojis = '✅'
      if (message.guild.members.get('219119687743569920' && '447838388943454209').permissionsIn(message.channel).has('ADD_REACTIONS', true)) addReactions = '✅'

      // Respond with what permissions we have and those we don't
      embed.addField('Note', "The following list is of the bot's available permissions for the channel you just sent a command attempt in, including channel overrides.")
      embed.addBlankField()
      embed.addField(`Send Messages: ${sendMessages}`, 'Ability to send messages to the channel.')
      embed.addField(`Embed Links: ${embedLinks}`, 'Ability to send our fancy custom embedded messages.')
      embed.addField(`Use External Emojis: ${externalEmojis}`, 'Permission to use external emojis for some reactions.')
      embed.addField(`Add Reactions: ${addReactions}`, 'Ability to add reactions to messages to communicate completion or failure of commands.')

      // Send a DM to message author if we can't send messages
      if (message.author.dmChannel === null) {
        message.author.createDM().then(channel => {
          channel.send(embed)
        })
      } else {
        message.author.dmChannel.send(embed)
      }

      return // Very important or else we die
    }

    // args and commands my guy
    var args
    if (isCustomPrefix) {
      args = message.content.slice(prefix.length).trim().split(/ +/g)
    } if (isDefaultPrefix) {
      args = message.content.slice(bot.config.prefix.length).trim().split(/ +/g)
    }
    const command = args.shift().toLowerCase()
    const thumbImg = bot.config.thumbImg
    const reactions = bot.config.reactions
    const embedColors = bot.config.colors

    const cmd = client.commands.get(command)
    if (!cmd) return

    cmd.run(client, message, args, embed, thumbImg, reactions, embedColors)
  }
}