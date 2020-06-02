<template>
  <div class="toast-box" v-show="show">
    <span>{{message}}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // isShow: this.show
    }
  },
  watch: {
    message(val) {
      console.log(val);
    }
  },
  props: {
    message: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style scoped>
.toast-box {
  position: fixed;
  left: 50%;
  top: 50%;
  padding: 10px;
  transform: translate(-50%,-50%);
  background: rgba(0, 0, 0, .6);
  color: white;
  z-index: 9999;
}
</style>