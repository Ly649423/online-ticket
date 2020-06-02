<template>
  <div class="car-box">
    <div class="car-box-item">
      <span class="title">车牌号：</span>
      <span class="value">{{countInfo.busId}}</span>
    </div>
    <div class="car-box-item">
      <span class="title">车辆类型：</span>
      <span class="value">33座大巴</span>
    </div>
    <div class="car-box-item">
      <span class="title">驾驶员：</span>
      <span class="value">{{countInfo.driverName}}</span>
    </div>
    <div class="car-box-item">
      <span class="title">发车时间：</span>
      <span class="value">{{countInfo.beginDate+' '+countInfo.beginTime}}</span> 
    </div>

    <div class="car-box-item">
      <span class="title">始发站：</span>
      <span v-if="countInfo.busStatus == '1'" class="value">清水河校区 == 沙河校区</span>
      <span v-else class="value">沙河校区 == 清水河校区</span>
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
  }
}
</script>
<style scoped>
.car-box {
  /* width: 100%; */
  display: flex;
  flex-wrap: wrap;
  margin: 10px;
  height: 120px;
}
.car-box-item {
  flex: auto;
  min-width: 45%;
  height: 30px;
  text-align: left;
  line-height: 30px;
}
.title {
  display: inline-block;
  color: gray;
  width: 80px;
  font-size: 15px;
}
</style>