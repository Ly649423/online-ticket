import Vuex from 'vuex'
import Vue from 'vue'

import actions from './actions'
import mutations from './mutations'
import getters from './getters'

import user from './user'
import bus from './bus'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || ''
  },
  mutations,
  actions,
  getters,
  modules: {
    user,
    bus
  }
})

export default store
