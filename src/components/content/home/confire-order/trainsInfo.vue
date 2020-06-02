<template>
  <div class="trans-info">
    <div class="top-nav">
      <span>商品信息</span>
    </div>
    <div class="info-content">
      <p class="title">{{this.$store.state.user.user.userName}}</p>
      <div class="info-item car-num">
        <span class="content-title">座位号：</span>        
        <span v-for="item in seatIds" :key="'seats'+item" class="number-box">{{item}}</span>
      </div>
      <div class="info-item"> 
        <span class="content-title">数量：</span>
        <span>{{seatIds.length}}</span>
      </div>
      <div class="info-item"> 
        <span class="content-title">价格：</span>
        <span>￥{{seatIds.length * countInfo.price}}</span>
      </div>
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
    seatIds: {
      type: Array,
      default: () => {}
    },
    countInfo: {
      type:Object,
      default: () => {}
    }
  }
}
</script>
<style scoped>
.top-nav {
  width: 100%;
  height: 40px;
  background: #fff;
  margin-top: 15px;
  line-height: 40px;
  color: #504c4c;
  border-radius: 3px;
  border-left: 4px solid #1296db;
}
.top-nav span {
  margin-left: 10px;
}
.info-content {
  margin-top: 10px;
  /* height: 120px; */
  padding-left: 10px;
  padding-top: 10px;
  background: #fff;
  border-radius: 4px;
  color: #847d7d;
}
.title {
  font-size: 16px;
  font-weight: 600;
  padding: 0px;
  margin: 4px 0;
  color: black;
}
.content-title {
  display: inline-block;
  width: 80px;
}
.number-box {
  display: inline-block;
  width: 25px;
  height: 25px;
  line-height: 25px;
  background: rgba(18,150,219,.5);
  text-align: center;
  margin-right: 10px;
  color: white;
  border: 1px solid #1296db;
  border-radius: 2px;
}
.info-item {
  height: 30px;
  line-height: 30px;
}
.car-num {
  height: auto;
}
</style>