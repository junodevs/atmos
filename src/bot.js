import config from '../config.js'
import { AkairoClient } from 'discord-akairo'
import { log } from './utils/logger'
import { dbPromise, db } from './utils/database.js'
import Discord from 'discord.js'
import cache from './utils/cache.js'

require('dotenv').config()

const client = new AkairoClient({
  ownerID: config.admins,
  prefix: 'a.',
  extensions: ['.js', '.ts', '.mjs'],
  clientUtil: true,
  handleEdits: true,
  defaultCooldown: 2000,
  commandDirectory: './src/commands/',
  inhibitorDirectory: './src/inhibitors',
  listenerDirectory: './src/listeners/'
}, {
  disableEveryone: true
})

// if (!process.env.BOT_TOKEN) {
//   client.login(process.env.TESTER_TOKEN)
//     .then(() => {
//       log('Success! Logged in and ready via tester token', 'ready')
//     }).catch(err => {
//       log(err, 'error')
//     })
// } else {
//   log('Production bot token found...attempting connection to production bot account...', 'warn')

//   client.login(process.env.BOT_TOKEN)
//     .then(() => {
//       log('Success! Logged in and ready via production token', 'ready')
//     }).catch(err => {
//       log(err, 'error')
//     })
// }

client.login(process.env.TESTER_TOKEN)
  .then(() => {
    log('Success! Logged in and ready via tester token', 'ready')
  }).catch(err => {
    // throw new Error(log(err, 'error'))
    throw new Error(err)
  })

// process.on('unhandledRejection', err => {
//   console.error(`unhandled rejection ${err}`)
// })
// This doesn't give enough info to debug things that aren't handled. Please leave it unhandled for now.
