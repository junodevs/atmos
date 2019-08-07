import { Listener } from 'discord-akairo'
import config from '../../config.mjs'
import { log } from '../utils/logger'

class ReadyListener extends Listener {
  constructor () {
    super('ready', {
      emitter: 'client',
      eventName: 'ready'
    })
  }

  async exec () {
    this.client.user.setPresence({
      game: {
        name: `for ${config.prefix}help | PRE ${config.version}`,
        type: 'WATCHING'
      },
      status: 'online'
    })

    log('Atmos has started', 'info')
    log(`Atmos is serving ${this.client.users.size} users over ${this.client.guilds.size} guilds!`, 'info')

    // TODO: add database sync-age
    // TODO: Add some real travis checks so a passing build actually means a passing build
  }
}

export default ReadyListener
