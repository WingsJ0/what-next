/**
 * @name 页
 * @description 用于解析和序列化存储笔记的json文件
 */

/* private */

/**
 * @name 笔记类
 */
class Note {
  /* construct */

  /**
   * @name 构造方法
   * @param {String} content 内容
   * @param {Number} state 状态。0：等待，1：完成
   * @param {Number} id 标识。创建时间
   */
  constructor(content, state, id = Date.now()) {
    this.content = content
    this.state = state
    this.id = id
    this.createTime = Date.now()
    this.finishTime = null
  }
}

/* public */

/**
 * @name 页类
 */
class Page {
  /* construct */

  /**
   * @name 构造方法
   * @param {Number} id 标识
   * @param {Array} list 列表。[Note]
   */
  constructor(id, list = []) {
    this.id = id
    this.list = list
  }
}

/* construct */

Page.Note = Note

module.exports = Page
