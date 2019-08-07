import mysql from 'mysql'
import { log } from './logger.mjs'

var dbuser

if (process.env.TESTER_ENV) {
  dbuser = 'envision_atmos_d' // DEV ENV
  log('Development environment detected...connecting to development database account instead of production...', 'warn')
} else {
  dbuser = 'envision_atmos'
  log('Production environment detected...connecting to production database account for security...', 'warn')
}

export const db = mysql.createPool({ // IP needs to be whitelisted to connect as a security measure
  connectionLimit: 3,
  host: '176.31.10.37',
  port: 3306,
  user: dbuser,
  password: process.env.DB_PASS,
  database: 'envision_atmos_main'
})

// Query => Promise, we've gone full synchronous
export function dbPromise (sql) {
  return new Promise((resolve, reject) => {
    db.getConnection(function (err, connection) {
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
