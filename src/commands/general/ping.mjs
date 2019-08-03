import { Command } from 'discord-akairo'
import { colors as embedColors, footer, thumbImg, reactions } from '../../../config'

class PingCommand extends Command {
  constructor () {
    super('ping', {
      aliases: ['ping'],
      category: 'general',
      description: 'Gets the bot\'s round-trip latency and discord API latency.'
    })
  }

  async exec (message) {
    const embed = this.client.util.embed()

    embed.setTitle('Grabbing the paddle ...')
    embed.setColor(embedColors.default)
    embed.setFooter(footer(message))
    embed.setTimestamp(new Date())
    embed.setThumbnail(thumbImg)

    message.channel.send({ embed }).then(m => {
      embed.setTitle(`🏓 *Pong!! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(this.client.ping)}ms!*`)
      m.edit({ embed })
      message.react(reactions.success)
    })
  }
}

export default PingCommand
