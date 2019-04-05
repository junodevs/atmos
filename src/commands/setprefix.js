const cache = require('../utils/cache.js')
const { dbPromise } = require('../utils/database.js')

exports.run = (client, message, args, embed, thumbImg, reactions, thumbColor) => {

    var sqlselect = `SELECT ServerID FROM config_prefix WHERE ServerID=${message.guild.id}`
    var sqlinsert = `INSERT INTO config_prefix (ServerID, Prefix) VALUES (${message.guild.id}, "${args[0]}")`
    var sqlupdate = `UPDATE config_prefix SET Prefix="${args[0]}" WHERE ServerID=${message.guild.id}`

    if (message.guild.member(message.author).hasPermission('MANAGE_GUILD')) {
        if (args.length === 1) {
            dbPromise(sqlselect).then((result) => {
                if (result.length === 0) {
                    return dbPromise(sqlinsert)
                } else {
                    return dbPromise(sqlupdate)
                } // TODO: Error and success messages and reactions
            }).then((result) => {
                // Send success
            })
        } else {
            // Send error because too little or too many arguments provided
        }
    } else {
        // Send error because you need the MANAGE_GUILD permission to set the prefix for the server
    }
}