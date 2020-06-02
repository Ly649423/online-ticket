export default {
  changeUserInfo(state, user) {
    localStorage.setItem('user',JSON.stringify(user))
    state.user = user
  }
}