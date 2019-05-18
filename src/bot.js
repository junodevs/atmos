const Discord = require('discord.js')
const fs = require('fs')
const Enmap = require('enmap')
const mysql = require('mysql')
const client = new Discord.Client()
const { version } = require('../package.json')
const config = require('../config.js')

const dbErrorThrown = false // Only run DB error protocol once

var dbuser
if (process.env.TESTER_ENV) {
    dbuser = 'envision_atmos_d' // DEV ENV
    console.log('Development environment detected...connecting to development database account instead of production...')
  } else {
    dbuser = 'envision_atmos'
    console.log('Production environment detected...connecting to production database account for security...')
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

console.log('[Start Events Load]')

fs.readdir('./src/events/', (err, files) => {
  if (err) return console.error(new Error(err))
  files.forEach(file => {
    if (!file.endsWith('.js')) return

    const event = require(`./events/${file}`)

    let eventName = file.split('.')[0]

    client.on(eventName, event.bind(null, client))
    delete require.cache[require.resolve(`./events/${file}`)]
  })
})

console.log('[Events Load Complete]')

client.commands = new Enmap()

console.log('[Commands Load Start]')

fs.readdir('./src/commands/', (err, files) => {
  if (err) return console.error(err)
  files.forEach(file => {
    if (!file.endsWith('.js')) return
    let props = require(`./commands/${file}`)
    let commandName = file.split('.')[0]
    client.commands.set(commandName, props)
  })
})

console.log('[Commands Load Complete]')

client.on('ready', () => {
  console.log('[Connected to Discord]')
  client.user.setPresence({
    game: {
      name: `for ${config.prefix}help | PRE ${version}`,
      type: 'WATCHING'
    },

    status: 'online'
  })
})

if (process.env.BOT_TOKEN === undefined) {
  client.login(process.env.TESTER_TOKEN)
  console.log('No production bot token found...attempting connection to tester token...')
} else {
  client.login(process.env.BOT_TOKEN)
  console.log('Production bot token found...attempting connection to production bot account...')
}
