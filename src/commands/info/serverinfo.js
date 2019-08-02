import { Command } from 'discord-akairo'
import { colors as embedColors, footer, reactions } from '../../../config'
class PingCommand extends Command {
  constructor () {
    super('serverinfo', {
      aliases: ['serverinfo'],
      category: 'info',
      description: 'Gets information on the current server.'
    })
  }

  async exec (message) {
    const embed = this.client.util.embed()

    embed.setTitle(message.guild.name)
    embed.setDescription('Server Information')
    embed.setColor(embedColors.default)
    embed.setFooter(footer(message))
    embed.setTimestamp(new Date())
    embed.setThumbnail(message.guild.iconURL)
    // Start Information
    embed.addField('Total Users', message.guild.memberCount, true)
    embed.addField('Owner', message.guild.owner, true)
    embed.addField('Creation Date', message.guild.createdAt, true)
    embed.addField('AFK Channel', `${message.guild.afkChannel ? 'first' : 'second'}`, true)
    embed.addField('Server Region', message.guild.region, true)

    message.channel.send({ embed })
    message.react(reactions.success)
  }
}

export default PingCommand
