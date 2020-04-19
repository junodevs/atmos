const { AkairoClient, CommandHandler, ListenerHandler, InhibitorHandler } = require('discord-akairo')
const { akairoOptions, discordOptions, atmosOptions } = require('../config')
const { token } = require('../secrets')
const { resolve } = require('path')

class AtmosClient extends AkairoClient {
  constructor () {
    super(akairoOptions, discordOptions)

    this.commandHandler = new CommandHandler(this, {
      handleEdits: true,
      commandUtil: true,
      directory: resolve(process.cwd(), 'src', 'commands'),
      prefix: atmosOptions.prefix
    })

    this.listenerHandler = new ListenerHandler(this, {
      directory: resolve(process.cwd(), 'src', 'listeners')
    })

    this.inhibitorHandler = new InhibitorHandler(this, {
      directory: resolve(process.cwd(), 'src', 'inhibitors')
    })

    // Enable handlers
    this.commandHandler.useListenerHandler(this.listenerHandler)
    this.commandHandler.useInhibitorHandler(this.inhibitorHandler)

    // Load all files
    this.commandHandler.loadAll()
    this.listenerHandler.loadAll()
    this.inhibitorHandler.loadAll()
  }
}

const client = new AtmosClient()

client.login(token)
