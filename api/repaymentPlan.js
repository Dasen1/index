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

export function getRepaymentRecord(data) {
  // 还款明细列表
  return request({
    url: '/repayment/record/list/page',
    method: 'get',
    data,
  },"isToken") 
}