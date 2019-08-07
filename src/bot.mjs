import config from '../config.mjs'
import akario from 'discord-akairo'
import { log } from './utils/logger.mjs'
import { dbPromise, db } from './utils/database.mjs'
import Discord from 'discord.js'
import cache from './utils/cache.mjs'

import dotenv from 'dotenv'

dotenv.config()

const client = new akario.AkairoClient({
  ownerID: config.admins,
  prefix: 'a.',
  clientUtil: true,
  handleEdits: true,
  defaultCooldown: 2000,
  commandDirectory: './src/commands/',
  inhibitorDirectory: './src/inhibitors',
  listenerDirectory: './src/listeners/'
}, {
  disableEveryone: true
})

client.login(process.env.TESTER_TOKEN)
  .then(() => {
    // log('Success! Logged in and ready via tester token', 'ready')
  }).catch(err => {
    // throw new Error(log(err, 'error'))
    throw err.stack
  })
