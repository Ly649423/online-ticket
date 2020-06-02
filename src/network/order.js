import { request } from './request'
import Qs from 'qs'

/**
* 获取评价订单
* params: {
*  currentPage  当前页
*  pageSize 每页的条目数量
*  evaluateStauts  评价状态：0->未评价 1->已评价
*}
*/
export function getEvaluateOrders(params) {
  return request({
    url: "/order/getEvaluateOrders",
    params: params,
    method: 'get'
  })
}

/**
 * 获取未乘坐的订单
 * params: {
 *   currentPage  当前页
 *   pageSize 每页的条目数量
 * }
*/

export function getNoTakeOrders(params) {
  return request({
    url: "/order/getNoTakeOrders",
    params: params
  })
}

/**
 * 添加订单接口
 * params: {
 * busStatus: 0 沙河->清水河,1 清水河->沙河
 * countId: 场次id
 * countPrice: 场次价格
 * orderUser: 下单人
 * seatsIds: 已选座位编号,逗号分隔,
 * expireTime: 订单过期时间
 * }
*/
export function addOrder(params) {
  console.log(params);
  return request({
    url: "/order/addOrder",
    method: 'post',
    // headers: {'Content-Type': 'application/json;charset=utf-8'},
    headers:{
      'Content-Type': 'application/json; charset=utf-8'
    },
    data: params
  })
}

/**
 * 根据订单id获取订单详情
 * params: {
 * orderId: 订单id
 * }
*/
export function getOrder(params) {
  return request({
    url: "/order/getOrder",
    params: params
  })
}

/**
 * 更改订单状态
 * params: {
 * orderId : 订单id
 * orderStatus: 状态：0-待支付,1-已支付,2-已关闭
 * }
*/
export function updateOrderStatus(params) {
  return request({
    url: "/order/updateOrderStatus",
    data: params,
    headers:{
      'Content-Type': 'application/json; charset=utf-8'
    },
    method: 'post'
  })
}


/**
 * 查询未支付数据
*/
export function getNoPayOrders(params) {
  return request({
    url: "/order/getNoPayOrders",
    params: params
  })
}


