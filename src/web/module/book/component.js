/* private */

import Electron from 'electron'
import _ from 'lodash'
import { mapActions, mapMutations, mapState } from 'vuex'
import Store from '../../core/store'
import AddSrc from '../../image/plus.svg'
import { Item as ContextMenuItem, show as ShowMenu } from '../../view/context-menu'
import { Button as ModalButton, show as ShowModal } from '../../view/modal'
import Panel, { Item as PanelItem } from '../../view/panel'
import Chapter from './component/chapter'

const ChapterHangingTimeThreshold = 800
const bridge = Electron.remote.getGlobal('bridge')
const ContextMenuItems = {
  add: {
    name: 'add', // 上方添加
    text: '新建',
    action(datum) {
      add(datum.order)
    }
  },
  remove: {
    name: 'remove',
    text: '删除',
    async action(datum) {
      let result = await ShowModal({ text: "确认删除笔记？", content: datum.name, buttons: [new ModalButton('confirm', '确认', 'alert'), new ModalButton('cancel', '取消')] })

      if (result === 'confirm') {
        remove(datum.id)
      }
    }
  },
  saveAs: {
    name: 'saveAs',
    text: '另存为',
    action(datum) {
      saveAs(datum.id)
    }
  }
}
const PanelItems = [
  {
    src: AddSrc,
    action() {
      add(0)
    }
  }
]

/**
 * @name 新建
 * @param {Number} order 排序
 */
function add(order) {
  Store.dispatch('addChapter', { order })
}
/**
 * @name 删除
 * @param {Number} id 标识
 */
function remove(id) {
  Store.dispatch('removeChapter', { id })
}
/**
 * @name 另存为
 * @param {Number} id 标识
 */
async function saveAs(id) {
  let { filePath } = await Electron.remote.dialog.showSaveDialog({ title: '另存为', filters: [{ name: 'json', extensions: ['json'] }] })
  filePath && bridge.saveAsChapter(id, filePath)
}

/* public */

const component = {
  name: 'book',
  data() {
    return {
      panelItems: PanelItems.map(v => new PanelItem(v.src, v.action)),
      pressing: null // {targetDatum, targetElement, startTime, timer}
    }
  },
  components: {
    chapter: Chapter,
    panel: Panel
  },
  computed: {
    ...mapState({
      domWidth: state => `${state.seperateX}px`,
      list: 'chapters',
      chapter: 'chapter'
    })
  },
  created() {
    document.addEventListener('mouseup', this.handleMouseUp.bind(this))
  },
  methods: {
    ...mapMutations(['getChapters']),
    ...mapActions(['setChapter', 'editChapter']),

    /**
     * @name 处理条目选择
     * @param {Object} datum 数据
     */
    handleItemSelect({ datum, element, x, y }) {
      this.pressing = {
        targetDatum: datum,
        startTime: Date.now(),
        timer: setTimeout(() => {
          this.hangChapter(element, y)
        }, ChapterHangingTimeThreshold)
      }
    },
    /**
     * @name 处理条目菜单
     * @param {Number} x 横坐标
     * @param {Number} y 纵坐标
     * @param {Object} datum 数据
     */
    async handleItemMenu({ x, y, datum }) {
      let name = await ShowMenu(x, y, _.map(ContextMenuItems, v => new ContextMenuItem(v.name, v.text)))
      ContextMenuItems[name].action(datum)
    },
    /**
     * @name 处理鼠标抬起
     * @param {Object} ev 事件对象
     */
    handleMouseUp(ev) {
      if (!this.pressing) {
        return
      }

      let now = Date.now()
      if (now - this.pressing.startTime < ChapterHangingTimeThreshold) { // 持续时间少
        this.setChapter({ id: this.pressing.targetDatum.id })

        clearTimeout(this.pressing.timer)
      } else {
        let chapterElement = _.find(ev.path, v => v.classList && v.classList.contains('chapter'))
        if (chapterElement) { // 如果鼠标已经不在Chapter元素上，取消操作
          let chapterOrder = +chapterElement.getAttribute('data-chapterorder')
          this.pressing.targetDatum.order = chapterOrder - 0.5

          this.editChapter({ chapter: this.pressing.targetDatum })
        }
      }

      this.pressing = null
    },

    /**
     * @name 悬挂章节
     * @param {Object} element 元素
     * @param {Number} y 初始纵坐标
     */
    hangChapter(element, y) {
      let deltaY = y - element.offsetTop

      let clone = element.cloneNode(true)
      clone.classList.add('clone')
      clone.style.width = this.domWidth
      clone.style.top = `${y - deltaY}px`

      let hanging = (ev) => {
        clone.style.top = `${ev.clientY - deltaY}px`
      }
      document.addEventListener('mousemove', hanging)
      let mouseUp = () => {
        clone.remove()

        document.removeEventListener('mousemove', hanging)
        document.removeEventListener('mouseup', mouseUp)
      }
      document.addEventListener('mouseup', mouseUp)

      this.$el.appendChild(clone)
    }
  }
}

/* construct */

export default component
