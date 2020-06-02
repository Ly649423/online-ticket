<template>
  <div class="title-bar">
    <img src="~assets/img/location.png" class="">
    <span>{{getTitle.from}}</span>
    <span class="car-number">{{carNum}}</span>
    <img src="~assets/img/desitination.png">
    <span>{{getTitle.to}}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    }
  },
  props: {
    from: '',
    to: '',
    carNum: ''
  },
  computed: {
    getTitle(){
      if (this.busState == '2') {
        return {from:'沙河校区',to:'清水河校区'}
      } else {
        return {from:'清水河校区',to:'沙河校区'}
      }
    }
  }
}
</script>
<style scoped>
.title-bar {
  height: 30px;
  line-height: 30px;
}
.title-bar img{
  vertical-align: middle;
  width: 17px;
  height: 17px;
  margin-right: 5px;
}
.title-bar span {
  font-size: 16px;
  font-weight: 400;
}
.car-number {
  font-size: 14px !important;
  color: #1296db;
  padding: 0px 5px 2px;
  border-bottom: .5px solid #000;
  margin: 0px 8px;
}



</style>