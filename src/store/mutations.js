export default {
  TOKEN(state, token) {
    state.token = token
  },

  DELETE_TOKEN(state) {
    localStorage.removeItem('token')
    state.token = ''
    state.user.user = {}
  },
}