<template>
  <div class="item-content">
    <p>发车时间：{{orderDto.beginTime}}</p>
    <p>购票时间：{{orderDto.orderTime}}</p>
    <p>座位编号：{{orderDto.seatsIds}}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    }
  },
  props: {
    orderDto: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>
<style scoped>
.item-content p {
  margin: 4px 0 4px 20px;
  padding: 0;
  font-size: 12px;
  color: gray;
}
</style>