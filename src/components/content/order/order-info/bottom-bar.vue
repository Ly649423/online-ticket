<template>
  <div class="bottom-bar">
    <template v-if="orderInfor.orderStatus == '1'">
      <div class="bottom-item left" @click="cancelOrder">申请退款</div>
      <div class="bottom-item right">距离发车 {{time | countDown}}</div>
    </template>
    <template v-if="orderInfor.orderStatus == '0'">
      <div class="bottom-item left" @click="payingBus">取消订单</div>
      <div class="bottom-item right" @click="showPayDialog">立即支付 {{time | countDown}}</div>
    </template>
    <van-dialog v-model="isDepositShow" title="支付金额" show-cancel-button class="van-dialog__content" :beforeClose="beforeConfirmPay" >
      <h1>￥{{orderInfor.orderPrice}}元</h1>
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
import { countDown } from 'common/util'
import Toast from 'components/common/toast'
import { Dialog } from 'vant'
import { PasswordInput, NumberKeyboard } from 'vant';

import { updateOrderStatus } from 'network/order'
import { payMoney,payBack } from 'network/pay'

export default {
  name: 'bottom-bar',
  data() {
    return {
      time: 0,
      timer: null,
      isToast: false,
      toastMessage: '',// 提示内容
      isDepositShow: false,
      payPassword: '',
      showKeyboard: false,
      startTime: this.beginTime,
      orderTime: this.orderInfor.orderTime
    }
  },
  components: {
    Toast,
    'van-dialog': Dialog.Component,
    'van-number-keyboard': NumberKeyboard,
    'van-password-input': PasswordInput
  },
  props: {
    beginTime: {
      type: String,
      default: ''
    },
    orderInfor: {
      type: Object,
      default: () => {}
    },
    countInfo: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    let beginTime = this.startTime.split('-').join('/')
    console.log('beginTime',beginTime);
    if (this.orderInfor.orderStatus == '0') {
      let rest = Math.ceil((new Date(beginTime).getTime() - new Date().getTime()) / 1000)
      console.log('rest',rest);
      if (rest < 300) {
        this.time = rest
      } else {
        let orderTime = this.orderTime.split('-').join('/')
        console.log('orderTime',orderTime);
        let restFrom3Min = 300 - Math.ceil((new Date().getTime() - new Date(orderTime).getTime()) / 1000)
        if (restFrom3Min > 0) {
          this.time = restFrom3Min
        } else {
          this.time = 0
          this.payingBus()
        }
      }
    } else {
      this.time = Math.ceil((new Date(beginTime).getTime() - new Date().getTime()) / 1000) || 0
    }
    if (this.timer) {
      clearInterval(this.timer)
    } else {
      if (this.time > 0) {
        this.timer = setInterval(() => {
          // console.log('this.time',this.time);
          this.time--
          if (this.time <= 0) {
            clearInterval(this.timer)
            if (this.orderInfor.orderStatus == '1') {
              this.ridingBus()
            } else {
              this.payingBus()
            }
          }
        },1000)
      }
    }
  },
  methods: {
    /**
     * 申请退款
    */
    cancelOrder() {
      let _this = this
      let params = {
        coundId: this.countInfo.countId,
        orderId: this.orderInfor.orderId,
        seatsIds:  this.orderInfor.seatsIds,
        totalMoney: this.orderInfor.orderPrice
      }
      Dialog.confirm({
        title: '确认申请退款',
        message: '退款后，订单就自动取消了哦',
        beforeClose: function(action, done) {
          if (action === 'confirm') {
            payBack(params).then(res => {
              if (res.data.success && res.data.result.code === '000000') {
                done()
                _this.isToast = true
                _this.toastMessage = '退款成功！'
                setTimeout(()=> {
                  _this.isToast = false
                  _this.toastMessage = ''
                  _this.$router.back()
                },1000)
              } else {
                console.log(res.message);
                done(false)
              }
            })
          } else {
            done();
          }
        }
      });
      console.log(params);
      // 
    },
        
    /**
     * 未乘坐车辆出发后触发函数
    */
    ridingBus() {
      this.isToast = true
      this.toastMessage = '车辆已经出发了！'
      setTimeout(()=> {
        this.isToast = false
        this.toastMessage = ''
        this.$router.back()
      },1000)
    },
     /**
     * 待付款订单时间到后触发函数
    */
    payingBus() {
      updateOrderStatus({
        orderId: this.orderInfor.orderId,
        orderStatus: '2'
      }).then(res => {
        let data = res.data
        if (data.success && data.result.code === '000000') {
            this.isToast = true
            this.toastMessage = '订单已关闭'
            setTimeout(()=> {
              this.isToast = false
              this.toastMessage = ''
              this.$router.back()
            },1000)
        }
      })
    },
    showPayDialog() {
      this.isDepositShow = true
    },
    beforeConfirmPay(action,done) {
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
          totalMoney: this.orderInfor.orderPrice
        }).then(res => {
          if (res.data.success) {
            let data = res.data.result
            if (data.code === '000000') {
              this.updateOrderStatus()
              done()
            } else {
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
          console.log(err.message);
        })
       } else {
         done() //取消支付，不修改状态
       }
    },
   
    updateOrderStatus() {
      updateOrderStatus({
        orderId: this.orderInfor.orderId,
        orderStatus: 1
      }).then(res => {
        if (res.data.success && res.data.result.code === '000000') {
          let data = res.data
          this.isToast = true
          this.toastMessage = '支付成功！'
          this.$store.dispatch('user/getUserInfo')
          setTimeout(()=> {
            this.isToast = false
            this.toastMessage = ''
            this.$router.replace('/order/riding')
          },1000)
        }
      }).catch(err => {
        alert(err.data.message)
      })
    },

    /**
    * 键盘输入密码的方法
    */
    onInput(key) {
      this.payPassword = (this.payPassword + key).slice(0, 6);
    },
    onDelete() {
      this.payPassword = this.payPassword.slice(0, this.payPassword.length - 1);
    }
  },
  filters: {
    countDown(sec) {
      return countDown(sec)
    }
  },
  destroyed() {
    clearInterval(this.timer)
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
  background: #2196f38a;
}
.right {
  background: #1296db;
}
.van-dialog__content {
  text-align: center;
}
.van-number-keyboard {
  z-index: 3000;
}
</style>