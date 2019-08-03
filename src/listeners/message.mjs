const bot = require('../client.js/index.js')
const cache = require('../utils/cache.js')
const { dbPromise } = require('../utils/database.js')
const config = require('../../config.mjs')

module.exports = (client, message) => {
  if (message.author.bot) return
  const embed = new bot.Discord.RichEmbed()

  if (message.channel.type === 'dm') {
    // TODO: MODMAIL
  }

  var prefix
  // ----- BEGIN CUSTOM PREFIXES -----
  if (!cache.getPrefixCache(message.guild.id)) {
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
    }).catch((err) => { // HANDLES ERROR IN DATABASE OR COMMAND
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
        // ERROR: Notifies Devs for fixing
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

  // RUN COMMAND AFTER PREFIX FOUND
  function commandRun () {
    var isCustomPrefix = false
    var isDefaultPrefix = false

    if (message.content.indexOf(bot.config.prefix) === 0) isDefaultPrefix = true
    if (message.content.indexOf(prefix) === 0) isCustomPrefix = true
    if (isCustomPrefix === false && isDefaultPrefix === false) return
    // PERMISSION CHECKS
    var environment
    if (process.env.TESTER_ENV) {
      environment = '447838388943454209'
    } else {
      environment = '219119687743569920'
    }
    if (!message.guild.members.get(environment).permissionsIn(message.channel).has(['SEND_MESSAGES', 'EMBED_LINKS', 'USE_EXTERNAL_EMOJIS', 'ADD_REACTIONS'], true)) {
      embed.setTitle('Permission Error')
      embed.setDescription("I don't have the correct global permissions! If you're a normal user, alert a server admin of this error. If you're a server admin, please ensure you have given Atmos the correct permissions, see following:")
      embed.setColor(bot.config.colors.error)
      // embed.setFooter(config.footer(message))
      embed.setFooter(config.footer(message))
      embed.setTimestamp(new Date())
      embed.setThumbnail(bot.config.thumbImg)

      // Check perms separate and reply with individual results
      var sendMessages = '❌'
      var embedLinks = '❌'
      var externalEmojis = '❌'
      var addReactions = '❌'
      if (message.guild.members.get('219119687743569920' && '447838388943454209').permissionsIn(message.channel).has('SEND_MESSAGES', true)) sendMessages = '✅'
      if (message.guild.members.get('219119687743569920' && '447838388943454209').permissionsIn(message.channel).has('EMBED_LINKS', true)) embedLinks = '✅'
      if (message.guild.members.get('219119687743569920' && '447838388943454209').permissionsIn(message.channel).has('USE_EXTERNAL_EMOJIS', true)) externalEmojis = '✅'
      if (message.guild.members.get('219119687743569920' && '447838388943454209').permissionsIn(message.channel).has('ADD_REACTIONS', true)) addReactions = '✅'

      // Tell user granted perms vs restricted perms
      embed.addField('Note', "The following list is of the bot's available permissions for the channel you just sent a command attempt in, including channel overrides.")
      embed.addBlankField()
      embed.addField(`Send Messages: ${sendMessages}`, 'Ability to send messages to the channel.')
      embed.addField(`Embed Links: ${embedLinks}`, 'Ability to send our fancy custom embedded messages.')
      embed.addField(`Use External Emojis: ${externalEmojis}`, 'Permission to use external emojis for some reactions.')
      embed.addField(`Add Reactions: ${addReactions}`, 'Ability to add reactions to messages to communicate completion or failure of commands.')
      if (message.author.dmChannel === null) {
        message.author.createDM().then(channel => {
          channel.send(embed)
        })
      } else {
        message.author.dmChannel.send(embed)
      }
      return
    }

    // ARG AND COMMAND HANDLER PIECE
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
