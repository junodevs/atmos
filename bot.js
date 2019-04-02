const Discord = require('discord.js')
const fs = require('fs')
const Enmap = require('enmap')
const client = new Discord.Client()
const package = require('./package.json');

client.on('ready', () => {
    console.log('[Connected to Discord]')
    console.log('Startup should begin soon...')
    client.user.setPresence({
        game: {
            name: `${client.guilds.size} servers | PRE ${package.version}`,
            type: 'WATCHING'
        },

        status: 'online',
    })
})

if (process.env.BOT_TOKEN === undefined) {
    client.login(auth.TESTER_TOKEN);
  } else {
    client.login(process.env.BOT_TOKEN);
  }