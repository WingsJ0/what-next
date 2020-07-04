/* private */

import Vue from 'vue'

let instance = null

/**
 * @name 组件
 */
const component = {
  name: 'modal',
  data() {
    return {
      resolve: null,
      text: '',
      content: '',
      buttons: []
    }
  },
  methods: {
    /**
     * @name 处理点击
     * @param {Object} ev 事件对象
     */
    handleClick(ev) {
      if (!ev.target.classList.contains('modal')) {
        return
      }

      this.hide()
    },
    /**
     * @name 处理按钮点击
     * @param {}
     */
    handleButtonClick(name) {
      this.resolve(name)

      this.hide()
    },

    /**
     * @name 隐藏
     */
    hide() {
      this.$el.remove()
      instance = null
    }
  }
}

/* public */

/**
 * @name 显示
 * @param {String} title 标题
 * @param {String} content 内容
 * @param {Array} buttons 按钮数组。[Button]
 */
function show({ text, content, buttons }) {
  let promise = new Promise((resolve, reject) => {
    if (instance) {
      reject()
    } else {
      let Class = Vue.extend(component)
      instance = new Class({ data: { resolve, text, content, buttons } })

      instance.$mount()
      document.body.appendChild(instance.$el)
    }
  })

  return promise
}

/**
 * @name 按钮
 */
class Button {
  /* construct */

  /**
   * @name 构造方法
   * @param {String} name 名称
   * @param {String} text 文本
   * @param {String} className 类名
   */
  constructor(name, text, className) {
    this.name = name
    this.text = text
    this.className = className
  }
}

/* construct */

export { show, Button }
export default component
