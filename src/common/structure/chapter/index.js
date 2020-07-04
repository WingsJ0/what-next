/**
 * @name 章节
 * @description 笔记本条目
 */

/* public */

/**
 * @name 章节类
 */
class Chapter {
  /* construct */

  /**
   * @name 构造方法
   * @param {String} name 名称
   * @param {Number} order 排序
   * @param {Number} total 总数
   * @param {Number} finished 完成数
   * @param {Number} id 标识代码
   */
  constructor(name, order, total = 0, finished = 0, id = Date.now()) {
    this.name = name
    this.order = order
    this.total = total
    this.finished = finished
    this.id = id
    this.createTime = Date.now()
  }
}

/* construct */

module.exports = Chapter
