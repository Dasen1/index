import {request} from '../request/request'

// 手机验证码登录
export function getImageList(data) {
  return request({
    url: '/image/list/page',
    method: 'get',
    data,
  },"isToken")
}

// 是否绑定过企业
export function getCustomerCheckIsCompany() {
  return request({
    url: '/customer/checkIsCompany',
    method: 'get',
    // data,
  },"isToken")
}

// 获取企业认证公司详情、
export function getCompanyInfo(id) {
  return request({
    url: `/company/info/${id}`,
    method: 'get',
    // data,
  },"isToken")
}

// 查看银行授信状态
export function getCompanyGrantCreditStatus(data) {
  return request({
    url: `/bank/company/grantCreditStatus`,
    method: 'post',
    data,
  },"isToken")
}

// 分页获取银行列表
export function getBankListpage(data) {
  return request({
    url: `/bank/list/page`,
    method: 'get',
    data,
  },"isToken")
}

// 获取企业授权模板
export function getAompanyAuthTemplate(data) {
  return request({
    url: `/company/authTemplate`,
    method: 'get',
    data,
  },"isToken")
}

// 跳转银行小程序 获取参数
export function getBankSkipInfo(data) {
  return request({
    url: `/bank/skip/info`,
    method: 'post',
    data,
  },"isToken")
}

