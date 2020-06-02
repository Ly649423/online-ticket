<template>
  <div class="login">
    <header-bar class="header-bar">
      <div slot="left" @click="goBack">
        <img src="~assets/img/back.png">
      </div>
    </header-bar>
    <div class="login-box">
      <h1 class="page-title">注册</h1>
      <span class="login_textfield">
        <label for="username"><img src="~assets/img/username-active.png"></label>
        <input id="username" v-model="userInfo.username" type="text" placeholder="请输入用户名">
      </span>
      <span class="login_textfield">
        <label for="phone"><img src="~assets/img/tel.png"></label>
        <input id="phone"  v-model="userInfo.phone" type="text" placeholder="请输入电话">
      </span>
      <span class="login_textfield">
        <label for="email"><img src="~assets/img/email.png"></label>
        <input id="email" v-model="userInfo.email" type="text" name="email"  placeholder="请输入邮箱" />
      </span>
      <span class="login_textfield">
        <label for="password"><img src="~assets/img/password-active.png"></label>
        <input id="password" v-model="userInfo.password" type="password" placeholder="请输入密码">
      </span>
      <span class="login_textfield" :class="{'warning':isWarning}">
        <label for="confirPassword "><img src="~assets/img/password2.png"></label>
        <input id="confirPassword" v-model="confirPassword" type="password" placeholder="确认密码" @blur="lostFocus">
      </span>
      <div class="seat-bottom">
        <van-button size="large" type="primary" @click="handleRegister">注册</van-button>  
      </div>
   
    </div>
  </div>
</template>
<script>
import { Button } from 'vant';
import HeaderBar from 'components/common/header/headerBar'

import { register } from 'network/user'
export default {
  name: 'register',
  data() {
    return {
      userInfo: {
        username: '',
        phone: '',
        email: '',
        password: ''
      },
      confirPassword: '',
      isWarning: false,
    }
  },
  components: {
    'van-button': Button,
    HeaderBar
  },
  methods: {
    handleRegister() {
      
      if(this.checkInfo()){
					return true;
      }
      if (this.isWarning == true) {
        return true;
      }
      console.log('hahah');
      register(this.userInfo).then(res => {
        if(res.data.success && res.data.result.code === '000000') {
          this.$router.replace('/login')
        }
      })
    },
    goBack() {
      this.$router.back()
    },
    checkInfo() {
      if (this.userInfo.username == '') {
        alert('用户名不能为空');
        return true;
      }
      if (this.userInfo.phone == '') {
        alert('电话不能为空');
        return true;
      }
      if (this.userInfo.email == '') {
        alert('邮箱不能为空');
        return true;
      }
      if (this.userInfo.password == '') {
        alert('密码不能为空');
        return true;
      }
    },
    lostFocus() {
      console.log(this.confirPassword,this.userInfo.passwor);
      if (this.confirPassword != this.userInfo.password || this.confirPassword == '') {
        this.isWarning = true
      } else {
        this.isWarning = false
      }
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
  text-align: center;
}
.page-title {
  text-align: center;
  margin-top: -76px;
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
  -webkit-box-shadow: 0 0 0px 1000px #fff inset;
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
  height: 40px;
  border: none;
  border-radius: 2px;
  outline: none;
  background-color: #03A9F4;
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
  color: white;
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
.seat-bottom {
  margin-top: 30px;
}

.warning {
  border: 1px solid red;
}
</style>