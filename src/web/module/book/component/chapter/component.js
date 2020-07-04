/* public */

const component = {
  name: 'chapter',
  props: {
    datum: {
      type: Object,
      required: true
    }
  },
  methods: {
    /**
     * @name 处理点击
     * @description 触发select事件
     * @param {Object} ev 事件对象
     */
    handleMouseDown(ev) {
      if (ev.button === 0) {
        this.$emit('select', { datum: this.datum, element: this.$el, x: ev.clientX, y: ev.clientY })
      }
    },
    /**
     * @name 处理上下文菜单
     * @description 触发menu事件
     * @param {Object} ev 事件对象
     */
    handleContextMenu(ev) {
      this.$emit('menu', { datum: this.datum, x: ev.clientX, y: ev.clientY })
    }
  }
}

/* construct */

export default component
