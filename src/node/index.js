/**
 * @name Index
 */

/* private */

const { app } = require('electron')
const Win = require('./module/win')
const Tray = require('./module/tray')
const Store = require('./module/store')

/* construct */

if (!app.requestSingleInstanceLock()) { // 只允许打开一个应用
    app.quit()
}

require('./core/bridge')

app.on('ready', () => {
    Store.initiate()
    let win = Win.initiate()
    Tray.initiate(win)
})
