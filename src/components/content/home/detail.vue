<template>
  <div class="detail-box">
    <header-bar class="header-bar">
      <div slot="left" @click="goBack">
        <img src="~assets/img/back.png">
      </div>
      <div slot="center">车次信息</div>
    </header-bar>
    <loading v-if="isLoading" />
    <div v-else>
    <car-info :countInfo='countInfo'></car-info>
    <seat-info v-if="isLoadSeats" :seats='seats' :countInfo="countInfo" :myChooseSeat='myChooseSeat'></seat-info>
    </div>
  </div>
</template>
<script>
import HeaderBar from 'components/common/header/headerBar'
import CarInfo from 'components/content/home/carInfo'
import SeatInfo from 'components/content/home/seatInfo'
import BetterScroll from 'components/common/betterScroll'
import { Button,DropdownMenu, DropdownItem } from 'vant';

import { getCountDetail } from 'network/bus'
import { getSeatInfo } from 'network/bus'


export default {
  name: 'busDetail',
  data() {
    return {
      countInfo: {},
      seats: {},
      selectedSeats: [],
      isLoading: true,
      myChooseSeat: [],
    }
  },
  computed: {
    isLoadSeats() {
      return JSON.stringify(this.seats) === '{}' ? false : true
    }
  },
  created() {
    getCountDetail({countId: this.$route.query.countId}).then(res => {
      let data = res.data
      if (data.success && data.result.code === "000000") {
        this.countInfo = data.result.countDetailDto
        let seatFilePath = data.result.countDetailDto.seatsNumber
        this.selectedSeats = data.result.countDetailDto.selectedSeats.split(',')
        console.log( this.selectedSeats );
        getSeatInfo(seatFilePath).then( success => {
          this.seats = this.formatSeatInfo(success.data.seats)
          this.isLoading = false      
        })
      }
    })
  },
  components: {
    HeaderBar,
    CarInfo,
    SeatInfo,
    BetterScroll,
    'van-button': Button,
    'van-dropdown-menu': DropdownMenu,
    'van-dropdown-item': DropdownItem
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    getSeatInfo() {
      this.$store.commit('bus/SEAT_LIST',this.seats)
    },
    formatSeatInfo(seats) {
      let seatsInfoObj = {};
      for (let sides in seats) {
        let sidesInfo = seats[sides]
        let sidesValue = {};
        for (let item in sidesInfo) {
          let value = sidesInfo[item];
          let arrays = [];
          for (let j = 0; j < value.length; j++) {
            arrays.push(this.formatSeatStatus(value[j]))
          }
          sidesValue[item] = arrays
        }
        seatsInfoObj[sides] = sidesValue
      }
      return seatsInfoObj
    },
    formatSeatStatus(item) {
      let selectedSeats = this.selectedSeats
      let myChooseSeat = this.myChooseSeat;
      if (selectedSeats.indexOf(item) != -1) {
        return {seatId: item, seatState: '1'}
      } else if (this.myChooseSeat.length > 0 && this.myChooseSeat.indexOf(item) != -1) {
        return {seatId: item, seatState: '2'}
      }
      return {seatId: item, seatState: '0'}
    }
  },
  beforeRouteEnter (to, from, next) {
    let myChooseSeat = [];
    if (from.path == '/confirmOrder') {
      myChooseSeat = Object.assign([], from.query.selectedSeats)
    }
    next(vm => {
      // 通过 `vm` 访问组件实例
      vm.myChooseSeat = myChooseSeat;
    })
  },
}
</script>
<style scoped>
.detail-box {
  height: 100vh;
  position: relative;
  background: #fff;
  z-index: 1;
}
.header-bar {
  border-bottom: .5px solid #1296db;
}
.wrapper-box {
  position: absolute;
  top: 169px;
  left: 0;
  right: 0;
  bottom: 44px;
}
</style>