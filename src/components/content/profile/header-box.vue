<template>
  <div class="header-box">
    <div class="avatar">
      <img src="~assets/img/avatar.png">
    </div>
    <div class="title">
      <span>{{userName}}</span>
    </div>
    <div class="exit-box" @click="exitLogin">
      <img src="~assets/img/exit.png">
    </div>
  </div>
</template>
<script>
import { loginOut } from 'network/user'
export default {
  data() {
    return {
    
    }
  },
  props: {
    userName: {
      type: String,
      default: "暂无"
    }
  },
  methods: {
    exitLogin() {
      loginOut().then( res => {
        let data = res.data
        if(data.success && data.result.code == '000000') {
          alert('退出登录')
          this.$router.replace('/login')
          this.$store.commit('DELETE_TOKEN')
          localStorage.removeItem('user')
        } else {
          console.log(data.message);
          console.log(data.result.msg);
        }
      }).catch(err => {
        alert('网络错误！')
      })
    }
  }
}
</script>
<style scoped>
.header-box{
  height: 130px;
  background: #1296db;
  text-align: center;
}

.avatar img {
  margin-top: 20px;
  width: 65px;
  height: 65px;
  vertical-align: middle;
  border-radius: 50%;
}
.title{
  color: white;
  font-size: 16px;
}
.exit-box{
  position: absolute;
  top: 53px;
  right: 10px;
}
.exit-box img {
  width: 25px;
}
</style>