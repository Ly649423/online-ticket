<template>
   <div class="tab-bar">
      <slot></slot>
    </div>
</template>
<script>
export default {
  data(){
    return {
      
    }
 }
}
</script>
<style scoped>

.tab-bar{
  display: flex;
  background-color: #f6f6f6;
  box-shadow: 0px 0px 3px rgba(80, 80, 80,0.1);
}
</style>