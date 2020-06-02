<template>
  <div class="login">
    <div class="login-box">
      <h1 class="page-title">登陆</h1>
      <span class="login_textfield">
        <label for="username"><img src="~assets/img/username-active.png"></label>
        <input id="username" type="text" v-model="loginInfo.userName" placeholder="请输入学号">
      </span>

      <span class="login_textfield">
        <label for="password"><img src="~assets/img/password-active.png"></label>
        <input id="password" type="password" v-model="loginInfo.password" placeholder="请输入密码">
      </span>

      <span class="register-textfield" @click="goToRegister">用户注册</span>

      <span class="login_button" @click="login">
        <input type="button">
        <label>登陆</label>
      </span>
    </div>
  </div>
</template>
<script>
import { loginIn } from 'network/auth'
import { checkUser } from 'network/user'
export default {
  data() {
    return {
      loginInfo: {
        userName: 'mai',
        password: '123'
      },
      userToken: ''
    }
  },
  methods: {
    login() {
      if(this.loginInfo.userName == '' || this.loginInfo.userName == ''){
        alert('账号或密码不能为空！')
      }else{
        checkUser(this.loginInfo.userName).then( res => {
          if (res.data.success) {
            if (res.data.result.checkUsername == 0) {   
              loginIn(this.loginInfo).then( response => {
                 console.log('-------------------',response)  
                let data = response.data
                if (data.success){
                  if (data.result.code == '000000'){
                    let token = 'Bearer '+data.result.token
                    localStorage.setItem('token',token)
                    this.$store.commit('TOKEN',token)
                    this.$store.dispatch('user/getUserInfo')
                    let redirectPath = this.$route.query.redirect
                    if (redirectPath) {
                      // this.$router.replace(redirectPath)
                      this.$router.back()
                    } else {
                      this.$router.replace('/home')
                    }
                  }
                } else {
                  console.log(data.message);
                }              
              }).catch( err => {
                alert("密码错误！")
                console.log(err)
              })
            } else {
              alert("用户名不存在！")
            }              
          }else{
           console.log('请求失败')
          }
        })
      }
    },
    goToRegister() {
      this.$router.push('/register')
    }
  }
}
</script>
<style scoped>
.login{
  height: 100vh;
  position: relative;
  z-index: 9;
  background-color: white;
  /* background-image: url(~assets/img/bg.jpg); */
}
.login-box{
  padding: 80px 40px;
}
.page-title {
  text-align: center;
  margin-top: -17px;
  margin-bottom: 33px;
}
.login_textfield{
  flex: 1;
  display: flex;
  padding: 10px;
  border-radius: 7px;
  background-color: #fff;
  /* box-shadow: 0 1px 1px #1296db; */
  margin-bottom: 20px;
  border: 1px solid #1296db;
}
.login_textfield img{
  width: 20px;
  margin-right: 20px;
}
.login_textfield input{
  flex: 1;
  width: 0;
  padding: 0;
  margin: 0;
  border: none;
  outline: none;
}
.login_button{
  position: relative;
  display: flex;
  flex: 1;
  overflow: hidden;
}
.login_button input{
  display: block;
  flex: 1;
  width: 0;
  height: 50px;
  border: none;
  border-radius: 2px;
  outline: none;
  background-color: #1296db;
  border-color: #1296db;
  border-radius: 37px;
}
.login_button label{
  position: absolute;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  transition: all .6s ease;
  color: #fff;
}
.register-textfield {
  color: #2c2a2a;
  display: inline-block;
  width: 100%;
  height: 30px;
  text-align: right;
  text-decoration: underline;
}
.van-button--large {
  border-radius: 32px;
  background-color: #1296db;
  border-color: #1296db;
}
</style>