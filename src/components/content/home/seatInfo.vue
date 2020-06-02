<template>
  <div class="seat-box">
    <seat-info-header></seat-info-header>
    <div class="seat-content">
      <div class="seat-content-left">
        <template v-for="(seatInfo) in seatsInfo.left">
          <template v-for="item in seatInfo">
            <seat-item-info :key="'left-side'+item.seatId" :seat='item' @click.native="chooseSeat(item)"></seat-item-info> 
          </template>
        </template>
      </div>
      <div class="seat-content-right">
        <template v-for="(seatInfo) in seatsInfo.right">
          <template v-for="item in seatInfo">
            <seat-item-info :key="'right-side'+item.seatId" :seat='item' @click.native="chooseSeat(item)"></seat-item-info> 
          </template>
        </template>
      </div>
    </div>
    <div class="seat-bottom">
      <van-button size="large" v-if="!selectedIds.length" type="primary">请选择座位</van-button>  
      <van-button size="large" v-else type="primary" @click="goToConfirmOrder()">提交</van-button>  
    </div>
  </div>
</template>
<script>
import SeatItemInfo from 'components/content/home/seatItemInfo'
import SeatInfoHeader from 'components/content/home/seatInfoHeader'
import { Button } from 'vant';

export default {
  data() {
    return {
      seatsInfo: this.seats,
      selectedIds: []
    }
  },
  props: {
    seats: {
      type: Object,
      default: () => {}
    },
    countInfo: {
      type: Object,
      default: () => {}
    },
    myChooseSeat: {
      type: Array,
      default: () => []
    }
  },

  mounted() {
    // console.log('seats',this.seats);
    if (this.myChooseSeat.length > 0) {
      this.selectedIds.push(...this.myChooseSeat)
    }
  },

  methods: {
    chooseSeat(item) {
      if (item.seatState != '1') {
        if (item.seatState == '0') {
          this.selectedIds.push(item.seatId)
        } else {
          let index = this.selectedIds.indexOf(item.seatId)
          this.selectedIds.splice(index,1)
        }
        item.seatState = item.seatState == '0' ? '2' : '0'
      }
    },

    goToConfirmOrder() {
      // let selectedSeats = this.selectedIds.join(',')
      // console.log(this.countInfo);
      this.$router.push({
        path: '/confirmOrder',
        query: {
          selectedSeats: this.selectedIds,
          countInfo: JSON.stringify(this.countInfo),
        }
      })
    }

  },
  components: {
    SeatItemInfo,
    SeatInfoHeader,
    'van-button': Button
  },
}
</script>
<style scoped>
.seat-box {
  position: absolute;
  top: 190px;
  left: 0;
  right: 0;
  /* height: 720px; */
  background: #f6f6f6;
  padding: 10px 30px 20px 30px ;
  text-align: center;
}
.seat-content {
  overflow: hidden;
}
.seat-content-left, .seat-content-right {
  /* display: inline; */
  float:left;
  width: calc((100% - 1px) / 2);
  text-align: center;
  display: flex;
  flex-wrap: wrap;
}
.seat-content-left {
  border-right: 1px dashed grey;
}
.seat-bottom {
  margin-top: 10px;
}
</style>