/* public */

const component = {
    name: 'panel',
    props: {
        items: {
            type: Array,
            required: true
        }
    }
}

/**
 * @name 条目类
 */
class Item {
    /* construct */

    /**
     * @name 构造方法
     * @param {String} src 图片地址
     * @param {Function} action 动作
     */
    constructor(src, action) {
        this.src = src
        this.action = action
    }
}

/* construct */

export default component
export { Item }
