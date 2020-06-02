<template>
  <div class="profile">
    <header-bar class="header-bar">
      <div slot="left" @click="goBack">
        <img src="~assets/img/back.png">
      </div>
      <div slot="center">个人中心</div>
    </header-bar>
    <header-box :userName="userInfo.userName"></header-box>
    <list :userDro="userInfo"></list>
  </div>
</template>
<script>
import HeaderBar from 'components/common/header/headerBar'
import List from 'components/content/profile/list'
import HeaderBox from 'components/content/profile/header-box'

// import { getUserInfo } from 'network/user'
// import 

export default {
  data() {
    return {
      // userInfo: {}
    }
  },
  components: {
    HeaderBar,
    List,
    HeaderBox,

  },
  computed: {
    userInfo() {
      return this.$store.state.user.user
    }
  },
  mounted(){
    if(JSON.stringify(this.userInfo) == '{}'){
      console.log('------------暂时没有store');
      this.$store.dispatch('user/getUserInfo')
      // getUserInfo().then( res => {
      //   let data = res.data                      
      //   if(data.success && data.result.code == '000000') {
      //     _this.userInfo = data.result.userDto
      //     _this.$store.commit('user/changeUserInfo',data.result.userDto)
      //   } else {
      //     alert('网络错误！')
      //     console.log(data.message) 
      //     console.log(data.result.msg) 
      //   }
      // }) 
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    }
  }
}
</script>
<style scoped>
.profile{
  height: 100vh;
}
</style>