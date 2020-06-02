<template>
<div>
  <tab-bar>
    <tab-bar-item path="/order/riding" routeWay='replace' :class="{'order-active': !$route.path.indexOf('/order/riding')}">
      <div slot="item-title">未乘坐</div>
    </tab-bar-item>
    <tab-bar-item path="/order/paying" routeWay='replace' :class="{'order-active': !$route.path.indexOf('/order/paying')}">
      <div slot="item-title">待支付</div>
    </tab-bar-item>
    <tab-bar-item path="/order/commenting" routeWay='replace' :class="{'order-active': !$route.path.indexOf('/order/commenting')}">
      <div slot="item-title">待评价</div>
    </tab-bar-item>
    <tab-bar-item path="/order/commented" routeWay='replace' :class="{'order-active': !$route.path.indexOf('/order/commented')}">
      <div slot="item-title">已评价</div>
    </tab-bar-item>
  </tab-bar>
  </div>
</template>
<script>
import TabBar from 'components/common/tabBar/TabBar'
import TabBarItem from 'components/common/tabBar/TabBarItem';

export default {
  data() {
    return {
      isActive: false,
    }
  },
  components: {
    TabBar,
    TabBarItem,
  },
  computed: {
  }
}
</script>
<style scoped>
.tab-bar-item{
  height: 30px;
  line-height: 30px;
  font-size: 14px;
}
.tab-bar-item img{
  width: 25px;
  height: 25px;
  margin-bottom: 2px
}
.order-active{
  border-bottom: .5px solid#1296db;
}

</style>
