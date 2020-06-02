import { getUserInfo } from 'network/user'

export default {
  getUserInfo(context) {
    getUserInfo().then( res => {
      let data = res.data                      
      if(data.success && data.result.code == '000000') {
        // _this.userInfo = data.result.userDto
        context.commit('changeUserInfo',data.result.userDto)
      } else {
        alert('网络错误！')
        console.log(data.message) 
        console.log(data.result.msg) 
      }
    }) 
  }
}