const { Listener } = require('discord-akairo')
const consola = require('consola')

class ReadyListener extends Listener {
  constructor() {
    super('ready', {
      emitter: 'client',
      event: 'ready'
    })
  }

  exec () {
    consola.success('Atmos has started!')
  }
}

module.exports = ReadyListener
