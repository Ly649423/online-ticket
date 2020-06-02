<template>
  <div class="wrapper" ref="scroll">
    <div class="content">
      <div class="refresh-handle" v-if="!isLoading">{{pullDownMsg}}</div>
      <div class="refresh-handle" v-if="isLoading">
        <van-loading type="spinner" /> <span>加载中</span>
      </div>
      <slot></slot>
      <div class="loading-handle" v-if="isPullOn">下拉加载</div>
      <div class="loading-handle" v-if="!isPullOn">
        <van-divider>我是有底线的</van-divider>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import { Loading, Divider } from 'vant'
export default {
  data() {
    return {
      scroll: null,
      isLoading: false,
      page: 0,
      pullDownMsg:'',
    }
  },
  components: {
    'van-loading': Loading,
    'van-divider': Divider
  },
  mounted() {
    this.$nextTick(() => {
      this.init()
    })
    this.$bus.$on('refresh', mes => {
      this.isLoading = mes
    })
  },
  props: {
    handleRefresh: {
      type: Function,
      default: function(){}
    },
    handlePullUp: {
      type: Function,
      default: function(){}
    },
    isPullOn: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    init() {
      this.scroll = new BScroll(this.$refs.scroll, {
        scrollY: true,
        click: true,
        probeType: 1, 
        useTransition:false  
      })

      this.scroll.on('scroll', (pos) => {
        this.pullDownMsg = '下拉刷新'
        if (pos.y > 50) {
          this.pullDownMsg = '松开加载更多'
        } 
      })

      this.scroll.on('touchEnd', (pos) => {
        if (pos.y > 50) {
          this.isLoading = true
          this.handleRefresh()
        }
        if (this.scroll.maxScrollY > pos.y + 60) {
          if (this.isPullOn) {
            this.handlePullUp()
          }
        }
      })
      
    },
    refresh() {
      this.scroll.refresh()
    }
  }
}
</script>
<style scoped>
.refresh-handle {
  width: 100%;  
  height:40px; 
  text-align: center;
  font-size: 12px;
  color: gray;
  position: absolute;
  top: -50px;
}
.loading-handle {
  width: 100%;  
  height:20px; 
  text-align: center;
  font-size: 12px;
  color: gray;
  position: absolute;
  bottom: -40px;
}
</style>