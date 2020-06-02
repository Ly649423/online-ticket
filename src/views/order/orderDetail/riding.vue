<template>
  <loading v-if="isLoading" />
  <better-scroll v-else class="content" :handleRefresh="handleRefresh" :handlePullUp="handlePullUp" :isPullOn='isPullOn' ref="betterScroll">
    <div class="content-box">
      <template v-for="(item,index) in orderDtos"> 
        <list v-if="remainTime(item.beginTime) > 0" :key="'riding'+item.uuid+index" @click.native="handleToDetial(item)" :orderDto="item">
          <div class="bottom" slot="bottom">
            <span v-if="remainTime(item.beginTime) > 10">距离发车：</span>
            <span v-else>即将发车：</span>
            <span>{{remainTime(item.beginTime) | formatMin}}</span>
          </div>
        </list>
      </template>
    </div>
  </better-scroll>
</template>
<script>
import List from 'components/content/order/order-detial/list'
import BetterScroll from 'components/common/betterScroll'

import { getDifferenceMin } from '@/common/util'
import { getNoTakeOrders } from 'network/order'

export default {
  name: "commented",
  data() {
    return {
      isLoading: true,
      currentPage: 0,
      pageSize: 5,
      orderDtos: [],
      total: 0,
      isPullOn: true,
      timer: null,
      nowTime: new Date()
    }
  },
  mounted() {
    this.getNoTakeOrders(1,this.pageSize)
  },
  computed: {
   
  },
  components: {
    List,
    BetterScroll
  },
  methods: {
    remainTime(endTime) {
      let startTime = this.nowTime
      endTime = endTime.split('-').join('/')
      return getDifferenceMin(startTime,new Date(endTime))
    },
    handleToDetial(item) {
      this.$router.push({
        path: '/orderInfo',
        query: {
          id:item.uuid
        }
      })
    },
    getNoTakeOrders(currentPage,pageSize) {
      this.currentPage += 1
      getNoTakeOrders({
        currentPage: currentPage,
        pageSize: pageSize
      }).then( res => {
        let data = res.data
        if (data.success && data.result.code == '000000') {          
          this.orderDtos = data.result.noTakeDtos
          this.total = data.result.total
          this.isLoading = false
        }
      })
    },
    
    handlePullUp() {
      this.currentPage += 1
      getNoTakeOrders({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }).then( res => {
        let data = res.data
        if (data.success && data.result.code == '000000') {          
          this.orderDtos.push(...data.result.noTakeDtos)
          this.$refs.betterScroll.refresh()
          if (Math.ceil(this.total/this.pageSize) <= this.currentPage) {
            this.isPullOn = false
          }
        }
      })
    },

    handleRefresh() {
      this.currentPage = 1
      getNoTakeOrders({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }).then( res => {
        let data = res.data
        if (data.success && data.result.code == '000000') {          
          this.orderDtos = data.result.noTakeDtos
          this.$bus.$emit('refresh',false)
        }
      })
    }
  },
  
  filters: {
    formatMin(min) {
      let days = Math.floor(min/(60*24)) ? Math.floor(min/60*24)+'天' : ''
      let hours = Math.floor((min%(60*24))/60) ? Math.floor((min%(60*24))/60)+'小时' : ''
      let mintues = Math.floor((min%60)) ? Math.floor((min%60))+'分钟' : ''
      return days+hours+mintues
    }
  },
  activated() {
    if (this.timer) {
      clearInterval(this.timer) 
    }
    this.timer = setInterval(() => {
      this.nowTime = new Date()
    },1000*60)
  },
  deactivated() {
    if (this.timer) clearInterval(this.timer)
  }
}
</script>
<style scoped>
.content {
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