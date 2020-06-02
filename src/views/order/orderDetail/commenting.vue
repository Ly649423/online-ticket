<template>
<loading v-if="isLoading" />
<better-scroll v-else class="content" :handleRefresh="handleRefresh" :handlePullUp="handlePullUp" :isPullOn='isPullOn' ref="betterScroll">
  <div class="content-box">
    <list v-for="item in commtingOrders" :key="'commenting'+item.uuid" :orderDto="item" @click.native="handleToCommend(item)"> 
      <div class="bottom" slot="bottom">
        <my-button value="评价"></my-button>
      </div>
    </list>
  </div>
</better-scroll>
</template>
<script>
import List from 'components/content/order/order-detial/list'
import MyButton from 'components/common/button'
import BetterScroll from 'components/common/betterScroll'
import { getEvaluateOrders } from 'network/order'

export default {
  name: "commented",
  data() {
    return {
      isLoading: true,
      currentPage: 1,
      pageSize: 5,
      commtingOrders: [],
      total: 0,
      isPullOn: true
    }
  },
  components: {
    List,
    MyButton,
    BetterScroll,    
  },
  mounted(){
    this.getEvaluateOrders()
  },
  methods: {
    handleToCommend() {
      this.$router.push()
    },
    getEvaluateOrders() {
      getEvaluateOrders({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        evaluateStauts: '0'
      }).then(res => {
         let data = res.data
        if (data.success && data.result.code == '000000') {
          this.commtingOrders = data.result.evaluateDtos
          this.isLoading = false
        }
      }).catch(err => {
        alert('网络错误,刷新后再试')
      })
    },

    handlePullUp() {
      this.currentPage += 1
      getEvaluateOrders({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        evaluateStauts: '0'
      }).then( res => {
        let data = res.data
        if (data.success && data.result.code == '000000') {          
          this.commtingOrders.push(...data.result.evaluateDtos)
          this.$refs.betterScroll.refresh()
          if (Math.ceil(this.total/this.pageSize) <= this.currentPage) {
            this.isPullOn = false
          }
        }
      })
    },

    handleRefresh() {
      this.currentPage = 1
      getEvaluateOrders({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        evaluateStauts: '0'
      }).then( res => {
        let data = res.data
        if (data.success && data.result.code == '000000') {          
          this.commtingOrders = data.result.evaluateDtos
          this.$bus.$emit('refresh',false)
        }
      })
    }
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