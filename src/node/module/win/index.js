/**
 * @name 窗口
 */

/* private */

const Path = require('path')
const { app, BrowserWindow, Menu } = require('electron')
const State = require('../../core/state')

let win = null

/* public */

/**
 * @name 初始化
 * @return {Object} 窗口对象
 */
function initiate() {
    win = new BrowserWindow(
        {
            minWidth: 800,
            minHeight: 600,
            webPreferences:
            {
                nodeIntegration: true
            }
        })
    if (process.env.NODE_ENV === 'development') {
        win.loadURL('http://localhost:8080')
        win.webContents.openDevTools()
    } else {
        win.loadFile(Path.resolve(__dirname, '../../../../dist/index.html'))
    }
    win.on('close', ev => {
        if (!State.quit) { // 如果是托盘点击“退出”，则不阻止退出
            ev.preventDefault()
            win.hide()
        }
    })
    Menu.setApplicationMenu(null)

    app.on('activate', () => {
        if (!win) {
            initiate()
        }
    })
    app.on('second-instance', () => {
        if (win && !win.isVisible()) {
            win.show()
            win.focus()
        }
    })

    return win
}

/* construct */

module.exports = { initiate }
