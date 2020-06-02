<template>
  <div class="list-item">
    <div class="left">
      <div class="title">{{busData.beginDate}} {{busData.beginTime}} <span v-if="busData.seatStatus == '1'" class="full-warning-box">已满员</span></div>
      <div class="content">
        <p>出发点：{{from}}</p>
        <p>终止点：{{destination}}</p>
      </div>
    </div>
    <div class="right">
      <img src="~assets/img/arrowr.png"> 
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
    busData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    from: {
      type: String,
      default: ''
    },
    destination: {
      type: String,
      default: ''
    }
  },
  computed: {
  
  }
}
</script>
<style scoped>
.list-item {
  display: flex;
  height: 100px;
  align-items: center;
  border: 2px solid #f8f3f9;
  border-radius: 5px;
  margin-bottom: 3px;
  /* position: relative; */
  /* line-height: 150px; */
}
.left {
  flex: 1;
  margin-left: 10px;
}
.title{
  font-size: 20px;
}
.content p{
  color: gray;
  padding: 1px;
  margin: 0;
  font-size: 14px;
}
.right {
  width: 30px;
}
.right img{
  width: 20px;
  vertical-align: middle;
}
.full-warning-box {
  display: inline-block;
  font-size: 12px;
  width: 43px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  background-color: red;
  color: white;
  vertical-align: middle;
}

</style>