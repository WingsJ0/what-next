/* private */

import _ from 'lodash'
import { mapState, mapMutations } from 'vuex'

/* public */

const component = {
    name: 'width-adjust',
    data() {
        return {
            active: false
        }
    },
    computed: {
        ...mapState(['seperateX']),
        left() { return `${this.seperateX}px` }
    },
    created() {
        this.handleMouseMove = _.throttle(this.handleMouseMove, 20)
    },
    methods: {
        ...mapMutations(['setSeperateX']),
        /**
         * @name 处理鼠标按下
         */
        handleMouseDown() {
            this.active = true
            document.addEventListener('mousemove', this.handleMouseMove)
            document.addEventListener('mouseup', this.handleMouseUp)
        },
        /**
         * @name 处理鼠标移动
         */
        handleMouseMove(ev) {
            let delta = ev.clientX - this.seperateX

            this.setSeperateX({ delta })
        },
        /**
         * @name 处理鼠标抬起
         */
        handleMouseUp() {
            this.active = false
            document.removeEventListener('mousemove', this.handleMouseMove)
        }
    }
}

/* public */

export default component
