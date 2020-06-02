<template>
  <div class="list-box">
    <list-item>
      <title-bar slot="title" :busState="orderDto.busStatus" :carNum='orderDto.busId'></title-bar>
      <content-bar slot="content" :orderDto="orderDto"></content-bar>
    </list-item>
    <div><slot name="bottom"></slot></div>
  </div>
</template>
<script>
import ListItem from './list-item'
import TitleBar from './title-bar'
import ContentBar from './content'

export default {
  data() {
    return {
      
    }
  },
  components: {
    ListItem,
    TitleBar,
    ContentBar
  },
  props: {
    orderDto: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    
  }

}
</script>
<style scoped>
.list-box{
  margin-bottom: 10px;
  height: 130px;
}
.list-box:last-child {
  margin-bottom: 0px;
}
.bottom {
  float: right;
  margin-top: -37px;
  margin-right: 10px;
}
</style>