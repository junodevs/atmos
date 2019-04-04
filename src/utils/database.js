const bot = require('../bot.js')

const dbPromise = (sql) => {
  return new Promise((resolve, reject) => {
    bot.db.getConnection(function (err, connection) {
      if (err) {
        reject(err)
        return
      }
      connection.query(sql, function (err, result) {
        if (err) {
          reject(err)
          return
        }
        resolve(result)
        connection.release()
      })
    })
  })
}

module.exports = {
  dbPromise: dbPromise
}