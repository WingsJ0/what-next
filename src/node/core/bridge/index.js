/**
 * @name 桥接
 */

/* private */

const Store = require('../../module/store')

/* public */

/**
 * @name 获取笔记本目录
 * @return {Array} 目录
 */
function getChapters() {
    return Store.getChapters()
}
/**
 * @name 添加笔记本章节
 * @param {Number} order 排序
 * @return {Object} 笔记本章节
 */
async function addChapter(order) {
    return Store.addChapter(order)
}
/**
* @name 删除章节
* @param {Number} id 标识
*/
function removeChapter(id) {
    return Store.removeChapter(id)
}
/**
 * @name 编辑章节
 * @param {Object} chapter 章节
 */
function editChapter(chapter) {
    Store.editChapter(chapter)
}
/**
 * @name 获取页
 * @param {Number} id 标识
 * @return {Object} 页实例
 */
async function getPage(id) {
    return Store.getPage(id)
}
/**
 * @name 编辑页
 * @param {Object} page 页。Page实例
 */
function editPage(page) {
    Store.editPage(page)
}
/**
 * @name 另存为章节
 * @param {Number} id 标识
 * @param {String} filePath 路径
 */
function saveAsChapter(id,filePath){
  Store.saveAsChapter(id,filePath)
}


/* construct */

global.bridge = { getChapters, addChapter, removeChapter, editChapter, getPage, editPage,saveAsChapter }
