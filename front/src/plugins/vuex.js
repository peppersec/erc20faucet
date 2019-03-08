import Vue from 'vue'
import Vuex from 'vuex'

import metamask from '@/stores/metamask'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    metamask,
  },
  strict: false
})
export default store
