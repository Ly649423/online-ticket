<template>
  <div>
     <header-bar class="header-bar">
      <div slot="center">车次列表</div>
    </header-bar> 
    <div class="top-box" @click="changeState">
      <span class="left">{{from}}</span>
      <span class="arrow"><==></span>  
      <span class="right">{{destination}}</span>
    </div>
    <loading v-if="isLoading" />
    <better-scroll v-else class="content" :handleRefresh="handleRefresh" :handlePullUp="handlePullUp" :isPullOn='isPullOn' ref="betterScroll">
      <list v-for="item in busDatas" :key="'busDatas'+item.uuid"  @click.native="handleToDetial(item)" :busData="item" :from='from' :destination='destination'></list>
     </better-scroll>
  </div>
</template>
<script>
import axios from 'axios';

import HeaderBar from 'components/common/header/headerBar'
import List from 'components/content/home/list'
import BetterScroll from 'components/common/betterScroll'

import { getCount } from 'network/bus.js'

export default {
  data(){
    return {
      currentPage: 1,
      pageSize: 5,
      total: 0,
      busStatus: '0',
      from: '沙河校区',
      destination: '清水河校区',

      // isPullOn: true,
      busDatas: [],
      isLoading: true,
    }
  },
  components: {
    HeaderBar,
    List,
    BetterScroll
  },
  mounted(){
    this.getBusData(this.currentPage,this.pageSize)
  },
  computed: {
    isPullOn() {
      return Math.ceil(this.total/this.pageSize) > this.currentPage
    }
  },
  methods: {
    /*
    *接口监听
    */
    handleToDetial(item) {
      console.log('hahh');
      this.$router.push({
        path: '/homeDetail',
        query: {
          countId: item.uuid
        }
      })
    },

    changeState() {
      this.busStatus = this.busStatus === '1' ? '0' : '1'
      let destination = this.destination
      this.destination = this.from
      this.from =  destination
      this.currentPage = 1
      this.getBusData(this.currentPage,this.pageSize)
    } ,

    /*
    * 接口请求事件
    */
    getBusData(currentPage,pageSize) { 
      let _this = this
      getCount({
        currentPage: currentPage,
        pageSize: pageSize,
        busStatus: this.busStatus
      }).then( res => {
        let data = res.data
        if (data.success && data.result.code == '000000') {
          _this.isLoading = false          
          _this.busDatas = data.result.countSimpleDtos
          _this.total = data.result.total          
        }
      })
    },

    handlePullUp() {
      getCount({
        currentPage: this.currentPage + 1,
        pageSize: this.pageSize,
        busStatus: this.busStatus
      }).then( res => {
        let data = res.data
        if (data.success && data.result.code == '000000') {          
          this.busDatas.push(...data.result.countSimpleDtos)
          this.$refs.betterScroll.refresh()
          this.currentPage += 1
        }
      })
    },

    handleRefresh() {
      this.currentPage = 1
      getCount({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        busStatus: this.busStatus
      }).then( res => {
        let data = res.data
        if (data.success && data.result.code == '000000') {          
          this.busDatas = data.result.countSimpleDtos
          this.$bus.$emit('refresh',false)
          this.total = data.result.total
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
  top: 80px;
  bottom: 54px;
  left: 0;
  right: 0;
}
.top-box {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 15px;
  color: #1296db;
  background-color: #f6f6f6;
  display: flex;
}
.top-box .arrow {
  width: 70px;
}
.top-box .left {
  text-align: right;
  width: calc((100% - 70px) / 2);
}
.top-box .right {
  text-align: left;
}
</style>