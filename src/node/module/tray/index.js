/**
 * @name 系统托盘
 */

/* private */

const Path=require('path')
const { app, Tray, Menu } = require('electron')
const State = require('../../core/state')

let tray = null
let win = null

/**
 * @name 处理复原按钮点击
 */
function handleClick() {
    win.isVisible() ? win.hide() : win.show()
}

/* public */

/**
 * @name 初始化
 * @descript App ready事件后调用
 * @param {Object} _win 窗口对象
 */
function initiate(_win) {
    win = _win

    let iconSrc
    if (process.env.NODE_ENV === 'development') {
      iconSrc='./dist/icon.png'
    } else {
      iconSrc=Path.resolve(__dirname,'../../../../dist/icon.png')
    }

    tray = new Tray(iconSrc)
    tray.setToolTip('What Next')

    let contextMenu = Menu.buildFromTemplate([{
        label: '退出', click: () => {
            State.quit = true
            app.quit()
        }
    }])
    tray.setContextMenu(contextMenu)
    tray.on('click', handleClick)
}

/* construct */

module.exports = { initiate }
