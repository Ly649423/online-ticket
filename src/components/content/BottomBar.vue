<template>
  <tab-bar>
      <tab-bar-item path="/home">
        <img slot="item-inco" src="~assets/img/main.png">
        <img slot="item-inco-active" src="~assets/img/main-active.png">
        <div slot="item-title">车次</div>
      </tab-bar-item>
      <tab-bar-item path="/order">
        <img slot="item-inco" src="~assets/img/order.png">
        <img slot="item-inco-active" src="~assets/img/order-active.png">
        <div slot="item-title">我的车票</div>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <img slot="item-inco" src="~assets/img/profile.png">
        <img slot="item-inco-active" src="~assets/img/profile-active.png">
        <div slot="item-title">个人中心</div>
      </tab-bar-item>
    </tab-bar>
</template>
<script>
import TabBar from 'components/common/tabBar/TabBar'
import TabBarItem from 'components/common/tabBar/TabBarItem';
export default {
  data(){
    return {
      
    }
 },
 components:{
    TabBar,
    TabBarItem,
 }
}
</script>
<style scoped>
.tab-bar{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
.tab-bar-item{
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img{
  width: 20px;
  height: 20px;
  margin-bottom: 2px;
  margin-top: 5px;
}
</style>