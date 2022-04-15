import {request} from '../request/request'
// 还款计划

export function getRepaymentPlan(data) {
  // 还款计划列表
  return request({
    url: '/repayment/plan/list/page',
    method: 'get',
    data,
  },"isToken") 
}

export function getBankListPage(data) {
  //分页获取银行列表
  return request({
    url: '/bank/list/page',
    method: 'get',
    data,
  },"isToken") 
}

export function getRepaymentRecord(data) {
  // 还款明细列表
  return request({
    url: '/repayment/record/list/page',
    method: 'get',
    data,
  },"isToken") 
}

// 贷款记录
export function getLoanRecordList(data) {
  // 贷款记录列表
  return request({
    url: '/loan/record/list/page',
    method: 'get',
    data,
  },"isToken") 
}
export function getLoanRecordInfo(id) {
  // 贷款记录详情
  return request({
    url: `/loan/record/info/${id}`,
    method: 'get',
    // data,
  },"isToken") 
}

