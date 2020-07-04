/* public */

const component = {
  name: 'note',
  data() {
    return {
      state: this.note.state,
      content: this.note.content,
      finishTime: this.note.finishTime
    }
  },
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  methods: {
    /**
     * @name 处理状态点击
     */
    handleStateClick() {
      this.state = (this.state + 1) % 2
      if (this.state === 0) {
        this.finishTime = null
      } else {
        this.finishTime = Date.now()
      }

      this.edit()
    },
    /**
     * @name 处理内容失焦
     * @param {Object} ev 事件对象
     */
    handleContentBlur(ev) {
      let text = ev.target.innerText
      if (text !== this.content) {
        this.content = text

        this.edit()
      }
    },
    /**
     * @name 处理右键菜单
     * @param {Object} ev 事件对象
     */
    handleContextmenu(ev) {
      ev.preventDefault()
      ev.stopPropagation()

      this.$emit('menu', { x: ev.clientX, y: ev.clientY, datum: this.note })
    },

    /**
     * @name 编辑
     */
    edit() {
      this.$emit('edit', { note: Object.assign({}, this.note, { state: this.state, content: this.content, finishTime: this.finishTime }) })
    }
  }
}

/* construct */

export default component
