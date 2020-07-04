/* private */

import _ from 'lodash'
import { mapState, mapActions } from 'vuex'
import Name from './component/name'
import Note from './component/note'
import Panel, { Item as PanelItem } from '../../view/panel'
import { show as ShowMenu, Item as ContextMenuItem } from '../../view/context-menu'
import { Note as NoteData } from '../../../common/structure/page'
import AddSrc from '../../image/plus.svg'

/* public */

const component = {
  name: 'page',
  components: {
    name: Name,
    note: Note,
    panel: Panel
  },
  data() {
    return {
      list: [],
      panelItems: [
        new PanelItem(AddSrc, this.add)
      ],
      contextMenuItems: {
        add: {
          name: 'add', // 上方添加
          text: '新建',
          action: datum => {
            let i = _.findIndex(this.list, v => v.id === datum.id)
            this.add(i)
          }
        },
        remove: {
          name: 'remove',
          text: '删除',
          action: datum => {
            this.remove(datum.id)
          }
        }
      }
    }
  },
  computed: {
    ...mapState(['chapter', 'page']),
    waitList() {
      return this.list.filter(v => v.state === 0)
    },
    finishedList() {
      return this.list.filter(v => v.state === 1)
    }
  },
  watch: {
    page() {
      if (this.page) {
        this.list = _.cloneDeep(this.page.list)
      } else {
        this.list = []
      }
    }
  },
  methods: {
    ...mapActions(['editPage']),

    /**
     * @name 处理笔记编辑
     * @param {Object} note 笔记。Note实例
     */
    handleNoteEdit({ note }) {
      let i = _.findIndex(this.list, v => v.id === note.id)
      this.$set(this.list, i, note)

      this.page.list = this.list
      this.editPage({ page: this.page })
    },
    /**
     * @name 处理菜单
     * @param {Number} x 横坐标
     * @param {Number} y 纵坐标
     * @param {Object} datum 数据  
     */
    async handleNoteMenu({ x, y, datum }) {
      let name = await ShowMenu(x, y, _.map(this.contextMenuItems, v => new ContextMenuItem(v.name, v.text)))
      this.contextMenuItems[name].action(datum)
    },

    /**
     * @name 添加
     * @param {Number} order 次序
     */
    add(order = 0) {
      this.list.splice(order, 0, new NoteData('[Note]', 0))

      this.page.list = this.list
      this.editPage({ page: this.page })
    },
    /**
     * @name 删除
     * @param {Number} id 标识
     */
    remove(id) {
      let i = _.findIndex(this.list, v => v.id === id)
      this.list.splice(i, 1)

      this.page.list = this.list
      this.editPage({ page: this.page })
    }
  }
}

/* construct */

export default component
