const chalk = require('chalk')

exports.log = (content, type = 'info') => {
  switch (type) {
    case 'info': {
      return console.log(`[ ${chalk.blue(type.toLowerCase())} ] ${content} `)
    }
    case 'warn': {
      return console.log(`[ ${chalk.yellow(type.toLowerCase())} ] ${content} `)
    }
    case 'error': {
      return console.log(`[ ${chalk.red(type.toLowerCase())} ] ${content} `)
    }
    case 'cmd': {
      return console.log(`[ ${chalk.green(type.toLowerCase())} ] ${content} `)
    }
    case 'wait': {
      return console.log(`[ ${chalk.blue(type.toLowerCase())} ] ${content} `)
    }
    case 'event': {
      return console.log(`[ ${chalk.magenta(type.toLowerCase())} ] ${content}`)
    }
    case 'ready': {
      return console.log(`[ ${chalk.green(type.toLowerCase())} ] ${content}`)
    }
    default: throw new TypeError(`logger type must be either info, warn, error, wait, event or ready.`)
  }
}
