const menubar = require('menubar')
const gbfs = require('gbfs-client')
const gbfsClient = new gbfs('https://gbfs.citibikenyc.com/gbfs/en/')

var mb = menubar()

mb.on('ready', function ready () {
  console.log('app is ready')
  // your app code here
})
