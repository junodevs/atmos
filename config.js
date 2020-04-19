module.exports = {
  atmosOptions: {
    prefix: 'a.',
    reactions: {
      success: '✅',
      error: '❌',
      warning: '⚠️'
    },
    embedColors: {
      default: '#686de0',
      error: '#ff4642',
      warning: '#ffd139',
      success: '#26cb7c'
    },
    embedFooter: (msg) => `${msg.author.username + '#' + msg.author.discriminator} | ❤ JunoDevs`
  },
  akairoOptions: {
    ownerID: [
      '200616508328509442', // BluLightShow#0001
      '189850839660101632', // Luke#1000
      '401792058970603539'  // AmusedGrape#1000
    ]
  },
  discordOptions: {
    disableEveryone: true
  }
}
