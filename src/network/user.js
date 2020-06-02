import { request } from './request'
import qs from 'qs'

//验证用户是否存在
export function checkUser(username){
  return request({
    url: '/user/check',
    params: {
      username: username
    }
  })
}

//注销用户
export function loginOut(){
  return request({
    url: '/user/logout',
  })
}


//获取用户信息
export function getUserInfo(){
  return request({
    url: '/user/getUserInfo'
  })
}

/*
更新用户信息
params{
  email
  nickName 
  userPhone
  userSex 
}
*/
export function updateInfo(params){
  return request({
    url: '/user/updateInfo',
    method: 'post',
    headers:{
      'Content-Type': 'application/json; charset=utf-8'
    },
    data: params
  })
}


/*
注册用户信息
params{
  email
  password 
  phone
  username 
}
*/
export function register(params){
  console.log(params);
  return request({
    url: '/user/register',
    method: 'post',
    headers:{
      'Content-Type': 'application/json; charset=utf-8'
    },
    data: params
  })
}

