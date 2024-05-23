// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** 删除支付 DELETE /api/admin/pay/deletePay */
export async function deleteAdminPayDeletePay(body: API.Pay, options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/admin/pay/deletePay', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取全部支付列表 GET /api/admin/pay/getPayList */
export async function getAdminPayGetPayList(options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/admin/pay/getPayList', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 新建支付 POST /api/admin/pay/newPay */
export async function postAdminPayNewPay(body: API.Pay, options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/admin/pay/newPay', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改支付 POST /api/admin/pay/updatePay */
export async function postAdminPayUpdatePay(body: API.Pay, options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/admin/pay/updatePay', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
