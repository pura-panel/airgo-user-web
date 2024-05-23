// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** 获取余额流水 POST /api/customer/finance/getBalanceStatementList */
export async function postCustomerFinanceGetBalanceStatementList(
  body: API.QueryParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/customer/finance/getBalanceStatementList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取佣金流水 POST /api/customer/finance/getCommissionStatementList */
export async function postCustomerFinanceGetCommissionStatementList(
  body: API.QueryParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/customer/finance/getCommissionStatementList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取佣金统计 GET /api/customer/finance/getCommissionSummary */
export async function getCustomerFinanceGetCommissionSummary(options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/customer/finance/getCommissionSummary', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取邀请人数 POST /api/customer/finance/getInvitationUserList */
export async function postCustomerFinanceGetInvitationUserList(
  body: API.QueryParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/customer/finance/getInvitationUserList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 提现 GET /api/customer/finance/withdrawToBalance */
export async function getCustomerFinanceWithdrawToBalance(options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/customer/finance/withdrawToBalance', {
    method: 'GET',
    ...(options || {}),
  });
}
