const Discord = require('discord.js')
const fs = require('fs')
const Enmap = require('enmap')
const mysql = require('mysql')
const client = new Discord.Client()
const path = require('path')
const {
  version
} = require('../package.json')
const config = require('../config.js')

const db = mysql.createPool({
  connectionLimit: 1,
  host: '0.0.0.0', // TODO: LUKE
  port: 3306,
  user: '',
  password: '',
  database: ''
})

module.exports = {
  Discord: Discord,
  client: client,
  db: db,
  reactions: config.reactions
}

console.log('[Start Events Load]')

fs.readdir('./src/events/', (err, files) => {
  if (err) return console.error(new Error(err))
  files.forEach(file => {
    if (!file.endsWith('.js')) return

    const event = require(path.join(__dirname, `/src/events/${file}`))

    let eventName = file.split('.')[0]
    // let embed = new Discord.RichEmbed()

    client.on(eventName, event.bind(null, client))
    delete require.cache[require.resolve(path.join(__dirname, `/src/events/${file}`))]
  })
})

console.log('[Events Load Complete]')

client.commands = new Enmap()

console.log('[Commands Load Start]')

fs.readdir('./src/commands/', (err, files) => {
  if (err) return console.error(err)
  files.forEach(file => {
    if (!file.endsWith('.js')) return
    let props = require(path.join(__dirname, `/src/commands/${file}`))
    let commandName = file.split('.')[0]
    client.commands.set(commandName, props)
  })
})

console.log('[Commands Load Complete]')

client.on('ready', () => {
  console.log('[Connected to Discord]')
  console.log('[Startup should begin soon...]')
  client.user.setPresence({
    game: {
      name: `${client.guilds.size} servers | PRE ${version}`,
      type: 'WATCHING'
    },

    status: 'online'
  })
})

if (process.env.BOT_TOKEN === undefined) {
  //client.login(process.env.TESTER_TOKEN)
  client.login('NDQ3ODM4Mzg4OTQzNDU0MjA5.XKUngg.yeZ2orwDtNDt58jWvw1Zq_aWU28')
} else {
  client.login(process.env.BOT_TOKEN)
}