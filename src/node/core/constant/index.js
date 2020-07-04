/**
 * @name 常量
 */

/* private */

const Path = require('path')

/* public */

const DistPath = Path.resolve(__dirname, '../../../../dist')
const DataPath = Path.resolve(DistPath, './data') // 数据文件夹
const PagesPath = Path.resolve(DataPath, './pages')

/* construct */

module.exports = { DistPath, DataPath, PagesPath }
