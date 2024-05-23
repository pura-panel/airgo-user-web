// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** 获取全部订单，分页获取 POST /api/admin/order/getOrderList */
export async function postAdminOrderGetOrderList(
  body: API.QueryParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/admin/order/getOrderList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取订单统计 POST /api/admin/order/orderSummary */
export async function postAdminOrderOrderSummary(
  body: API.QueryParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/admin/order/orderSummary', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新用户订单 POST /api/admin/order/updateOrder */
export async function postAdminOrderUpdateOrder(body: API.Order, options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/admin/order/updateOrder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
