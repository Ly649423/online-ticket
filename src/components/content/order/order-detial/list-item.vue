<template>
  <div class="list-item">
    <div class="top">
      <div><slot name="title"></slot></div>
      <div><slot name="content"></slot></div>
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
   
  },
  computed: {
  
  }
}
</script>
<style scoped>
.list-item {
  display: flex;
  height: 130px;
  align-items: center;
  border: 2px solid #f8f3f9;
  border-radius: 5px;
  margin-bottom: 3px;
  padding-left: 15px;
}

</style>