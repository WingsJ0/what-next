/* private */

import { mapActions } from 'vuex'

/* public */

const component = {
    name: 'name',
    data() {
        return {
            mode: 0, // 0：展示模式，1：编辑模式
            temp: ''
        }
    },
    props: {
        chapter: {
            type: Object,
            required: true
        }
    },
    methods: {
        ...mapActions(['editChapter']),

        /**
         * @name 处理显示点击
         */
        handleDisplayClick() {
            if (this.mode === 0) {
                this.temp = this.chapter.name

                this.mode = 1

                this.$nextTick(() => {
                    this.$refs.edit.focus()
                })
            }
        },
        /**
         * @name 处理编辑框失焦
         */
        handleEditBlur() {
            this.mode = 0

            if (this.temp !== this.chapter.name) {
                this.chapter.name = this.temp
                this.editChapter({ chapter: this.chapter })
            }
        },
        /**
         * @name 处理编辑框按键抬起
         */
        handleEditKeyup(ev) {
            if (ev.keyCode === 13) {
                ev.target.blur()
            }
        }
    }
}

/* construct */

export default component
