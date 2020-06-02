<template>
  <div class="list-box">
    <list-item property='零钱' :value='userDro.money' :imgUrl="imgArr[0]" :isEdit='false' @click.native="goToDispoit"></list-item>
    <list-item property='支付密码' :value='userDro.payPassword' :imgUrl="imgArr[1]" name='payPassword' :isEdit='true'></list-item>
    <list-item property='昵称' :value='userDro.nickName' :imgUrl="imgArr[2]" name='nickName' :isEdit='true'></list-item>
    <list-item property='性别' :value='sex' :imgUrl="imgArr[3]" name='userSex' :isEdit='true'></list-item>
    <list-item property='电话号码' :value='userDro.userPhone' :imgUrl="imgArr[4]" name='userPhone' :isEdit='true'></list-item>
    <list-item property='邮箱' :value='userDro.email' :imgUrl="imgArr[5]" name='email' :isEdit='true'></list-item>
    <van-dialog v-model="isDepositShow" title="请输入充值金额" show-cancel-button class="van-dialog__content" @confirm='updateInfo'>
      <input v-model="depositMoney" class="input-box" key="depositMoney">
    </van-dialog>
    <toast :message='toastMessage' :show='isToast'></toast>
  </div>
</template>
<script>
import ListItem from './list-item'
import { Dialog } from 'vant'
import Toast from 'components/common/toast'

import { updateInfo } from 'network/user'

export default {
  data() {
    return {
      imgArr: [
        require('@/assets/img/money.png'),
        require('@/assets/img/paykey.png'),
        require('@/assets/img/nickname.png'),
        require('@/assets/img/sex.png'),
        require('@/assets/img/tel.png'),
        require('@/assets/img/email.png')
      ],
      isDepositShow: false, //是否显示弹框
      depositMoney: 0 ,// 充值金额
      isToast: false,
      toastMessage: '',// 提示内容
    }
  },
  components: {
    ListItem,
    'van-dialog': Dialog.Component,
    Toast,
  },
  props: {
    userDro: {
      type: Object,
      default: () => {
        return {
          nickName: '',
          userSex: 1,
          userPhone: '',
          email: ''
        }
      }
    }
  },
  computed: {
    sex(){
      return this.userDro.userSex === 1 ? '男' : '女'
    }
  },
  methods: {
    goToDispoit() {
      this.isDepositShow = true
    },
    updateInfo() {
      updateInfo({
        money: parseFloat( this.depositMoney) + parseFloat( this.userDro.money)
      }).then( res => {
        let data = res.data
        if (data.success && data.result.code == '000000') {
          this.depositMoney = 0
          this.$store.dispatch('user/getUserInfo')
          this.isToast = true
          this.toastMessage = '充值成功'
          setTimeout(()=> {
            this.isToast = false
            this.toastMessage = ''
          },1000)
        }
      })
    }
  }
}
</script>
<style scoped>
.list-box{
  /* width: 100%; */
  margin: 10px 15px;
}
.van-dialog__content {
  text-align: center;
}
.input-box {
  padding-left: 10px;
}
</style>