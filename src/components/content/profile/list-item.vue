<template>
  <div class="list-item" @click="goToDetail">
    <div class="img-box">
      <img :src="imgUrl" >
    </div>
    <div class="left">
      <label>{{property}}</label>
    </div>
    <div class="center">
      <template v-if="property == '支付密码'">
        <label>
          <template v-for="item in value">*</template>
        </label>
      </template>
      <template v-else>
        <label>{{value}}</label>
      </template>
      
    </div>
    <div class="right" v-if="isEdit">
       <img src="~assets/img/arrowr.png">
    </div>
    <div class="right-text" v-if="!isEdit">
      充值
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    }
  },
  props: {
    property: "",
    value: "",
    imgUrl: "",
    name: '',
    isEdit: false
  },
  computed: {
  
  },
  methods: {
    goToDetail() {
      if (this.isEdit) {
        let value = this.value
        if(this.name == 'userSex') {
          value = this.value.indexOf('男') == 0 ? 1 : 0
        }
        this.$router.push({
          path: '/profileDetail',
          query: {
            name: this.name,
            value: value
          }
        })
      }
    }
  }
}
</script>
<style scoped>
.list-item {
  display: flex;
  height: 50px;
  line-height: 50px;
  border-bottom: 2px solid #f8f3f9;
}
.img-box{
  width: 50px;
  text-align: center;
}
.img-box img{
  width: 25px;
  vertical-align: middle;
}
.left {
  width: 100px;
}
.center {
  flex: 1;
}
.right {
  width: 20px;
}
.right img{
  width: 15px;
  vertical-align: middle;
}
.right-text {
  width: 40px;
  height: 26px;
  line-height: 26px;
  background: #1296db;
  text-align: center;
  color: white;
  font-size: 14px;
  border-radius: 2px;
  margin-top: 11px;
  margin-right: 10px;
}
</style>