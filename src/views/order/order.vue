<template>
  <div class="order-box">
    <header-bar class="header-bar">
      <div slot="left" @click="goBack">
        <img src="~assets/img/back.png">
      </div>
      <div slot="center">我的车票</div>
    </header-bar>
    <order-info></order-info>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import OrderInfo from 'components/content/order'
import HeaderBar from 'components/common/header/headerBar'
export default {
  data(){
    return {
      
    }
  },
  components: {
    OrderInfo,
    HeaderBar
  },
  methods: {
    goBack() {
      this.$router.back()
    }
  }
}
</script>
<style scoped>
.order-box {
  height: 100vh;
}  
</style>