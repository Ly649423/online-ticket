<template>
  <div>
    <header-bar class="header-bar">
      <div slot="left" @click="goBack">
        <img src="~assets/img/back.png">
      </div>
      <div slot="center">{{name | getTitle}}</div>
      <div slot="right">
        <van-button type="primary" size="small" color="#1296db" @click="updateInfo">保存</van-button>
      </div>
    </header-bar>
    <template v-if="name == 'nickName'">
      <div class="box-content">
        <input v-model="value" autofocus="autofocus">
      </div>
    </template>
      <template v-if="name == 'userSex'">
      <div class="box-content">
        <van-dropdown-menu>
          <van-dropdown-item v-model="value" :options="optionSex" />
        </van-dropdown-menu>
      </div>
    </template>
    <template v-if="name == 'userPhone'">
      <div class="box-content">
        <input v-model="value" autofocus="autofocus">
      </div>
    </template>
    <template v-if="name == 'email'">
      <div class="box-content">
        <input v-model="value" autofocus="autofocus">
      </div>
    </template>
     <template v-if="name == 'payPassword'">
      <div class="box-content">
        <input v-model="value" autofocus="autofocus" type='password'>
      </div>
    </template>
     <loading v-if="isLoading" />
    
  </div>
</template>
<script>
import HeaderBar from 'components/common/header/headerBar'
import { Button,DropdownMenu, DropdownItem } from 'vant';

import { updateInfo } from 'network/user'

export default {
  name: 'profileDetail',
  data() {
    return {
      name: this.$route.query.name,
      value: this.$route.query.value,
      optionSex: [
        { text: '男', value: 1 },
        { text: '女', value: 0 },
      ],
      isLoading: false
    }
  },
  components: {
    HeaderBar,
    'van-button': Button,
    'van-dropdown-menu': DropdownMenu,
    'van-dropdown-item': DropdownItem
  },
  mounted() {
    console.log('----',this.value);
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    updateInfo() {
      this.isLoading = true
      updateInfo({
        [this.name]:this.value
      }).then( res => {
        let data = res.data
        if (data.success && data.result.code == '000000')
          this.$router.back()
          this.$store.dispatch('user/getUserInfo')
          this.isLoading = false
      })
      // this.name:value
    }
  },
  filters: {
    getTitle(title) {
      if (title == 'nickName') 
        return '设置昵称'
      else if (title == 'userSex') 
        return '设置性别'
      else if (title == 'userPhone')
        return '修改电话'
      else if (title == 'email')
        return '修改邮箱'
      else if (title == 'payPassword')
        return '设置支付密码'
    }
  }
}
</script>
<style scoped>
.van-button--small {
  min-width: 50px;
}
input {
  width: 90%;
  height: 43px;
  border: none;
  border-bottom: .5px solid #1296db;
  margin-left: 5%;
}
</style>