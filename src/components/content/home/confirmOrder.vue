<template>
  <div class="confirm-order">
     <header-bar class="header-bar">
      <div slot="left" @click="goBack">
        <img src="~assets/img/back.png">
      </div>
      <div slot="center">确认订单</div>
    </header-bar>
    <div class="confirm-order-box">
      <confirm-header  :countInfo="countInfo"></confirm-header>
      <trains-info :seatIds="selectedSeats" :countInfo="countInfo"></trains-info>
    </div>
    <bottom-bar></bottom-bar>
  </div>
</template>
<script>
import HeaderBar from 'components/common/header/headerBar'
import ConfirmHeader from './confire-order/confirmHeader'
import TrainsInfo from './confire-order/trainsInfo'
import BottomBar from './confire-order/bottom-bar'
export default {
  data() {
    return {
      selectedSeats: Object.assign([],this.$route.query.selectedSeats),
      countInfo: JSON.parse(this.$route.query.countInfo)
    }
  },
  components: {
    ConfirmHeader,
    HeaderBar,
    TrainsInfo,
    BottomBar
  },
  mounted() {
    // console.log(this.selectedSeats);
    //  console.log(this.countInfo);
  },
  methods: {
    goBack() {
      this.$router.back()
    }
  }
}
</script>
<style scoped>
.confirm-order {
  position: relative;
  height: 100vh;
  background: #f5f5f5;
  z-index: 1;
}
.confirm-order-box {
  padding: 10px;
}
.header-bar {
  border-bottom: .5px solid #1296db;
}
</style>