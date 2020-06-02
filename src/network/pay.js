import { request } from './request'

/**
* 支付
* params: {
*  payPassword   支付密码
*  totalMoney  总价格
*}
*/
export function payMoney(params) {
  return request({
    url: "/pay/",
    headers:{
      'Content-Type': 'application/json; charset=utf-8'
    },
    data: params,
    method: 'post'
  })
}


/**
* 申请退款
* params: {
* coundId  场次id
* orderId  订单id
* seatsIds 座位id
* totalMoney 总金额
*} 
*/
export function payBack(params) {
  return request({
    url: "/pay/back",
    headers:{
      'Content-Type': 'application/json; charset=utf-8'
    },
    data: params,
    method: 'post'
  })
}