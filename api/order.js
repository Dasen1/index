import {request} from '../request/request'

export function getAllOrder(data) {
  // 获取省份
  return request({
    url: '/api/area/province/list',
    method: 'get',
    data // 这里get和post都是data,没有params
  },"isToken")
}

export function postOpinInfo(data) {
  // 获取省份
  return request({
    url: '/customer/wxLogin',
    method: 'post',
    data // 这里get和post都是data,没有params
  })
}
export function postByToken(data) {
  return request({
    url: '/customer/getByToken',
    method: 'post',
    data, // 这里get和post都是data,没有params
  },"isToken")
}