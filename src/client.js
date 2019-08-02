import { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } from 'discord-akairo'
import path from 'path'
import cache from './utils/cache.js'
import { prefix as commandPrefix } from '../config'
import { dbPromise } from './utils/database.js'
import { db } from './database'
import Discord from 'discord.js'

export default class Client extends AkairoClient {
  constructor (config) {
    super(config)

    // commands
    this.commandHandler = new CommandHandler(this, {
      // directory: './commands',
      prefix: (message) => {
        var prefix // Perfectly balanced, as all things should be.
        if (!cache.getPrefixCache(message.guild.id)) {
          const sqlCheck = `SELECT Prefix FROM config WHERE ServerID=${db.escape(parseInt(message.guild.id))}`
          dbPromise(sqlCheck).then((result) => {
            if (result[0] === undefined) {
              cache.setPrefixCache(message.guild.id, commandPrefix)
              prefix = commandPrefix // Very slight performance boost vs last version
              resultMePlease()
            } else {
              var prefixResult = result[0]['Prefix']
              cache.setPrefixCache(message.guild.id, prefixResult)
              prefix = prefixResult // Very slight performance boost again
              resultMePlease()
            }
          }).catch((err) => {
            console.log(err)

            this.client.user.setPresence({
              game: {
                name: `DB Error! | We're already on it!`
              },
              status: 'dnd'
            })
            var embed = new Discord.RichEmbed()
            embed.setTitle('Command Run Error')
            embed.setDescription('There was an error in the command run process.')
            embed.setColor(config.colors.error)
            embed.setFooter(`Chief we've got a problem`)
            embed.setTimestamp(new Date())
            embed.setThumbnail(config.thumbImg)
            // ERROR: Notifies Devs for fixing
            embed.addField('`' + err + '`', 'Above is the error message. This message is the result of a problem anywhere from a DB connection error to an unhandled promise in a command file. This is an urgent, error, and must be handled as soon as possible by the team.')

            this.client.guilds.get('561768427757240330').channels.get('563495099896430612').send('<@&563495674432192513>', { embed: embed })
          })
        }
        function resultMePlease () {
          return prefix
        }
      },
      clientUtil: true,
      handleEdits: true
    })

    // message checking
    this.inhibitorHandler = new InhibitorHandler(this, {
      directory: String(path.join(__dirname, 'inhibitors'))
    })

    // events
    this.listenerHandler = new ListenerHandler(this, {
      directory: String(path.join(__dirname, 'listeners'))
    })

    this.db = db
  }
}
