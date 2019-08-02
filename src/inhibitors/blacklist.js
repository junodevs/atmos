// Basic blacklisted users inhibitor

import { Inhibitor } from 'discord-akairo'
import { blacklist } from '../../config'

class BlacklistInhibitor extends Inhibitor {
  constructor () {
    super('blacklist', {
      reason: 'blacklist'
    })
  }

  async exec (message) {
    return blacklist.includes(message.author.id)
  }
}

export default BlacklistInhibitor
