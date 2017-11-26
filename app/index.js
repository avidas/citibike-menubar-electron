const menubar = require('menubar')
const path = require('path')

const opts = {dir: __dirname, icon: path.join(__dirname, '../images', 'Icon.png')}
var mb = menubar(opts)

var getAvailability = function () {
  // get gbfs format citibike information
};

mb.on('ready', function ready () {
  
})