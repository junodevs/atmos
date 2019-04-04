// COMPLETE TEMPORARY CACHE OF PER-SERVER INFORMATION, ERASED ON RE-DEPLOY
// IF THIS GETS TOO BIG WE'VE GOT A PROBLEM CHIEF
var prefixCache = {

}

function setPrefixCache (key, value) {
  prefixCache[key] = value
}

function getPrefixCache (key) {
  return prefixCache[key]
}

module.exports = {
  setPrefixCache: setPrefixCache,
  getPrefixCache,
  getPrefixCache
}
