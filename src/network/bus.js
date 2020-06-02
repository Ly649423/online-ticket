import { request } from './request'

/*
获取班车信息
params: {
  currentPage  
  pageSize 
}
*/
export function getBusData(params) {
  return request({
    url: "/bus/getBus",
    params: params
  })
}


/*
获取车次信息
params: {
  currentPage  
  pageSize 
}
*/
export function getCount(params) {
  return request({
    url: "/bus/getCount",
    params: params
  })
}

/**
 * 获取车次详情
 * params：{
 *    countId 车次id 
 * }
 */
export function getCountDetail(params) {
  return request({
    url: "/bus/getCountDetail",
    params: params
  })
}

/**
 * 获取座位的字符串信息
 */
export function getSeatInfo(url) {
  return request({
    url: url
  })
}