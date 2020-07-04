/**
 * @name 笔记本
 * @description 管理目录。dist/data/book.json文件是json数组
 */

/* private */

const _ = require('lodash')
const Path = require('path')
const Fs = require('fs')
const Constant = require('../../../../core/constant')
const Chapter = require('../../../../../common/structure/chapter')

const BookPath = Path.resolve(Constant.DataPath, './book.json')

/* public */

/**
 * @name 笔记本类
 */
class Book {
  /* construct */

  /**
   * @name 构造方法
   */
  constructor() {
    /* private */

    this.data = []

    /* construct */

    if (!Fs.existsSync(BookPath)) {
      Fs.writeFileSync(BookPath, JSON.stringify([]), { encoding: 'utf-8' })
    }
    this.data = JSON.parse(Fs.readFileSync(BookPath, { encoding: 'utf-8' }))
  }

  /* private */

  /**
   * @name 保存
   */
  save() {
    Fs.writeFile(BookPath, JSON.stringify(this.data), { encoding: 'utf-8' }, er => er && console.log(er))
  }
  /**
   * @name 排序
   */
  sort(){
    this.data.sort((a, b) => a.order - b.order)
    this.data.forEach((v, i) => v.order = i)
  }

  /* public */

  /**
   * @name 获取数据
   * @description 返回深复制数组
   * @return {Array} 数据
   */
  getData() {
    return _.cloneDeep(this.data)
  }
  /**
   * @name 获取章节
   * @return {Object} 章节
   */
  get(id) {
    return _.cloneDeep(this.data.find(v => v.id === id))
  }
  /**
   * @name 添加
   * @param {String} name 名称
   * @param {Number} order 排序
   * @return {Object} 章节
   */
  add(name, order) {
    let chapter = new Chapter(name, order)
    this.data.push(chapter)

    this.sort()
    this.save()

    return _.cloneDeep(chapter)
  }
  /**
   * @name 删除
   * @param {Number} id 标识
   */
  remove(id) {
    _.remove(this.data, v => v.id === id)

    this.save()
  }
  /**
   * @name 编辑
   * @param {Object} chapter 章节
   */
  edit(chapter) {
    let target = _.find(this.data, v => v.id === chapter.id)
    target = Object.assign(target, chapter)
    
    this.sort()
    this.save()
  }
}

/* construct */

module.exports = Book
