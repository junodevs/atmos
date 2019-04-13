const bot = require('../bot.js')
const { dbPromise } = require('../utils/database.js')
module.exports = (guild, embed) => {
  if (guild.available) {
    guild.createRole({
      name: 'Muted',
      color: 'GREY',
      permissions: 66560 // READ, VIEW CHANNEL, AND READ HISTORY
    }).then(role => {
      var sqlselect = `SELECT ServerID FROM config WHERE ServerID=${guild.id}`
      var sqlinsert = `INSERT INTO config (ServerID, MutedRole) VALUES (${guild.id}, ${role.id})`
      var sqlupdate = `UPDATE config SET MutedRole=${role.id} WHERE ServerID=${guild.id}`

      dbPromise(sqlselect).then(result => {
        if (result.length === 0) {
          return dbPromise(sqlinsert)
        } else {
          return dbPromise(sqlupdate)
        }
      })

      guild.channels.array().forEach(channel => {
        if (channel.type.text) {
          channel.overwritePermissions(role, {
            'SEND_MESSAGES': false,
            'ADD_REACTIONS': false
          })
        } else if (channel.type.voice) {
          channel.overwritePermissions(role, {
            'SPEAK': false
          })
        }
      })
    }).catch((err) => {
      // Handle error
      console.error(err)
    })
  }
}
