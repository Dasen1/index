import {request} from '../request/request'

// 手机验证码登录
export function getImageList(data) {
  return request({
    url: '/image/list/page',
    method: 'get',
    data,
  },"isToken")
}
