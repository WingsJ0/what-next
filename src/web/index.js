/**
 * @name Index
 */

/* private */

import Vue from 'vue'
import * as Vuex from 'vuex'
import Store from './core/store'
import Root from './module/root'
import TimeFormat from './util/time-format'

/* construct */

Vue.use(Vuex)
Vue.filter('dayFormat', TimeFormat.dayFormat)
Vue.filter('clockFormat', TimeFormat.clockFormat)

new Vue({
  store: Store,
  render: h => h(Root)
}).$mount('#app')
