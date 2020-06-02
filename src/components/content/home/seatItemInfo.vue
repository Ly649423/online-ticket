<template>
  <div class="seat-item" @click="chooseSeat">
    <img :src="imgSrc" >
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgArr: [
        require('assets/img/seat-choose.png'), //空闲可选
        require('assets/img/seat-unchoosed.png'), //不能选择
        require('assets/img/seat-choosed.png'), //正在选择 
        require('assets/img/seat-choosing.png'), // 我的选择
      ],
      // status: 
    }
  },
  mounted() {
    // console.log(this.status);
  },
  computed: {
    status() {
      return this.seat.seatState
    },
    imgSrc() {
      if (this.status == '1') {
        return this.imgArr[1]
      } else if (this.status == '2') {
        return this.imgArr[2]
      } else if (this.status == '3') {
        return this.imgArr[3]
      } 
      return this.imgArr[0]
    }
  },
  props: {
    seat: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    chooseSeat() {
      // if (this.status != '1') {
      //   this.status = this.status == '0' ? '2' : '0'
      // }
    }
  }
}
</script>
<style scoped>
.seat-item {
  text-align: center;
  width: 50%;
  height: 60px;
  line-height: 60px;
}
.seat-item img {
  width: 70px;
  height: 70px;
  vertical-align: middle;
}
</style>