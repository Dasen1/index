import {request} from '../request/request'

// export function getAllOrder(data) {
//   // 获取省份
//   return request({
//     url: '/api/area/province/list',
//     method: 'get',
//     data // 这里get和post都是data,没有params
//   },"isToken")
// }

export function postOpinInfo(data) {
  // 获取用户token
  return request({
    url: '/customer/wxLogin',
    method: 'post',
    data // 这里get和post都是data,没有params
  })
}
export function postByToken(data) {
  // 获取用户信息
  return request({
    url: '/customer/getByToken',
    method: 'post',
    data, // 这里get和post都是data,没有params
  },"isToken")
}
export function postSendCode(data) {
  // 获取用户信息
  return request({
    url: '/sms/sendCode',
    method: 'post',
    data,
  },"isToken")
}

// 手机验证码登录
export function postPhoneLogin(data) {
  // 获取用户信息
  return request({
    url: '/customer/phoneLogin',
    method: 'post',
    data,
  },)
}
