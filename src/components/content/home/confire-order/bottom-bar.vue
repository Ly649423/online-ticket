<template>
  <div class="bottom-bar">
    <div class="bottom-item right" @click="goToPay()">提交订单 &nbsp;</div>
    <van-dialog v-model="isDepositShow" title="支付金额" show-cancel-button class="van-dialog__content" :beforeClose="beforeClose">
      <h1>￥{{totalPrice}}元</h1>
      <van-password-input
        :value="payPassword"
        info="密码为 6 位数字"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
      />
    </van-dialog>
     <van-number-keyboard
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false"
      />
    <toast :message='toastMessage' :show='isToast'></toast>
  </div>
</template>
<script>
import { Form } from 'vant'
import { Dialog } from 'vant'
import { PasswordInput, NumberKeyboard } from 'vant'
import Toast from 'components/common/toast'

import { addOrder,updateOrderStatus } from 'network/order'
import { payMoney } from 'network/pay'

export default {
  data() {
    return {
      time: 300,
      timer: null,
      seatIds: Object.assign([],this.$route.query.selectedSeats),
      countInfo: JSON.parse(this.$route.query.countInfo),
      isToast: false,
      toastMessage: '',// 提示内容
      isDepositShow: false, //是否显示弹框
      orderNumber: '',
      payPassword: '',
      showKeyboard: false
    }
  },
  components: {
    Toast,
    'van-dialog': Dialog.Component,
    'van-number-keyboard': NumberKeyboard,
    'van-password-input': PasswordInput
  },
  computed: {
    totalPrice() {
      return this.seatIds.length * this.countInfo.price
    },
    expireTime() {
      let nowTime = +new Date();
      let beginTime = this.countInfo.beginDate +' '+ this.countInfo.beginTime
      beginTime = beginTime.split('-').join('/')
      let departureTime = +new Date(beginTime)

      let restTime = parseInt((departureTime - nowTime) / 1000)
      return restTime < 300 ? restTime : 300
    }
  },
  mounted() {
  },
  methods: {
    goToPay() {
      let params = {
        busStatus: this.countInfo.busStatus,
        countId: this.countInfo.uuid,
        countPrice: this.countInfo.price,
        orderUser: this.$store.state.user.user.uuid,
        seatsIds: this.seatIds.join(','),
        expireTime: this.expireTime
      }

      addOrder(params).then( res => {
        let data = res.data
        if (data.success) {
          if (data.result.code === '000000') { //正常提交订单
            this.isDepositShow = true
            this.orderNumber = data.result.orderId 
          } else if (data.result.code === '004000') {//座位被选择
            this.isToast = true
            this.toastMessage = '该座位已被选了，换个试试！'
            setTimeout(()=> {
              this.isToast = false
              this.toastMessage = ''
              // this.$router.back()
            },1000*4)
          } else if (data.result.code === '003002') {
            this.isToast = true
            this.toastMessage = '请先登陆'
            setTimeout(()=> {
              this.isToast = false
              this.toastMessage = ''
              this.$router.push({
                path: '/login',
                query: {
                  redirect: this.$route.path 
                }
              })
            },1000*2)
          }
        }
      }).catch(err => {
        alert(err.data.message)
      })     
    },
    beforeClose(action,done) {
      if (action == 'confirm') { //确认支付，同时修改支付状态
        if(this.$store.state.user.user.payPassword == '' || this.$store.state.user.user.payPassword == null) {
          this.isToast = true
          this.toastMessage = '请先去个人中心进行支付设置'
          setTimeout(()=> {
            this.isToast = false
            this.toastMessage = ''
          },1000)
          done(false)
          return true;
        }
        payMoney({
          payPassword: this.payPassword,
          totalMoney: this.totalPrice
        }).then(res => {
          if (res.data.success) {
            let data = res.data.result
            if (data.code === '000000') {
              this.updateOrderStatus()
              done()
            } else {
              // alert(data.msg)
                done(false)
                this.isToast = true
                this.toastMessage = data.msg
                setTimeout(()=> {
                  this.isToast = false
                  this.toastMessage = ''
                },500)
            }
          }
        }).catch(err => {
          done(false)
          console.log(err.message);
        })
      } else { //取消支付，不修改状态
        this.isToast = true
        this.toastMessage = '取消支付'
        done()
        setTimeout(()=> {
          this.isToast = false
          this.toastMessage = ''
          this.$router.replace({
            path: '/orderInfo',
            query: {
              id: this.orderNumber
            }
          })
        },1000)
      }
    },
   
    updateOrderStatus() {
     updateOrderStatus({
        orderId: this.orderNumber,
        orderStatus: 1
      }).then(res => {
        let data = res.data
        if (data.success && data.result.code === '000000') {
          this.isToast = true
          this.toastMessage = '支付成功！'
          this.$store.dispatch('user/getUserInfo')
          setTimeout(()=> {
            this.isToast = false
            this.toastMessage = ''
            this.$router.replace({
              path: '/orderInfo',
              query: {
                id:this.orderNumber
              }
            })
          },1000)
        }
      }).catch(err => {
        alert(err.data.message)
      })
    },
    goBack() {
      this.$router.back()
    },
    /**
     * 键盘输入密码的方法
    */
    onInput(key) {
      this.payPassword = (this.payPassword + key).slice(0, 6);
    },
    onDelete() {
      this.payPassword = this.payPassword.slice(0, this.payPassword.length - 1);
    },
  },
  filters: {
    getMinutes(sec) {
      return getMinutes(sec)
    }
  }

}
</script>
<style scoped>
.bottom-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 49px;
  display: flex;
}
.bottom-item {
  flex: 1;
  text-align: center;
  line-height: 49px;
  color: white;
}
.left {
  background: #7ec7ed;
}
.right {
  background: #1296db;
}
.time {
  font-size: 12px;
}
.van-dialog__content {
  text-align: center;
}
.van-number-keyboard {
  z-index: 3000;
}
</style>