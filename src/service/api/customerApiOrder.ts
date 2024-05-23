// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** 获取订单详情 POST /api/customer/order/getOrderInfo */
export async function postCustomerOrderGetOrderInfo(
  body: API.Order,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/customer/order/getOrderInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取待付款订单） POST /api/customer/order/getOrderInfoWaitPay */
export async function postCustomerOrderGetOrderInfoWaitPay(
  body: API.Order,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/customer/order/getOrderInfoWaitPay', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户订单 POST /api/customer/order/getOrderList */
export async function postCustomerOrderGetOrderList(
  body: API.QueryParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/customer/order/getOrderList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 订单预创建，生成系统订单（提交订单） duratip默认为订购时长，当 -1 时代表不限时 POST /api/customer/order/preCreateOrder */
export async function postCustomerOrderPreCreateOrder(
  body: API.Order,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/customer/order/preCreateOrder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
