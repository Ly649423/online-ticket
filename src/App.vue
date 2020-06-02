<template>
  <div id="app">
    <router-view></router-view>
    <bottom-bar></bottom-bar>
  </div>
</template>
<script>
import BottomBar from 'components/content/BottomBar'
export default {
  name: "App",
  data(){
    return {
      
    }
  },
  components:{
    BottomBar
  }
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
}

</style>
