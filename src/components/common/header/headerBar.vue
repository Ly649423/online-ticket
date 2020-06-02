<template>
  <div class="header-nav">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    }
  }
}
</script>
<style scoped>
.header-nav {
  display: flex;
  height: 44px;
  line-height: 44px;
  background: #fff;
}
.header-bar img{
  vertical-align: middle;
  margin-left: 10px;
  width: 20px;
}
.left, .right {
  width: 60px;
}
.center {
  text-align: center;
  flex: 1;
  font-weight: 600;
}

</style>