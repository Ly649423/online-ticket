import { request } from './request'

//验证用户是否存在
export function loginIn(user){
  return request({
    method: 'get',
    url: '/auth',
    params: user
  })
}