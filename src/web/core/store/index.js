/**
 * @name 状态存储
 */

/* private */

import _ from 'lodash'
import Vue from 'vue'
import * as Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import Electron from 'electron'
import Constant from '../constant'

const bridge = Electron.remote.getGlobal('bridge')

const initial = {
    seperateX: Constant.BookMinWidth,
    chapters: [],
    chapter: null,
    page: null
}
const mutations = {
    /**
     * @name 设置横向分界
     * @param {Object} state 状态
     * @param {Number} width 宽度
     * @param {Number} delta 变化
     */
    setSeperateX(state, { width, delta }) {
        let target
        if (width !== undefined) {
            target = width
        } else if (delta !== undefined) {
            target = state.seperateX + delta
        }
        target = Math.max(target, Constant.BookMinWidth)
        target = Math.min(target, window.innerWidth - Constant.BookMinWidth) // 补偿4px边框宽度

        state.seperateX = target
    },
    /**
     * @name 获取章节
     * @param {Object} state 状态
     */
    getChapters(state) {
        state.chapters = bridge.getChapters()
    },
    /**
     * @name 设置章节
     * @param {Object} state 状态
     * @param {Object} chapter 章节
     */
    setChapter(state, { chapter }) {
        state.chapter = chapter
    },
    /**
     * @name 设置页
     * @param {Object} state 状态
     * @param {Object} page 页
     */
    setPage(state, { page }) {
        state.page = page
    }
}
const actions = {
    /**
     * @name 添加章节
     * @param {Object} commit 提交函数
     * @param {Number} order 排序
     */
    async addChapter({ commit, dispatch }, { order }) {
        let chapter = await bridge.addChapter(order)
        commit('getChapters')
        dispatch('setChapter', { id: chapter.id })
    },
    /**
     * @name 删除章节
     * @param {Object} commit 提交函数
     * @param {Number} id 标识
     */
    removeChapter({ state, commit, dispatch }, { id }) {
        bridge.removeChapter(id)
        commit('getChapters')
        let chapter = state.chapters[0]
        if (chapter) {
            dispatch('setChapter', { id: state.chapters[0].id })
        } else {
            commit('setPage', { page: null })
            commit('setChapter', { chapter: null })
        }
    },
    /**
     * @name 设置当前章节
     * @param {Object} commit 提交函数
     * @param {Number} id 标识
     */
    async setChapter({ state, commit }, { id }) {
        let chapter = _.find(state.chapters, v => v.id === id)
        let page = await bridge.getPage(id)
        commit('setChapter', { chapter })
        commit('setPage', { page })
    },
    /**
     * @name 编辑章节
     * @param {Object} commit 提交函数
     * @param {Object} chapter 章节
     */
    editChapter({ commit }, { chapter }) {
        bridge.editChapter(chapter)
        commit('getChapters')
    },
    /**
     * @name 编辑页
     * @param {Object} commit 提交函数
     * @param {Object} page 页
     */
    editPage({ commit }, { page }) {
        bridge.editPage(page)
        commit('getChapters')
    }
}
const vuexLocal = new VuexPersistence({
    storage: window.localStorage // 如果需要选择存储字段，使用reducer属性
})

/* public */

let store = null

/* construct */

Vue.use(Vuex)

store = new Vuex.Store({ state: initial, mutations, actions, plugins: [vuexLocal.plugin] })

export default store
