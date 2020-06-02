<template>
<loading v-if="isLoading" />
<better-scroll v-else class="wrapper-box" :handleRefresh="handleRefresh" :handlePullUp="handlePullUp" :isPullOn='isPullOn' ref="betterScroll">
  <div class="content-box">
    <template v-for="item in payingOrders">
      <list :key="'commented'+item.uuid" :orderDto="item" @click.native="handleToDetial(item)">
        <div class="bottom" slot="bottom">
            即将失效：{{remainTime(item.orderTime,item.uuid,item.beginTime) | countDown}}
        </div>
      </list>
    </template>
  </div>
</better-scroll>
</template>
<script>
import List from 'components/content/order/order-detial/list'
import MyButton from 'components/common/button'
import BetterScroll from 'components/common/betterScroll'

import { countDown } from 'common/util'
import { getNoPayOrders,updateOrderStatus } from 'network/order'
export default {
  name: "commented",
  data() {
    return {
      isLoading: true,
      currentPage: 1,
      pageSize: 5,
      payingOrders: [],
      total: 0,
      isPullOn: true,
      nowTime: new Date(),
      timer: null,
    }
  },
  components: {
    List,
    MyButton,
    BetterScroll
  },
  mounted(){
    this.getNoPayOrders()
  },
  methods: {
    invaildOrder(id) {
      updateOrderStatus({
        orderId: id,
        orderStatus: '2'
      }).then(res => {
        let data = res.data
        if (data.success && data.result.code === '000000') {
          this.handleRefresh()
        }
      })
    },
    handleToDetial(item) {
      this.$router.push({
        path: '/orderInfo',
        query: {
          id:item.uuid
        }
      })
    },
    getNoPayOrders() {
      getNoPayOrders({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
         let data = res.data
        if (data.success && data.result.code == '000000') {
          this.payingOrders = data.result.noPayDtos
          this.total = data.result.total
          this.isLoading = false
        }
      }).catch(err => {
        alert('网络错误,刷新后再试')
      })
    },
    handlePullUp() {
      this.currentPage += 1
      getNoPayOrders({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      }).then( res => {
        let data = res.data
        if (data.success && data.result.code == '000000') {          
          this.payingOrders.push(...data.result.noPayDtos)
          this.$refs.betterScroll.refresh()
          if (Math.ceil(this.total/this.pageSize) <= this.currentPage) {
            this.isPullOn = false
          }
        }
      })
    },

    handleRefresh() {
      this.currentPage = 1
      getNoPayOrders({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }).then( res => {
        let data = res.data
        if (data.success && data.result.code == '000000') {          
          this.payingOrders = data.result.noPayDtos
          this.$bus.$emit('refresh',false)
        }
      })
    },
    remainTime(endTime, id, beginTime) {
      let startTime = this.nowTime
      beginTime = new Date(beginTime.split('-').join('/')) //发车时间
      endTime = new Date(endTime.split('-').join('/')) //订单时间
      let differentFrom3Min = 300 - parseInt((startTime.getTime() - endTime.getTime()) / 1000)
      let differentBeginTime =  parseInt(beginTime.getTime() - startTime.getTime())
      if(differentFrom3Min == 0 || differentBeginTime == 0) {
        console.log('-------------执行--------------');
        this.invaildOrder(id)
        return 0
      } else if (differentFrom3Min < 0 || differentBeginTime < 0) {
        return 0
      }
      return differentFrom3Min 
      
    }
  },
  filters: {
    countDown(sec) {
      return countDown(sec)
    }
  },
  activated() {
    if (this.timer) {
      clearInterval(this.timer) 
    }
    this.timer = setInterval(() => {
        this.nowTime = new Date()
    },1000)
  },
  deactivated() {
    if (this.timer) {
      clearInterval(this.timer)
    } 
  }
}
</script>
<style scoped>
.wrapper-box {
  overflow: hidden;
  position: absolute;
  top: 74px;
  bottom: 54px;
  left: 0;
  right: 0;
}
.content-box {
  padding: 10px;
}
</style>