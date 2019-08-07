export default {
  version: '2',
  admins: [
    '189850839660101632',
    '200616508328509442',
    '306503388500066306',
    '401792058970603539',
    '251788826232619008'
  ],
  prefix: 'a.',
  reactions: {
    success: '✅',
    error: '❌',
    warning: '⚠️'
  },
  colors: {
    default: '#686de0',
    error: '#ff4642',
    warning: '#ffd139',
    success: '#26cb7c'
  },
  // footer: `Author#0000 | ❤ JunoDevs`,
  footer: (msg) => {
    return `${msg.author.username + '#' + msg.author.discriminator} | ❤ JunoDevs`
  },
  blacklist: [],
  thumbImg: 'https://atmosbot.com/img/Atmos.png' // TODO: Move this to more reliable spot so if my hosting cuts the thumb is still there
}
