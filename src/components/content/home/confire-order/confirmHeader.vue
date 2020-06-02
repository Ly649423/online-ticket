<template>
  <div class="confirm-header">
    <div class="content-box">
      <span class="left">{{destined.from}}</span>
      <img src="~assets/img/car.png">
      <span class="rihght">{{destined.to}}</span>
    </div>
    <div class="begin-time">
      <span class="left">{{countInfo.beginDate}}</span> 
      <span class="right">{{countInfo.beginTime}}&nbsp;&nbsp;发车</span>
    </div>
    <div class="car-number">
      <span class="right">车牌：{{countInfo.busId}}</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  props: {
    countInfo: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    destined() {
      if (this.countInfo.busStatus == '0') {
        return {from: '沙河校区', to: '清水河校区'}
      } else {
        return {from: '清水河校区', to: '沙河校区'}
      }
    },
  },
  // mounted() {
  //   console.log(this.countInfo);
  // }
}
</script>
<style scoped>

.confirm-header {
  width: 100%;
  height: 130px;
  background-color:#1296db;
  border-radius: 6px;
  position: relative;
  color: white;
}
.content-box {
  display: flex;
  line-height: 130px;
  font-size: 16px;
  font-weight: 600;
}
.content-box img {
  width: 150px;
  height: 24px;
  vertical-align: middle;
  margin: 52px 10px 0px 10px;
}
.content-box span {
  display: inline-block;
  width: calc((100% - 150px) / 2);
}
.content-box .left {
  text-align: right;
}
.content-box .right {
  text-align: left;
}
.begin-time {
  position: absolute;
  top: 10px;
  width: 100%;
  font-size: 14px;
}
.begin-time .left {
  float: left;
  margin-left: 10px;
}
.begin-time .right {
  float: right;
  margin-right: 20px;
}
.car-number {
  position: absolute;
  bottom: 10px;
  margin-left: 10px;
}
</style>