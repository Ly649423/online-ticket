<template>
  <button class="normal">{{value}}</button>
</template>
<script>
export default {
  data() {
    return {
      
    }
  },
  props: {
    value: '',
    type: '',
  }
}
</script>
<style scoped>
.normal {
  min-width: 50px;
  height: 28px;
  padding: 0 8px;
  background: none;
  border-radius: 20px;
  border: 1px solid #1296db;
  color: #1296db;
  font-size: 12px;
 }

</style>