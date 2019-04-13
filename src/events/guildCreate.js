const bot = require('../bot.js')
const { dbPromise } = require('../utils/database.js')
module.exports = (client, guild) => {
    // !!!!! WE GOTTA MAKE SURE WE HAVE PERMISSION TO DO THIS !!!!!
    guild.createRole({
      name: 'Muted',
      color: 'GREY',
      hoist: false,
      mentionable: false,
      position: 1,
      permissions: 0 // DEVOID OF ANY NEW PERMISSIONS
    }).then(role => {
      var sqlselect = `SELECT ServerID FROM config WHERE ServerID=${guild.id}`
      var sqlinsert = `INSERT INTO config (ServerID, MutedRole) VALUES (${guild.id}, ${role.id})`
      var sqlupdate = `UPDATE config SET MutedRole=${role.id} WHERE ServerID=${guild.id}`

      dbPromise(sqlselect).then(result => {
        if (result.length === 0) {
          dbPromise(sqlinsert)
        } else {
          dbPromise(sqlupdate)
        }
      }).catch((err) => {
        console.log(err)
      })

      guild.channels.array().forEach(channel => {
        if (channel.type.text) {
          console.log('text')
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
