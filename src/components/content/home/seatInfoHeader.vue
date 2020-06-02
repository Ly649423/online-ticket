<template>
  <div class="seat-header">
    <div class="seat-header-box">
      <img :src="imgArr[0]">
      <span>空闲</span>
    </div>
     <div class="seat-header-box">
      <img :src="imgArr[2]">
      <span>当前选择</span>
    </div>
     <div class="seat-header-box">
      <img :src="imgArr[1]">
      <span>不可选</span>
    </div>
     <div class="seat-header-box">
      <img :src="imgArr[3]">
      <span>已选</span>
    </div>
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
    }
  }
}
</script>
<style scoped>
.seat-header {
  display: flex;
  height: 60px;
  line-height: 60px;
}
.seat-header-box {
  text-align: left;
  flex: 1;
}
.seat-header-box img {
  width: 30px;
  height: 30px;
  vertical-align: middle;
}

.seat-header-box span {
  font-size: 12px;
}
</style>