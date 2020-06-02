<template>
  <div class="list-box">
    <list-item :busData="busData" :from='from' :destination='destination'></list-item>
  </div>
</template>
<script>
import ListItem from './list-item'
export default {
  data() {
    return {
     
    }
  },
  components: {
    ListItem
  },
  props: {
    busData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    from: {
      type: String,
      default: ''
    },
    destination: {
      type: String,
      default: ''
    }
  }   
}
</script>
<style scoped>
.list-box{
  /* width: 100%; */
  margin: 10px 15px;
}
</style>