const Discord = require('discord.js')
const fs = require('fs')
const Enmap = require('enmap')
const mysql = require('mysql')
const client = new Discord.Client()
const { version } = require('../package.json')
const config = require('../config.js')
const dbErrorThrown = false // Only run DB error protocol once
const { log } = require('./utils/logger')
var dbuser
if (process.env.TESTER_ENV) {
  dbuser = 'envision_atmos_d' // DEV ENV
  log('Development environment detected...connecting to development database account instead of production...', 'warn')
} else {
  dbuser = 'envision_atmos'
  log('Production environment detected...connecting to production database account for security...', 'warn')
}
const db = mysql.createPool({ // IP needs to be whitelisted to connect as a security measure
  connectionLimit: 3,
  host: '176.31.10.37',
  port: 3306,
  user: dbuser,
  password: process.env.DB_PASS,
  database: 'envision_atmos_main'
})

module.exports = {
  Discord: Discord,
  client: client,
  db: db,
  config: config,
  dbErrorThrown: dbErrorThrown
}

log('Starting to load events...', 'wait')
fs.readdir('./src/events/', (err, files) => {
  if (err) return console.error(new Error(err))
  files.forEach(file => {
    if (!file.endsWith('.js')) return
    const event = require(`./events/${file}`)
    const eventName = file.split('.')[0]
    client.on(eventName, event.bind(null, client))
    delete require.cache[require.resolve(`./events/${file}`)]
  })
})
log('Event loading complete!', 'info')
client.commands = new Enmap()
log('Starting to load commands...', 'wait')
fs.readdir('./src/commands/', (err, files) => {
  if (err) return console.error(err)
  files.forEach(file => {
    if (!file.endsWith('.js')) return
    const props = require(`./commands/${file}`)
    const commandName = file.split('.')[0]
    client.commands.set(commandName, props)
  })
})
log('Command loading complete!', 'info')
client.on('ready', () => {
  log('Connected to Discord', 'ready')
  client.user.setPresence({
    activity: {
      name: `for ${config.prefix}help | PRE ${version}`,
      type: 'WATCHING'
    },
    status: 'online'
  })
})
if (process.env.TESTER_ENV) {
  process.exit(0) // Stop running now that you've loaded modules and run standard for tester env
}
if (process.env.BOT_TOKEN === undefined) {
  client.login(process.env.TESTER_TOKEN)
  log('No production bot token found...attempting connection to tester token...', 'warn')
} else {
  client.login(process.env.BOT_TOKEN)
  log('Production bot token found...attempting connection to production bot account...', 'warn')
}
