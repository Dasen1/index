import {request} from '../request/request'
// 认证流程
export function getFuelGasCompanyList(data) {
  //获取燃气公司列表
  return request({
    url: '/fuelGas/company/list',
    method: 'get',
    data,
  },"isToken") 
}

export function postFuelGasCompanyCheck(data) {
  //校验企业与燃气公司的合作有效性
  return request({
    url: '/fuelGas/company/check',
    method: 'post',
    data,
  },"isToken") 
}
export function getCustomerGetPackInfoById(id) {
  //获取公司详细信息
  return request({
    url: `/customer/getPackInfoById/${id}`,
    method: 'get',
    data,
  },"isToken") 
}

export function postSmsSendCode(data) {
  //获取企业认证申请人手机号码
  return request({
    url: `/sms/sendCode`,
    method: 'post',
    data,
  },"isToken") 
}