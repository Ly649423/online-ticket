<template>
  <div class="tab-bar-item" @click="goToPages">
    <div v-if="isActive"><slot name="item-inco"></slot></div>
    <div v-else><slot name="item-inco-active"></slot></div>
    <div :class="{'bottom-active':!isActive}"><slot name="item-title"></slot></div>
  </div>
</template>
<script>
export default {
  data(){
    return {
    
    }
  },
  props:{
    path:"",
    routeWay: {//设置路由跳转方式
      type: String,
      default: 'push'
    }
  },
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.path);
    }
  },
  methods:{
    goToPages(){
      if (this.routeWay == 'replace') {
        this.$router.replace(this.path);
      } else {
        this.$router.push(this.path);
      }
     
    }
  }

  
}
</script>
<style scoped>
.tab-bar-item{
  flex: 1;
  text-align: center;
  height: 49px;
}
.tab-bar-item img{
  vertical-align: middle;
  margin-bottom: 2px
}
.bottom-active{
  color: #1296db;
}

</style>