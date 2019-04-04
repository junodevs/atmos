var bot = require('../bot.js')
const cache = require('../utils/cache.js')
const { dbPromise } = require('../utils/database.js')

module.exports = (client, message) => {
  if (message.author.bot) return
  var embed = new bot.Discord.RichEmbed()

  if (message.channel.type === 'dm') {
    // TODO: ModMail features execute here
  }

  var prefix
  // BEGIN SHITSTORM OF CUSTOM PREFIXES
  // For the prefixes and all settings use a database, and have the website connect to the db and have people sign into Discord.
  if (!cache.getPrefixCache(message.guild.id)) {
    // This where we get prefix from db and put to cache
  } else {
    prefix = cache.getPrefixCache(message.guild.id)
    commandRun() // REQUIRED BECAUSE MYSQL IS ASYNC
  }

  function commandRun () {
    // HANDLE MESSAGE NOW THAT WE HAVE PREFIX
  }
}
