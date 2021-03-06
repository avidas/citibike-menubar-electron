const menubar = require('menubar')
const path = require('path')

const opts = { dir: __dirname, icon: path.join(__dirname, '../images', 'Icon.png') }

var mb = menubar(opts)

mb.on('ready', () => {
    console.log('ready')
})

mb.on('after-create-window', () => {
    mb.window.loadURL(`file://${__dirname}/index.html`)
})