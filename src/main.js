import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Bus from 'common/bus'
import Loading from 'components/common/loading'

Vue.component('Loading',Loading)

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
