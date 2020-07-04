/* private */

import Vue from 'vue'

let instance = null

const component = {
  name: 'context-menu',
  data() {
    return {
      resolve: null,
      x: 0,
      y: 0,
      items: []
    }
  },
  mounted() {
    this.$el.tabIndex = -1

    this.$nextTick(() => {
      this.$el.focus()
    })
  },
  methods: {
    /**
     * @name 处理焦点失去
     */
    handleBlur() {
      this.$el.remove()
      instance = null
    },
    /**
     * @name 处理条目点击
     * @param {String} name 名称
     */
    handleItemClick(name) {
      this.resolve(name)
      this.$el.blur()
    }
  }
}

/* public */

/**
 * @name 显示
 * @param {Number} x 横坐标
 * @param {Number} y 纵坐标
 * @param {Array} items 条目数组。[Item]
 */
function show(x, y, items) {
  let promise = new Promise((resolve, reject) => {
    if (instance) {
      reject()
    } else {
      let Class = Vue.extend(component)
      instance = new Class({ data: {resolve, x, y, items } })

      instance.$mount()
      document.body.appendChild(instance.$el)
    }
  })

  return promise
}

/**
 * @name 条目
 */
class Item {
  /* construct */

  /**
   * @name 构造方法
   * @param {String} name 名称
   * @param {String} text 文本
   */
  constructor(name, text) {
    this.name = name
    this.text = text
  }
}

/* construct */

export { show, Item }

export default component
