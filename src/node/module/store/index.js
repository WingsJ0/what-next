/**
 * @name 存储
 */

/* private */

const Path = require('path')
const Fs = require('fs')
const Constant = require('../../core/constant')
const Book = require('./component/book')
const Page = require('../../../common/structure/page')

let book = null
let cache = {}

/**
 * @name 准备
 * @description 确保目录存在
 */
function prepare() {
  if (!Fs.existsSync(Constant.DistPath)) {
    Fs.mkdirSync(Constant.DistPath)
  }
  if (!Fs.existsSync(Constant.DataPath)) {
    Fs.mkdirSync(Constant.DataPath)
  }
  if (!Fs.existsSync(Constant.PagesPath)) {
    Fs.mkdirSync(Constant.PagesPath)
  }
}
/**
 * @name 获取页数据
 * @param {Number} id 标识
 * @return {Object} 页对象
 */
function fetchPage(id) {
  let promise = new Promise((resolve, reject) => {
    let path = Path.resolve(Constant.PagesPath, `./${id}.json`)

    if (cache[id]) {
      resolve(cache[id])
    }
    if (Fs.existsSync(path)) {
      Fs.readFile(path, { encoding: 'utf-8' }, (er, data) => {
        if (er) { reject(er); return }

        cache[id] = data
        resolve(data)
      })
    } else {
      reject(new Error('Data missing'))
    }
  })

  return promise
}
/**
 * @name 保存页
 * @param {Object} page 页对象
 */
function savePage(page) {
  let promise = new Promise((resolve, reject) => {
    let pageString=JSON.stringify(page)

    Fs.writeFile(Path.resolve(Constant.PagesPath, `./${page.id}.json`), pageString, { encoding: 'utf-8' }, (er) => {
      if (er) { reject(er); return }

      cache[page.id] = pageString
      resolve()
    })
  })

  return promise
}
/**
 * @name 删除页
 * @param {Number} id 标识
 */
function deletePage(id) {
  Fs.unlink(Path.resolve(Constant.PagesPath, `./${id}.json`), er => er && console.log(er))
}

/* public */

/**
 * @name 初始化
 */
function initiate() {
  prepare()

  book = new Book()
}
/**
 * @name 获取所有章节
 * @return {Array} 所有章节
 */
function getChapters() {
  return book.getData()
}
/**
 * @name 添加章节
 * @param {Number} order 排序
 * @return {Object} 笔记本章节
 */
async function addChapter(order) {
  let chapter = book.add('[Book]', order - 0.5)
  let page = new Page(chapter.id)
  await savePage(page)

  return chapter
}
/**
 * @name 删除章节
 * @param {Number} id 标识
 */
function removeChapter(id) {
  deletePage(id)
  book.remove(id)
}
/**
 * @name 编辑章节
 * @param {Object} chapter 章节
 */
function editChapter(chapter) {
  book.edit(chapter)
}
/**
 * @name 获取页
 * @param {Number} id 标识
 */
async function getPage(id) {
  let pageString = await fetchPage(id)

  return JSON.parse(pageString)
}
/**
 * @name 编辑页
 * @param {Object} page 页。Page实例
 */
function editPage(page) {
  savePage(page)

  let total = page.list.length
  let finished = page.list.reduce((p, c) => p + (c.state === 1 ? 1 : 0), 0)
  let chapter = book.get(page.id)
  editChapter(Object.assign(chapter, { total, finished }))
}
/**
 * @name 另存为章节
 * @param {Number} id 标识
 * @param {String} filePath 路径
 */
async function saveAsChapter(id, filePath) {
  let pageString = await fetchPage(id)
  Fs.writeFile(filePath, pageString, { encoding: 'utf-8' }, er => er && console.log(er))
}

/* construct */

module.exports = { initiate, getChapters, addChapter, removeChapter, editChapter, getPage, editPage, saveAsChapter }
