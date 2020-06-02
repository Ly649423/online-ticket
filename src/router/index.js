import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store/index'

Vue.use(VueRouter)

import Order from './Order'
const Home = () => import('../views/home/home.vue')

const Profile = () => import('views/profile/profile.vue')
const Login = () => import('views/login/login.vue')
const Register = () => import('components/content/login/register.vue')
const ProfileDetail = () => import('components/content/profile/detail.vue')
const HomeDetail = () => import('components/content/home/detail.vue')
const ConfirmOrder = () => import('components/content/home/confirmOrder.vue')
const OrderInfo = () => import('components/content/order/order-info/index.vue')


const routes = [
  { 
    path: '*', 
    component: Home //NotFoundComponent 
  },
  {
    path: "",
    redirect: "/home",
  },
  {
    path: "/home",
    component: Home,
    meta: {
      title: '车次'
    }
  },
  {
    path: "/profile",
    component: Profile,
    meta: {
      title: '个人中心'
    },
    // children: [
    //   {
    //     path: 'profileDetail',
    //     component: ProfileDetail
    //   }
    // ]
  },
  {
    path: "/login",
    component: Login,
    meta: {
      title: '登陆'
    },
  }, 
  {
    path: "/register",
    component: Register,
    meta: {
      title: '注册'
    },
  },
  {
    path: '/profileDetail',
    component: ProfileDetail,
    meta: {
      title: '修改个人信息'
    }
  },
  {
    path: '/homeDetail',
    component: HomeDetail,
    meta: {
      title: '车次详情'
    }
  },
  {
    path: '/orderInfo',
    component: OrderInfo,
    meta: {
      title: '订单详情'
    }
  },
  {
    path: '/confirmOrder',
    component: ConfirmOrder,
    meta: {
      title: '确认订单',
      keepAlive: true
    }
  },
  Order,
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.matched[0].meta.title
  // console.log(to)
  if (to.path != '/home' && to.path != '/homeDetail' && to.path != '/confirmOrder' && to.path != '/register') {
    if (to.matched.some( r => r.meta.requireAuth || r.meta.homePages)) {
      next()
    } else {
      if (to.path == '/login') {
        next()
      } else {
        let token = store.state.token
        if (token == '' || token == null){
          next({
            path: '/login',
            query: {
              redirect: to.fullPath 
            }
          })
        } else {
          next()
        }
      }
    }
  } else {
    next()
  }
})
export default router
