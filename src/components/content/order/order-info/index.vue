<template>
  <div class="order-information-box">
    <header-bar class="header-bar">
      <div slot="left" @click="goBack">
        <img src="~assets/img/back.png"> 
      </div>
      <div slot="center">订单详情</div>
    </header-bar>
    <loading v-if="isLoading" />
    <div v-else class="order-detail-box">
      <confirm-header :countInfo="countInfo"></confirm-header>
      <trains-info :seatIds="selectedSeats" :countInfo="countInfo"></trains-info>
      <order-info :orderInfor="orderInfor"></order-info>
    </div>
    <bottom-bar v-if="!beginTime ==''" :beginTime="beginTime" :orderInfor="orderInfor" :countInfo="countInfo"></bottom-bar> 
  </div>
</template>
<script>
import OrderInfo from './order-info'
import BottomBar from './bottom-bar'
import HeaderBar from 'components/common/header/headerBar'
import ConfirmHeader from 'components/content/home/confire-order/confirmHeader'
import TrainsInfo from 'components/content/home/confire-order/trainsInfo'

import { getOrder } from 'network/order'

export default {
  name: 'orderInformations', //订单详情页面
  data() {
    return {
      countInfo: {},
      selectedSeats: [],
      orderInfor: {},
      beginTime: '',
      isLoading: true,
    }
  },
  components: {
    OrderInfo,
    BottomBar,
    HeaderBar,
    ConfirmHeader,
    TrainsInfo
  },
  mounted() {
    this.getOrder()
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    getOrder() {
      getOrder({orderId: this.$route.query.id}).then(res => {
        let data = res.data
        if (data.success && data.result.code === '000000') {
          let orderDto = data.result.orderDto
          let count = { beginDate: orderDto.beginDate, 
            beginTime: orderDto.beginTime,
            busId: orderDto.busId,
            busStatus: orderDto.busStatus,
            price: orderDto.countPrice,
            countId: orderDto.countId
          }
          this.countInfo = Object.assign({},count)
          let seatIds = orderDto.seatsIds.split(',')
          this.selectedSeats = seatIds
          let orderInfo = {
            orderPrice: orderDto.orderPrice,
            orderStatus: orderDto.orderStatus,
            orderTime: orderDto.orderTime,
            orderId: orderDto.uuid,
            seatsIds: orderDto.seatsIds
          }
          this.orderInfor = orderInfo
          this.beginTime = (orderDto.beginDate+' '+orderDto.beginTime).split('-').join('/')

          if (this.beginTime != '' ) {
            this.isLoading = false
          }
        }
      })
    }
  },
}
</script>
<style scoped>
.order-information-box {
  position: relative;
  height: 100vh;
  background: #f5f5f5;
  z-index: 1;
}
.order-detail-box {
  padding: 10px;
}
.header-bar {
  border-bottom: .5px solid #1296db;
}
</style>