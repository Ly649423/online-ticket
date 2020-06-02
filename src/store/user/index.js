import actions from './actions'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
  },
  actions,
  mutations
}
