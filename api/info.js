import {request} from '../request/request'

export function getMessageList(data) {
  // 获取用户token
  return request({
    url: '/message/list/page',
    method: 'get',
    data // 这里get和post都是data,没有params
  },"isToken")
}